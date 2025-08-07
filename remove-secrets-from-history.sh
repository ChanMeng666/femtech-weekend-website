#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Git History Secret Removal Tool${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# The exposed API key to remove
OLD_KEY="AIzaSyB20tmcBvxE_1V6OyZnY50SKz0q-8ryUvQ"

echo -e "${YELLOW}This script will remove the exposed API key from Git history.${NC}"
echo -e "${RED}WARNING: This will rewrite Git history!${NC}"
echo ""
echo -e "${YELLOW}Current branch: $(git branch --show-current)${NC}"
echo ""

# Check if the key exists in history
echo -e "${BLUE}Checking if the exposed key exists in Git history...${NC}"
KEY_COUNT=$(git log -p --all | grep -c "$OLD_KEY" || echo "0")

if [ "$KEY_COUNT" -eq "0" ]; then
    echo -e "${GREEN}✅ Good news! The exposed key was not found in Git history.${NC}"
    echo -e "${GREEN}   No cleanup needed.${NC}"
    exit 0
fi

echo -e "${RED}⚠️  Found the exposed key $KEY_COUNT time(s) in Git history.${NC}"
echo ""

# Save current state
echo -e "${YELLOW}Saving current work...${NC}"
git stash push -m "Temporary stash for secret removal" --include-untracked

echo ""
echo -e "${BLUE}Option 1: Simple approach - Remove specific commits${NC}"
echo -e "${YELLOW}If the key only appears in recent commits, we can:${NC}"
echo "1. Create a new branch from before the exposure"
echo "2. Cherry-pick clean commits"
echo ""

echo -e "${BLUE}Option 2: Complete history rewrite${NC}"
echo -e "${YELLOW}To completely remove all traces:${NC}"
echo ""

# Create a file with the secret to replace
echo "$OLD_KEY" > .git/secrets-to-remove.txt

cat << 'EOF'
# Run this command to replace the secret throughout history:
git filter-branch --tree-filter "
  if [ -f start-with-chatbot.sh ]; then
    sed -i 's/AIzaSyB20tmcBvxE_1V6OyZnY50SKz0q-8ryUvQ/REMOVED_API_KEY/g' start-with-chatbot.sh
  fi
" --tag-name-filter cat -- --all

# Then clean up:
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Finally, force push (DANGER!):
# git push --force-with-lease origin main
EOF

echo ""
echo -e "${BLUE}Option 3: Using git-filter-repo (Recommended)${NC}"
echo -e "${YELLOW}First install git-filter-repo:${NC}"
echo "pip install git-filter-repo"
echo ""
echo -e "${YELLOW}Then create a file 'expressions.txt' with:${NC}"
echo "AIzaSyB20tmcBvxE_1V6OyZnY50SKz0q-8ryUvQ==>REMOVED_API_KEY"
echo ""
echo -e "${YELLOW}And run:${NC}"
echo "git filter-repo --replace-text expressions.txt"
echo ""

echo -e "${RED}========================================${NC}"
echo -e "${RED}IMPORTANT NOTES:${NC}"
echo -e "${RED}1. This will rewrite Git history${NC}"
echo -e "${RED}2. All collaborators must re-clone after this${NC}"
echo -e "${RED}3. Create a backup first!${NC}"
echo -e "${RED}4. The key may still be visible in GitHub's cache${NC}"
echo -e "${RED}========================================${NC}"

# Restore stashed changes
echo ""
echo -e "${GREEN}Restoring your work...${NC}"
git stash pop

echo ""
echo -e "${BLUE}To check if removal was successful:${NC}"
echo "git log -p --all | grep -c '$OLD_KEY'"
echo "(Should return 0 after successful removal)"