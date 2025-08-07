#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Security Check for API Keys and Secrets${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Flag to track if any issues found
ISSUES_FOUND=0

# Check 1: Verify .env.local is ignored by git
echo -e "${YELLOW}1. Checking if .env.local is properly ignored by git...${NC}"
if git check-ignore .env.local > /dev/null 2>&1; then
    echo -e "${GREEN}   ✅ .env.local is properly ignored${NC}"
else
    echo -e "${RED}   ❌ WARNING: .env.local is NOT in .gitignore!${NC}"
    ISSUES_FOUND=1
fi
echo ""

# Check 2: Search for hardcoded Google API keys in tracked files
echo -e "${YELLOW}2. Searching for hardcoded Google API keys...${NC}"
GOOGLE_KEY_PATTERN="AIza[0-9A-Za-z\-_]{35}"
if git grep -E "$GOOGLE_KEY_PATTERN" > /dev/null 2>&1; then
    echo -e "${RED}   ❌ CRITICAL: Found hardcoded Google API keys in tracked files:${NC}"
    git grep -E "$GOOGLE_KEY_PATTERN" --line-number
    ISSUES_FOUND=1
else
    echo -e "${GREEN}   ✅ No Google API keys found in tracked files${NC}"
fi
echo ""

# Check 3: Check staged files for secrets
echo -e "${YELLOW}3. Checking staged files for secrets...${NC}"
if git diff --cached | grep -E "$GOOGLE_KEY_PATTERN" > /dev/null 2>&1; then
    echo -e "${RED}   ❌ CRITICAL: Found API keys in staged files!${NC}"
    echo -e "${RED}   Do NOT commit these changes!${NC}"
    git diff --cached | grep -E "$GOOGLE_KEY_PATTERN" -B 2 -A 2
    ISSUES_FOUND=1
else
    echo -e "${GREEN}   ✅ No secrets found in staged files${NC}"
fi
echo ""

# Check 4: Check for any .env files that might be tracked (excluding .env.example)
echo -e "${YELLOW}4. Checking for tracked .env files...${NC}"
TRACKED_ENV_FILES=$(git ls-files | grep -E "^\.env" | grep -v "\.env\.example" || true)
if [ -n "$TRACKED_ENV_FILES" ]; then
    echo -e "${RED}   ❌ CRITICAL: Found tracked .env files:${NC}"
    echo "$TRACKED_ENV_FILES"
    echo -e "${RED}   Remove these files with: git rm --cached <filename>${NC}"
    ISSUES_FOUND=1
else
    echo -e "${GREEN}   ✅ No sensitive .env files are being tracked${NC}"
    if git ls-files | grep -q "\.env\.example"; then
        echo -e "${BLUE}   ℹ️  .env.example is tracked (this is OK - it contains only examples)${NC}"
    fi
fi
echo ""

# Check 5: Verify common secret patterns aren't exposed
echo -e "${YELLOW}5. Checking for other common secret patterns...${NC}"
SECRET_PATTERNS=(
    "notion_[a-zA-Z0-9_-]{43}"
    "sk-[a-zA-Z0-9]{48}"
    "github_pat_[a-zA-Z0-9]{82}"
    "ghp_[a-zA-Z0-9]{36}"
)

for pattern in "${SECRET_PATTERNS[@]}"; do
    if git grep -iE "$pattern" > /dev/null 2>&1; then
        echo -e "${RED}   ❌ Found potential secrets matching pattern: $pattern${NC}"
        ISSUES_FOUND=1
    fi
done

if [ $ISSUES_FOUND -eq 0 ]; then
    echo -e "${GREEN}   ✅ No other secret patterns detected${NC}"
fi
echo ""

# Check 6: Verify .gitignore contains necessary entries
echo -e "${YELLOW}6. Verifying .gitignore configuration...${NC}"
REQUIRED_IGNORES=(".env" ".env.local" ".env.*.local")
MISSING_IGNORES=()

for ignore in "${REQUIRED_IGNORES[@]}"; do
    if ! grep -q "^$ignore$" .gitignore 2>/dev/null; then
        MISSING_IGNORES+=("$ignore")
    fi
done

if [ ${#MISSING_IGNORES[@]} -eq 0 ]; then
    echo -e "${GREEN}   ✅ All required .env patterns are in .gitignore${NC}"
else
    echo -e "${RED}   ❌ Missing patterns in .gitignore:${NC}"
    for missing in "${MISSING_IGNORES[@]}"; do
        echo -e "${RED}      - $missing${NC}"
    done
    ISSUES_FOUND=1
fi
echo ""

# Summary
echo -e "${BLUE}========================================${NC}"
if [ $ISSUES_FOUND -eq 0 ]; then
    echo -e "${GREEN}✅ Security Check Passed!${NC}"
    echo -e "${GREEN}Your repository appears to be free of exposed secrets.${NC}"
else
    echo -e "${RED}❌ Security Issues Found!${NC}"
    echo -e "${RED}Please fix the issues above before committing.${NC}"
    echo ""
    echo -e "${YELLOW}Quick fixes:${NC}"
    echo -e "1. Add .env files to .gitignore"
    echo -e "2. Remove tracked .env files: git rm --cached .env*"
    echo -e "3. Never hardcode API keys in your code"
    echo -e "4. Use environment variables instead"
    exit 1
fi
echo -e "${BLUE}========================================${NC}"

# Pre-commit hook recommendation
echo ""
echo -e "${BLUE}TIP: To automatically run this check before every commit:${NC}"
echo -e "${YELLOW}cp check-secrets.sh .git/hooks/pre-commit${NC}"
echo -e "${YELLOW}chmod +x .git/hooks/pre-commit${NC}"