import os
import sys
import json
import argparse
import requests
import glob
from datetime import datetime
from bs4 import BeautifulSoup
from dotenv import load_dotenv
import openai

# Load environment variables
load_dotenv()

TAITRA_API_KEY = os.getenv("TAITRA_API_KEY")
TAITRA_BASE_URL = os.getenv("TAITRA_BASE_URL", "https://runway.taitra.ai")
MODEL_NAME = os.getenv("MODEL", "claude-sonnet")

# Initialize a session for automatic cookie handling
session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36"
})

def validate_config():
    if not TAITRA_API_KEY:
        print("Error: TAITRA_API_KEY not found in environment variables.")
        sys.exit(1)

DAILY_NEWS_BASE = "https://www.itis.org.tw/member/DailyNews.aspx"
BASE_DOMAIN = "https://www.itis.org.tw"


def scrape_news(date_yyyymmdd=None):
    """
    Scrape news from ITIS DailyNews. If date_yyyymmdd is None, use default page (today).
    If provided (e.g. '20260206'), use DailyNews.aspx?Day=YYYYMMDD.
    """
    if date_yyyymmdd:
        url = f"{DAILY_NEWS_BASE}?Day={date_yyyymmdd}"
    else:
        url = DAILY_NEWS_BASE
    base_domain = BASE_DOMAIN

    try:
        response = session.get(url)
        response.raise_for_status()
        
        if "login" in response.url.lower() and "DailyNews.aspx" not in response.url: 
             print("Warning: Redirected to login page. The content might be restricted.")

    except requests.exceptions.RequestException as e:
        print(f"Error fetching news: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

    soup = BeautifulSoup(response.content, "html.parser")
    # Assuming dailynews-link-item is an <a> tag or contains one
    news_items = soup.find_all(class_="dailynews-link-item")
    
    extracted_data = []
    for item in news_items:
        # Try to find the anchor tag
        anchor = item if item.name == 'a' else item.find('a')
        
        title = item.get_text(separator=" ", strip=True)
        link = ""
        
        if anchor and anchor.has_attr('href'):
            link = anchor['href']
            if link.startswith('/'):
                link = base_domain + link
        
        if title:
            extracted_data.append({
                "title": title,
                "url": link,
                "content": title # Using title as content for now if full text isn't easily available
            })
    
    if not extracted_data:
        print("Warning: No news items found with class 'dailynews-link-item'.")
    
    return extracted_data

def load_prompt():
    prompt_path = "entity-graph-prompt.md"
    try:
        with open(prompt_path, "r", encoding="utf-8") as f:
            return f.read()
    except IOError:
        print(f"Error: Could not read {prompt_path}")
        sys.exit(1)

def analyze_with_llm(news_data):
    client = openai.OpenAI(
        api_key=TAITRA_API_KEY,
        base_url=TAITRA_BASE_URL
    )

    system_prompt = load_prompt()
    
    # Format: numbered titles only (no URL) to save tokens
    news_text = "\n".join([f"[{i+1}] {item['title']}" for i, item in enumerate(news_data)])

    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"以下為今日新聞標題（編號列表），請依 prompt 分析並產出 JSON：\n\n{news_text}"}
            ]
        )
        
        content = response.choices[0].message.content.strip()
        # Clean up if the model adds markdown code blocks
        if content.startswith("```json"):
            content = content[7:]
        elif content.startswith("```"): # Sometimes just ```
            content = content[3:]
            
        if content.endswith("```"):
            content = content[:-3]
        
        return json.loads(content.strip())
        
    except json.JSONDecodeError as e:
        print(f"Error parsing LLM response as JSON: {e}")
        print(f"Raw response: {content}")
        sys.exit(1)
    except Exception as e:
        print("Error calling LLM API:")
        print(f"  Exception type: {type(e).__name__}")
        print(f"  Message: {e}")
        if getattr(e, "status_code", None) is not None:
            print(f"  HTTP status: {e.status_code}")
        if getattr(e, "response", None) is not None:
            try:
                body = getattr(e.response, "text", None) or getattr(e.response, "body", None)
                if body:
                    print(f"  Response body: {body[:500] if len(str(body)) > 500 else body}")
            except Exception:
                pass
        sys.exit(1)


