#!/usr/bin/env bash
# バージョンを上げてタグを push し、npm への publish ワークフローを起動する。
#   yarn release patch|minor|major|<version>
set -euo pipefail

BUMP="${1:-patch}"

if [ -n "$(git status --porcelain)" ]; then
  echo "コミットされていない変更があります。先にコミットしてください。" >&2
  exit 1
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" != "main" ]; then
  echo "main ブランチで実行してください（現在: $BRANCH）" >&2
  exit 1
fi

git pull --rebase origin main

case "$BUMP" in
  patch|minor|major) yarn version "--$BUMP" ;;
  *)                 yarn version --new-version "$BUMP" ;;
esac

VERSION="$(node -p "require('./package.json').version")"
TAG="v$VERSION"

git push origin main
# タグは 1 本ずつ push する（4 本以上まとめると GitHub がワークフローを起動しない）
git push origin "$TAG"

echo "$TAG を push しました。publish ワークフロー: https://github.com/geckou/vue-ui/actions/workflows/publish.yml"
