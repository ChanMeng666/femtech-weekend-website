# Security Best Practices for API Keys

## IMPORTANT: Your API key has been exposed!

If you're reading this because of a security incident, follow these steps immediately:

### Immediate Actions Required:

1. **Revoke the compromised key NOW**
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Find the exposed key and click "Delete" or "Revoke"
   - This is critical - the key is already public!

2. **Generate a new API key**
   - Create a new API key in the same console
   - Add restrictions (HTTP referrers, API restrictions)
   - Never commit this new key to git

3. **Clean git history** (see cleanup-git-history.sh)

## Preventing Future Incidents

### 1. Never Hardcode Secrets
```bash
# ❌ WRONG - Never do this
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyB20tmcBvxE_1V6OyZnY50SKz0q-8ryUvQ

# ✅ CORRECT - Use environment variables
GOOGLE_GENERATIVE_AI_API_KEY="${GOOGLE_GENERATIVE_AI_API_KEY}"
```

### 2. Use Environment Files Correctly
- Keep `.env.local` for actual secrets (never commit)
- Use `.env.example` as a template (safe to commit)
- Ensure `.env*` files are in `.gitignore`

### 3. Pre-commit Checks
Install git-secrets or similar tools:
```bash
# Install git-secrets
brew install git-secrets  # Mac
# or
git clone https://github.com/awslabs/git-secrets.git

# Configure for Google API keys
git secrets --register-aws
git secrets --add 'AIza[0-9A-Za-z\-_]{35}'
git secrets --install
```

### 4. Use Secret Management Services
For production:
- Vercel Environment Variables
- GitHub Secrets
- AWS Secrets Manager
- HashiCorp Vault

### 5. API Key Restrictions
Always restrict your API keys:
- By IP address
- By HTTP referrer
- By API service

### 6. Regular Audits
- Rotate keys regularly
- Monitor API usage
- Use tools like GitGuardian
- Review commit history before pushing

## If You've Already Exposed a Key

1. **Assume it's compromised** - Act immediately
2. **Revoke first** - Don't wait
3. **Check usage** - Review API console for unauthorized use
4. **Clean history** - Remove from all branches
5. **Notify team** - If working with others
6. **Learn** - Implement preventive measures

## Useful Commands

```bash
# Search for potential secrets in your code
grep -r "AIza" . --exclude-dir=node_modules

# Check git history for secrets
git log -p | grep -E "AIza[0-9A-Za-z\-_]{35}"

# List all environment variables
printenv | grep API

# Check what will be committed
git diff --cached
```

## Resources
- [Google API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [OWASP Secret Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)