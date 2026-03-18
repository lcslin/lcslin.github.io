# Synanews

演算本日關鍵產業新聞的拓樸。

## Repository Target

This project is configured as `Synanews` and pushes generated artifacts to the GitHub Pages repository for user `lcslin`.

- GitHub repository: `lcslin/lcslin.github.io`
- Current git remote: `origin -> https://github.com/lcslin/lcslin.github.io.git`
- Branch: `main`

## What This Project Does

`gen-daily-graph.py` fetches headlines from `https://www.itis.org.tw/member/DailyNews.aspx`, sends a numbered title list to an LLM, writes the returned graph to a dated JSON file, and embeds that day's data into `daily-graph.html`.

The current implementation is headline-driven. It does not scrape article summaries or full article content.

## Inputs

Environment variables are loaded from `.env` with `python-dotenv`.

Required:

- `TAITRA_API_KEY`

Optional:

- `TAITRA_BASE_URL` default: `https://runway.taitra.ai`
- `MODEL` default: `claude-sonnet`
- `GIT_PUSH_BRANCH` for `commit.sh`
- `GIT_COMMIT_MESSAGE` for `commit.sh`
- `GIT_DEPLOY_KEY_PATH` for `commit.sh`

Recommended secret file location for cron:

- `~/.config/synanews.env`

## Outputs

Running the generator produces:

- `YYYY-MM-DD.json`: graph data for the selected day
- `daily-graph.html`: HTML generated from `daily-graph-template.html` with that day's data embedded

The JSON normally includes:

- `nodes`
- `links`
- `newsDatabase`
- `titleToUrl`

## CLI

```bash
python gen-daily-graph.py
python gen-daily-graph.py --today
python gen-daily-graph.py --date 20260206
```

Behavior:

- Default or `--today`: fetch `DailyNews.aspx`
- `--date YYYYMMDD`: fetch `DailyNews.aspx?Day=YYYYMMDD`
- Output JSON filename follows the selected date, for example `2026-02-06.json`

`-o/--output` is not supported by the current implementation.

## Implementation Notes

### Scraping

- Uses `requests.Session()`
- Parses elements with class `dailynews-link-item`
- Stores each item as `title`, `url`, and `content`
- In the current code, `content` is the same as `title`

### LLM Input

- The LLM receives a numbered list of titles only
- The system prompt is loaded from `entity-graph-prompt.md`
- The model is expected to return valid JSON

### Post-processing

- URLs are backfilled into `newsDatabase`
- A `titleToUrl` mapping is added to the output JSON
- HTML is rendered by replacing placeholders in `daily-graph-template.html`

## Supporting Scripts

`cron-entry.sh`

- Loads `~/.config/synanews.env` if present
- Loads `.env`
- Runs `gen-daily-graph.py`
- Runs `commit.sh`

`commit.sh`

- Stages `*.html` and `*.json`
- Creates a git commit if there are changes
- Pushes to `lcslin/lcslin.github.io`
- Loads `~/.config/synanews.env` before repo-local `.env`
- Auth order is: deploy key, `GITHUB_TOKEN` or `GH_TOKEN`, then `gh auth token`, then plain git remote auth

## Cronjob Auth

For local cronjob execution, the preferred setup is to keep secrets outside the repo and let the scripts load them from a fixed path.

Recommended `~/.config/synanews.env` content:

```bash
TAITRA_API_KEY=...
TAITRA_BASE_URL=https://runway.taitra.ai
GITHUB_TOKEN=...
```

Recommended crontab entry:

```crontab
0 8 * * * /Users/cslin/app-dev/Synanews/cron-entry.sh >> /Users/cslin/app-dev/Synanews/cron.log 2>&1
```

`commit.sh` still supports `gh auth token` as a fallback, but a fixed env file is more predictable for cron.

## Known Gaps

- Login redirects only emit a warning in the current Python script; they do not fail fast
- The project depends on `daily-graph-template.html`, which must exist beside the Python script
- The prompt mentions source inference, but runtime input is still headline-only
- The secret env file must stay outside the repo and should use restrictive permissions such as `chmod 600`
