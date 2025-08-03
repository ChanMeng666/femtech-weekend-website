# Security Configuration

## Environment Variables

This project uses environment variables to store sensitive configuration. Follow these guidelines to keep your deployment secure:

### Local Development

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your actual API keys and credentials

3. **NEVER** commit `.env.local` to version control

### Production Deployment (Vercel)

For production deployment on Vercel, add the following environment variables in your Vercel project settings:

#### Required Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google Gemini AI API key | [Google AI Studio](https://makersuite.google.com/app/apikey) |
| `NOTION_TOKEN` | Notion integration token | [Notion Integrations](https://www.notion.so/my-integrations) |
| `NOTION_DATABASE_ID` | Main ecosystem database ID | Your Notion workspace |
| `PDF_FORM_DATABASE_ID` | PDF form submissions database | Your Notion workspace |

#### Optional Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name | [Cloudinary Dashboard](https://cloudinary.com/console) |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Cloudinary Dashboard |

### Security Best Practices

1. **API Key Rotation**: Regularly rotate your API keys
2. **Least Privilege**: Only grant necessary permissions to API keys
3. **Environment Isolation**: Use different API keys for development and production
4. **Access Control**: Limit who has access to production environment variables
5. **Monitoring**: Monitor API usage for unusual patterns

### If API Key is Exposed

If you accidentally commit an API key:

1. **Immediately revoke** the exposed key
2. **Generate a new key** from the service provider
3. **Update** your environment variables in all deployments
4. **Review** access logs for any unauthorized usage
5. Consider using `git filter-branch` or BFG Repo-Cleaner to remove the key from Git history

### Vercel Deployment Steps

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to "Settings" → "Environment Variables"
4. Add each variable with its corresponding value
5. Deploy or redeploy your project

### Contact

For security concerns or questions, please contact: hello@femtechweekend.com