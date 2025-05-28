# FemTech Weekend Website

This is the website for FemTech Weekend, built with Docusaurus and integrated with Notion for content management.

## Installation

### One-Click Installation

The easiest way to get started is to use the one-click installation script:

```bash
node install.js
```

This script will:
1. Check your Node.js version
2. Install all dependencies
3. Create necessary configuration files
4. Verify API routes
5. Offer to start the development environment

### Manual Installation

If you prefer to install manually:

```bash
npm install
```

## Development

The easiest way to run the development environment is to use the setup script:

```bash
chmod +x setup.sh
./setup.sh
```

This will:
1. Install all dependencies
2. Create the `.env.local` file with the correct environment variables
3. Offer to run a test of the PDF form submission
4. Start both the Docusaurus server and API server simultaneously

You can also start the development environment directly:

```bash
node start-dev.js
```

For more granular control, you can run the servers separately:

```bash
# Just the Docusaurus site
npm run start

# Just the API server
npm run api

# Both servers together (using concurrently)
npm run dev
```

## Important API Routes

The website includes several API routes for form submissions:

- `/api/pdf-form-submit` - Handles PDF form submissions to Notion
- `/api/submit-ecosystem` - Handles ecosystem form submissions to Notion
- `/api/upload-image` - Handles image uploads to Cloudinary

## Environment Variables

The application requires several environment variables to function correctly. These are loaded from a `.env.local` file which should contain:

```
# Notion API credentials
NOTION_TOKEN=your_notion_token
NOTION_DATABASE_ID=your_notion_database_id
NOTION_BLOG_DATABASE_ID=your_notion_blog_database_id
PDF_FORM_DATABASE_ID=your_pdf_form_database_id

# Cloudinary configuration (if using image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Features

- **Blog and Documentation**: Powered by Docusaurus
- **PDF Form Submissions**: Collects user information before PDF downloads
- **Ecosystem Directory**: Showcases FemTech companies and organizations
- **Image Uploads**: Supports image uploads to Cloudinary
- **Notion Integration**: Stores form submissions and content in Notion databases

## Components

### DownloadPdfButton

A reusable component that displays a form before allowing PDF downloads. Usage:

```jsx
import DownloadPdfButton from '@site/src/components/DownloadPdfButton';

<DownloadPdfButton 
  pdfUrl="https://example.com/your-pdf-file.pdf" 
  buttonText="Download Full PDF Report"
/>
```

Form submissions are stored in your Notion database.

## Technology Stack

- **Frontend**: Docusaurus, React, TypeScript, TailwindCSS
- **Backend**: Node.js API server
- **Data Storage**: Notion API integration
- **Image Storage**: Cloudinary integration
- **Search**: Algolia search integration

## Setup Instructions

### Prerequisites

- Node.js (v18.0 or higher)
- npm or yarn
- Notion account and API token
- Cloudinary account

### Installation

```bash
# Clone the repository
git clone https://github.com/ChanMeng666/femtech-weekend-website.git
cd femtech-weekend-website

# Install dependencies
npm install
# Or with yarn
yarn
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Notion API credentials
NOTION_TOKEN=your_notion_token
NOTION_DATABASE_ID=your_notion_database_id
NOTION_BLOG_DATABASE_ID=your_notion_blog_database_id
PDF_FORM_DATABASE_ID=your_pdf_form_database_id

# Cloudinary configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Notion Database Setup

For the `/ecosystem/join` form to work properly, you need to set up a Notion database with the following properties:

- `Name` (title)
- `Email` (email)
- `Company Name` (rich text)
- `Company Website` (url)
- `Company LinkedIn` (url)
- `Company Instagram` (url)
- `Founder Name` (rich text)
- `Founder LinkedIn` (url)
- `Business Description` (rich text)
- `Business Stage` (select)
- `Categories` (multi-select)
- `Additional Info` (rich text)
- `Logo` (files & media)

## Development

### Run the Development Server

To run both the Docusaurus site and the API server concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Run the Docusaurus server (in one terminal)
npm run start

# Run the API server (in another terminal)
npm run api
```

The Docusaurus site will be available at [http://localhost:3000](http://localhost:3000) and the API server at [http://localhost:3001](http://localhost:3001).

### Project Structure

- `/src/pages`: Main website pages
- `/src/components`: React components for the UI
- `/src/api`: API server endpoints for form submissions
- `/docs`: Documentation and FemTech insights
- `/blog`: Blog posts and competition announcements
- `/i18n`: Internationalization files for Chinese translation
- `/static`: Static assets including images and data files

## Building for Production

```bash
npm run build
# Or with yarn
yarn build
```

This command generates static content into the `build` directory which can be served using any static contents hosting service.

## Deployment

### Vercel Deployment

This project is configured for deployment on Vercel with API routes support. The `api` directory contains serverless functions that handle form submissions and image uploads.

When deploying to Vercel:

1. Connect your GitHub repository to Vercel
2. Add the following environment variables in the Vercel project settings:
   - `NOTION_TOKEN`
   - `NOTION_DATABASE_ID`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
3. Deploy the project

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

When deploying to production, make sure to set up the necessary environment variables for Notion and Cloudinary in your hosting platform.

## Customization

- The announcement bar can be updated in `docusaurus.config.ts` by changing the `ANNOUNCEMENT_EVENT` and `ANNOUNCEMENT_DATE` constants
- Main navigation structure is defined in the `navbar` section of `docusaurus.config.ts`
- Homepage sections are configured in the `HomepageContent.tsx` component

## i18n

The key insight is that Docusaurus's i18n system works by replacing the entire page component when switching languages, not just translating strings within the same component.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the terms specified in the `LICENSE` file.


