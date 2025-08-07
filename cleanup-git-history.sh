#!/bin/bash

echo "This script will help clean the exposed API key from git history"
echo "WARNING: This will rewrite git history!"
echo ""
echo "Steps to clean the repository:"
echo ""
echo "Option 1: Using BFG Repo-Cleaner (Recommended for large repos):"
echo "-----------------------------------------------------------------"
echo "1. Install BFG: brew install bfg (Mac) or download from https://rtyley.github.io/bfg-repo-cleaner/"
echo "2. Create a backup of your repo first!"
echo "3. Run: bfg --replace-text <(echo 'AIzaSyB20tmcBvxE_1V6OyZnY50SKz0q-8ryUvQ==>REMOVED_API_KEY') --no-blob-protection"
echo "4. Run: git reflog expire --expire=now --all && git gc --prune=now --aggressive"
echo "5. Force push: git push --force-with-lease origin main"
echo ""
echo "Option 2: Using git filter-branch (Built-in but slower):"
echo "---------------------------------------------------------"
echo "1. Create a backup of your repo first!"
echo "2. Run the following command:"
cat << 'EOF'
git filter-branch --force --index-filter \
"git rm --cached --ignore-unmatch start-with-chatbot.sh" \
--prune-empty --tag-name-filter cat -- --all
EOF
echo ""
echo "3. Then run:"
echo "   git push --force-with-lease origin --all"
echo "   git push --force-with-lease origin --tags"
echo ""
echo "Option 3: If the repository is not critical, consider:"
echo "-------------------------------------------------------"
echo "1. Delete the repository from GitHub"
echo "2. Create a new repository"
echo "3. Push only the clean code without the problematic commit"
echo ""
echo "IMPORTANT NOTES:"
echo "- After cleaning, all collaborators must re-clone the repository"
echo "- The exposed key will still be visible in GitHub's cached views for some time"
echo "- ALWAYS revoke the exposed key immediately regardless of cleanup"