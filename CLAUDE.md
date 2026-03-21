# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Synanews ("演算本日關鍵產業新聞的拓樸") is a daily pipeline that:
1. Scrapes industry news headlines from ITIS (https://www.itis.org.tw/member/DailyNews.aspx)
2. Sends them to a Claude LLM (via TAITRA API at runway.taitra.ai) using the system prompt in `entity-graph-prompt.md`
3. Parses the LLM's JSON response into an entity-relationship graph
4. Embeds the graph data into `daily-graph-template.html` → `daily-graph.html`
5. Commits and pushes `*.html` + `*.json` to the GitHub Pages repo at `lcslin/lcslin.github.io`

## Running the Pipeline

```bash
# Run for today
python gen-daily-graph.py

# Run for a specific date
python gen-daily-graph.py --date 20260206
```

## Automation

```bash
./cron-entry.sh   # Full pipeline: load env → generate → commit/push (used by cron)
./commit.sh       # Git commit & push step only
```

Cron job runs daily at 8 AM:
```
0 8 * * * /Users/cslin/app-dev/Synanews/cron-entry.sh >> /Users/cslin/app-dev/Synanews/cron.log 2>&1
```

## Environment Variables

Loaded from `~/.config/synanews.env` (external secrets, takes precedence) then `.env` (repo-local):

| Variable | Required | Default |
|---|---|---|
| `TAITRA_API_KEY` | Yes | — |
| `TAITRA_BASE_URL` | No | `https://runway.taitra.ai` |
| `MODEL` | No | `claude-sonnet` |
| `GIT_PUSH_BRANCH` | No | `main` |
| `GIT_COMMIT_MESSAGE` | No | `Update Synanews HTML and JSON` |
| `GIT_DEPLOY_KEY_PATH` | No | `~/.ssh/lcslin_github_io_deploy` |

## Architecture

**Entry point:** `gen-daily-graph.py`

Pipeline functions in order:
1. `scrape_news()` — fetches ITIS HTML, parses `.dailynews-link-item` elements
2. `load_prompt()` — reads `entity-graph-prompt.md` as the LLM system prompt
3. `analyze_with_llm()` — calls Claude via OpenAI SDK pointed at TAITRA base URL; expects JSON back
4. `backfill_news_urls()` — enriches `newsDatabase` with URLs and builds `titleToUrl` mapping
5. `embed_data_into_html()` — replaces `__TARGET_DATE__` and `__EMBEDDED_DATA__` placeholders in the template

**Output JSON schema** (written to `YYYY-MM-DD.json`):
```json
{
  "nodes": [{"id": "...", "group": "company|person|country|tech|org|finance", "size": 5-25}],
  "links": [{"source": "...", "target": "...", "value": 1-5, "label": "..."}],
  "newsDatabase": {"entity": [{"title": "...", "source": "...", "url": "..."}]},
  "titleToUrl": {"headline": "url"}
}
```

**HTML template:** `daily-graph-template.html` — D3/force-graph interactive visualization, supports 3-day history. The generated `daily-graph.html` is a single self-contained file.

**Git push auth order** (in `commit.sh`): SSH deploy key → `GITHUB_TOKEN`/`GH_TOKEN` → `gh auth token` → plain git.

## Python Environment

Uses `/Users/cslin/miniconda3/bin/python`. Required packages: `requests`, `beautifulsoup4`, `python-dotenv`, `openai`.