def backfill_news_urls(graph_data, news_data):
    """
    Add url to each entry in newsDatabase by matching title to scraped news_data.
    ITIS page uses "標題 (來源)" format; LLM often returns title only. Match by exact
    first, then by prefix: scraped key starting with entry_title + " (".
    Also record the full title->url mapping in graph_data so the output JSON
    preserves every scraped title and its URL for user link-open.
    Modifies graph_data in place; rebuilds newsDatabase so .json definitely contains url.
    """
    # Key = scraped title (full, may include " (來源)")
    title_to_url = {item["title"].strip(): item["url"] for item in news_data}
    # Explicit record: every title -> URL (written into .json for frontend)
    graph_data["titleToUrl"] = {item["title"]: item["url"] for item in news_data}
    # Rebuild newsDatabase with url on every entry so it is written to .json
    old_db = graph_data.get("newsDatabase") or {}
    new_db = {}
    for entity, news_list in old_db.items():
        new_list = []
        for entry in news_list:
            e = dict(entry)
            title = (entry.get("title") or "").strip()
            url = title_to_url.get(title, "")
            if not url:
                # Prefix match: ITIS format is "標題 (來源)", LLM returns "標題"
                for k, v in title_to_url.items():
                    if k == title or k.startswith(title + " ("):
                        url = v
                        break
            e["url"] = url
            new_list.append(e)
        new_db[entity] = new_list
    graph_data["newsDatabase"] = new_db


def embed_data_into_html(today_str, output_filename):
    """
    Injects ONLY today's data into HTML to ensure local compatibility,
    while setting up placeholders for the frontend to fetch history dynamically.
    """
    print(f"Embedding {today_str} data into HTML...")
    
    try:
        # Read today's data
        with open(output_filename, "r", encoding="utf-8") as f:
            today_data = json.load(f)
            
        with open("daily-graph-template.html", "r", encoding="utf-8") as f:
            template = f.read()
            
        # Serialize data to JSON string
        data_js = json.dumps(today_data, ensure_ascii=False)
        
        # Replace placeholders
        # 1. Sets the reference date for the JS to calculate "previous 3 days"
        final_html = template.replace("__TARGET_DATE__", today_str)
        # 2. Embeds the main data so it works offline/locally immediately
        final_html = final_html.replace("__EMBEDDED_DATA__", data_js)
        
        with open("daily-graph.html", "w", encoding="utf-8") as f:
            f.write(final_html)
            
        print(f"Successfully generated Synanews HTML ('daily-graph.html') with embedded data for {today_str}.")
        
    except IOError as e:
        print(f"Error generating HTML: {e}")

def parse_args():
    parser = argparse.ArgumentParser(
        description="Synanews：演算本日關鍵產業新聞的拓樸，從 ITIS 每日新聞電子報抓取標題，以 LLM 產出實體關係圖與 newsDatabase，並寫入 JSON 與 HTML。",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
參數用法：
  預設（本日）  不帶參數，或加上 --today
                網址: https://www.itis.org.tw/member/DailyNews.aspx
  指定日期      --date YYYYMMDD  例如 --date 20260206
                網址: https://www.itis.org.tw/member/DailyNews.aspx?Day=20260206
                輸出檔名: YYYY-MM-DD.json（例 2026-02-06.json）
        """,
    )
    parser.add_argument(
        "--today",
        action="store_true",
        help="使用本日新聞（預設）；網址為 DailyNews.aspx",
    )
    parser.add_argument(
        "--date",
        type=str,
        metavar="YYYYMMDD",
        help="指定日期，格式 YYYYMMDD，例如 20260206；網址為 DailyNews.aspx?Day=YYYYMMDD",
    )
    args = parser.parse_args()
    if args.date:
        if len(args.date) != 8 or not args.date.isdigit():
            print("Error: --date must be YYYYMMDD (8 digits), e.g. 20260206")
            sys.exit(1)
        return args.date, f"{args.date[:4]}-{args.date[4:6]}-{args.date[6:8]}.json"
    today_str = datetime.now().strftime("%Y-%m-%d")
    return None, f"{today_str}.json"


def main():
    print("Synanews")
    print("演算本日關鍵產業新聞的拓樸")
    print("---")
    validate_config()

    date_yyyymmdd, output_filename = parse_args()
    date_str = output_filename.replace(".json", "")

    print(f"Target output: {output_filename}")
    if date_yyyymmdd:
        print(f"Scraping news from itis.org.tw (Day={date_yyyymmdd})...")
    else:
        print("Scraping news from itis.org.tw (today)...")
    news_data = scrape_news(date_yyyymmdd)

    if not news_data:
        print("No content extracted. Exiting.")
        return

    print(f"Found {len(news_data)} news items. Analyzing with LLM ({MODEL_NAME})...")
    graph_data = analyze_with_llm(news_data)

    backfill_news_urls(graph_data, news_data)

    print(f"Extracted {len(graph_data.get('nodes', []))} nodes and {len(graph_data.get('links', []))} links.")
    if graph_data.get("newsDatabase"):
        print(f"News database: {len(graph_data['newsDatabase'])} entities with backfilled URLs.")
    if news_data and "titleToUrl" in graph_data:
        print(f"Title->URL mapping: {len(graph_data['titleToUrl'])} entries.")

    try:
        with open(output_filename, "w", encoding="utf-8") as f:
            json.dump(graph_data, f, ensure_ascii=False, indent=2)
        print(f"Saved graph data to: {output_filename}")

        embed_data_into_html(date_str, output_filename)

    except IOError as e:
        print(f"Error writing output file: {e}")


if __name__ == "__main__":
    main()
