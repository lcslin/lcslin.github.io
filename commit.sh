#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$SCRIPT_DIR"
BRANCH="${GIT_PUSH_BRANCH:-main}"
COMMIT_MESSAGE="${GIT_COMMIT_MESSAGE:-Update Synanews HTML and JSON}"

export HOME="${HOME:-/Users/cslin}"
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/Developer/CommandLineTools/usr/bin:/Users/cslin/miniconda3/bin"
DEPLOY_KEY_PATH="${GIT_DEPLOY_KEY_PATH:-$HOME/.ssh/lcslin_github_io_deploy}"

cd "$REPO_DIR"

if [ -f "$HOME/.config/synanews.env" ]; then
  set -a
  . "$HOME/.config/synanews.env"
  set +a
fi

if [ -f "$REPO_DIR/.env" ]; then
  set -a
  . "$REPO_DIR/.env"
  set +a
fi

git add -- '*.html' '*.json'

if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

git commit -m "$COMMIT_MESSAGE"

ASKPASS_SCRIPT=""
PUSH_REMOTE="origin"
cleanup() {
  if [ -n "$ASKPASS_SCRIPT" ] && [ -f "$ASKPASS_SCRIPT" ]; then
    rm -f "$ASKPASS_SCRIPT"
  fi
}
trap cleanup EXIT

if [ -f "$DEPLOY_KEY_PATH" ]; then
  ORIGIN_URL="$(git remote get-url origin)"
  if [[ "$ORIGIN_URL" =~ ^https://github\.com/([^/]+)/([^/]+)(\.git)?$ ]]; then
    REPO_NAME="${BASH_REMATCH[2]%.git}"
    PUSH_REMOTE="ssh://git@ssh.github.com:443/${BASH_REMATCH[1]}/${REPO_NAME}.git"
  fi

  export GIT_SSH_COMMAND="ssh -i $DEPLOY_KEY_PATH -o IdentitiesOnly=yes -o BatchMode=yes -o StrictHostKeyChecking=accept-new -p 443"
  git push "$PUSH_REMOTE" "$BRANCH"
elif [ -n "${GITHUB_TOKEN:-}" ] || [ -n "${GH_TOKEN:-}" ]; then
  TOKEN="${GITHUB_TOKEN:-${GH_TOKEN:-}}"
  ASKPASS_SCRIPT="$(mktemp)"
  chmod 700 "$ASKPASS_SCRIPT"
  cat >"$ASKPASS_SCRIPT" <<'EOF'
#!/bin/sh
case "$1" in
  *Username*) printf '%s\n' "x-access-token" ;;
  *Password*) printf '%s\n' "$TOKEN" ;;
  *) printf '\n' ;;
esac
EOF

  env TOKEN="$TOKEN" GIT_ASKPASS="$ASKPASS_SCRIPT" GIT_TERMINAL_PROMPT=0 \
    git push "$PUSH_REMOTE" "$BRANCH"
elif command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  TOKEN="$(gh auth token)"
  ASKPASS_SCRIPT="$(mktemp)"
  chmod 700 "$ASKPASS_SCRIPT"
  cat >"$ASKPASS_SCRIPT" <<'EOF'
#!/bin/sh
case "$1" in
  *Username*) printf '%s\n' "x-access-token" ;;
  *Password*) printf '%s\n' "$TOKEN" ;;
  *) printf '\n' ;;
esac
EOF

  env TOKEN="$TOKEN" GIT_ASKPASS="$ASKPASS_SCRIPT" GIT_TERMINAL_PROMPT=0 \
    git push "$PUSH_REMOTE" "$BRANCH"
else
  git push "$PUSH_REMOTE" "$BRANCH"
fi
