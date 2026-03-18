#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR"
PYTHON_BIN="/Users/cslin/miniconda3/bin/python"

export HOME="${HOME:-/Users/cslin}"
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Developer/CommandLineTools/usr/bin:/Users/cslin/miniconda3/bin"

cd "$PROJECT_DIR"

if [ -f "$HOME/.config/synanews.env" ]; then
  set -a
  . "$HOME/.config/synanews.env"
  set +a
fi

if [ -f "$PROJECT_DIR/.env" ]; then
  set -a
  . "$PROJECT_DIR/.env"
  set +a
fi

"$PYTHON_BIN" "$PROJECT_DIR/gen-daily-graph.py"
"$PROJECT_DIR/commit.sh"
