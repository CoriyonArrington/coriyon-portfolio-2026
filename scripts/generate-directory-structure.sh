#!/usr/bin/env bash
# File: scripts/generate-directory-structure.sh
# Generates a Markdown file representing the project's directory tree.

set -euo pipefail

PROJECT_ROOT=$(pwd)
TREE_OUTPUT_DIR_RELATIVE="reports"
TREE_FILENAME="project-directory-tree.md"
TREE_FILEPATH="${PROJECT_ROOT}/${TREE_OUTPUT_DIR_RELATIVE}/${TREE_FILENAME}"
TREE_TITLE="# Project Directory Structure"
TREE_EXCLUDE_PATTERN="node_modules|.git|.next|*.log*|dist|build|coverage|supabase"

echo "🔄 Generating project directory tree..."

mkdir -p "${PROJECT_ROOT}/${TREE_OUTPUT_DIR_RELATIVE}"

if command -v tree &> /dev/null; then
    echo "$TREE_TITLE" > "$TREE_FILEPATH"
    echo "" >> "$TREE_FILEPATH"
    echo '```' >> "$TREE_FILEPATH"
    if (cd "$PROJECT_ROOT" && tree -L 4 -aF --noreport -I "$TREE_EXCLUDE_PATTERN" ./ >> "$TREE_FILEPATH"); then
      echo '```' >> "$TREE_FILEPATH"
      echo "✅ Project directory tree saved to $TREE_FILEPATH"
    else
      echo "⚠️ 'tree' command failed. Check $TREE_FILEPATH." >&2
    fi
else
    echo "⚠️ 'tree' command not found. Skipping Markdown directory tree generation." >&2
fi

echo "✨ Directory structure script finished."