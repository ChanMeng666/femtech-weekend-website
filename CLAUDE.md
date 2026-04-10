# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the FemTech Weekend Platform - a Docusaurus-based website for China's first women's health technology innovation organization. The platform supports competition management, ecosystem directory, research insights, and global community building.

## Tech Stack

- **Framework**: Docusaurus 3.7 with React 18
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom design system
- **API**: Serverless functions (Cloudflare Pages deployment)
- **CMS**: Notion API for content management
- **Media**: Cloudinary for image optimization
- **Search**: Algolia integration

## Commands

### Development
```bash
npm run start          # Start Docusaurus dev server (port 3000)
npm run api           # Start API server separately (port 3001)
npm run dev           # Run both Docusaurus and API server concurrently
```

### Build & Quality
```bash
npm run build         # Production build
npm run typecheck     # TypeScript type checking
npm run serve         # Preview production build locally
npm run clear         # Clear cache
```

### Deployment
```bash
npm run build         # Production build (deployed via Cloudflare Pages)
```

## Architecture

### Directory Structure
```
/
├── src/
│   ├── pages/           # Main page components (React/TypeScript)
│   ├── components/      # Reusable UI components
│   │   ├── AboutUs/     # About page components
│   │   ├── ShanghaiSummit/ # Shanghai Summit components
│   │   └── ui/          # Shared UI components (shadcn-style)
│   ├── api/             # Serverless API functions
│   ├── constants/       # Application constants
│   ├── data/           # Static data and configurations
│   ├── types/          # TypeScript type definitions
│   └── css/            # Global styles and Tailwind config
├── functions/          # Cloudflare Pages Functions (API routes)
├── blog/               # Blog / Insights content
├── stories/            # Stories blog plugin content
├── opinions/           # Opinions blog plugin content
├── static/
│   ├── img/            # Static images
│   ├── docs/           # Developer documentation
│   │   ├── content-management/
│   │   ├── styling-and-design/
│   │   ├── integrations/
│   │   └── infrastructure/
│   └── data/           # Static data files
└── i18n/               # Internationalization (en, zh-Hans)
```

### Key Pages

- **Homepage** (`src/pages/index.tsx`): Main landing page with hero, features, testimonials
- **About Us** (`src/pages/about-us.tsx`): Organization info, team, advisors
- **Insights** (`src/pages/insights.tsx`): Research reports and market analysis
- **Stories** (`src/pages/stories.tsx`): Character interviews and inspiring stories
- **Opinions** (`src/pages/opinions.tsx`): Short articles and commentary
- **Shanghai Summit** (`src/pages/shanghai-summit.tsx`): Summit event page

### Environment Variables

Required for API functionality:
- `NOTION_TOKEN` - Notion integration token
- `NOTION_DATABASE_ID` - Main ecosystem database ID
- `PDF_FORM_DATABASE_ID` - PDF form submissions database
- `CLOUDINARY_CLOUD_NAME` - Cloudinary account name (optional)
- `CLOUDINARY_API_KEY` - Cloudinary API key (optional)
- `CLOUDINARY_API_SECRET` - Cloudinary API secret (optional)

### Styling Approach

- Uses TailwindCSS with Docusaurus preflight disabled
- Custom CSS variables for theming in `src/css/custom.css`
- Component-specific styles use CSS modules or Tailwind classes
- Dark mode support via Docusaurus theme

### Internationalization

- Bilingual support (English/Chinese) configured in `docusaurus.config.ts`
- Locales: `en` (default) and `zh-Hans`
- Translation files in `i18n/` directory

### Development Notes

- The site uses Docusaurus's MDX support for content pages
- React components can be embedded in MDX files
- API development server runs on port 3001 (separate from Docusaurus)
- Algolia search is configured but requires proper indexing
- Footer QR codes link to WeChat and Xiaohongshu social accounts

### Testing

No test framework is currently configured. Tests would need to be set up if required.