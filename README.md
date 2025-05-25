# FemTech Weekend Website

The FemTech Weekend Website is a comprehensive platform built using [Docusaurus](https://docusaurus.io/), designed to support the FemTech Weekend community. It serves as a hub for the FemTech ecosystem, providing information about competitions, reports, and a database of FemTech startups.

## Features

- **Multilingual Support**: English and Chinese (Simplified) languages
- **Competition Platform**: Information and registration for FemTech Weekend competitions
- **Ecosystem Database**: Showcases FemTech startups and provides a submission form for new companies
- **Reports and Insights**: Research and insights on the FemTech industry
- **Interactive UI**: Modern and responsive design with TailwindCSS
- **Form Submission**: Integration with Notion for data storage and Cloudinary for image uploads

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
NOTION_TOKEN=your_notion_token_here
NOTION_DATABASE_ID=your_notion_database_id_here

# Cloudinary configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
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


