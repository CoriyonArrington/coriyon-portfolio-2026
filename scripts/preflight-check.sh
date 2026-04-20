#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -euo pipefail

echo "🚀 Starting Preflight Checks..."
echo "----------------------------------------"

# 1. Sync Database Schema
echo "📦 1/5: Pulling latest database schema from Supabase..."
npx supabase db pull
echo "✅ Schema synced."
echo "----------------------------------------"

# 2. Update TypeScript Types
echo "📝 2/5: Generating fresh TypeScript definitions..."
npx supabase gen types typescript --linked > src/lib/database.types.ts
echo "✅ Types updated."
echo "----------------------------------------"

# 3. Knip (Dead Code & Dependency Check)
echo "🔍 3/5: Running Knip to check for unused files and dependencies..."
npx knip
echo "✅ Knip passed."
echo "----------------------------------------"

# 4. Type Checking
echo "ʦ 4/5: Running TypeScript compiler checks..."
npx tsc --noEmit
echo "✅ Type verification passed."
echo "----------------------------------------"

# 5. Linting
echo "🧹 5/5: Running ESLint..."
pnpm run lint
echo "✅ Linting passed."
echo "----------------------------------------"

echo "✨ All preflight checks passed successfully! Your codebase is clean and ready."
exit 0