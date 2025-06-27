<div align="center">
 <h1><img src="static/img/logo/femtech_weekend_logo_new.svg" width="200px"><br/><small>Empowering Women's Health Innovation Platform</small></h1>
 <img src="https://img.shields.io/badge/docusaurus-%234CAF50.svg?style=for-the-badge&logo=docusaurus&logoColor=white"/>
 <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
 <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
 <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
 <img src="https://img.shields.io/badge/notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white"/>
 <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white"/>
</div>

> [!IMPORTANT]
> This is a production-ready platform for FemTech Weekend, built with modern web technologies and best practices. The platform serves as a comprehensive hub for women's health innovation in China and globally.

# 🌟 Introduction

A comprehensive production-ready website platform built with Docusaurus, designed specifically for FemTech Weekend - a pioneering initiative that drives women's health innovation rooted in China with global impact. This project demonstrates modern web development practices with internationalization, API integrations, and dynamic content management.

> [!NOTE]
> - Node.js >= 18.0 required
> - Notion API access required for content management
> - Cloudinary account recommended for image uploads

<br/>

[![🚀 Visit Live Site 🚀](https://gradient-svg-generator.vercel.app/api/svg?text=%F0%9F%9A%80Visit%20Live%20Site%F0%9F%9A%80&color=000000&height=60&gradientType=radial&duration=6s&color0=ffffff&template=pride-rainbow)](https://femtech-weekend-website.vercel.app/)

<br/>

## ✨ Key Features

🎯 **Multi-purpose Platform**
- Competition management and registration
- Ecosystem directory with 200+ members
- Research reports and insights hub
- Blog and documentation system

🌐 **International Ready**
- Full bilingual support (English/Chinese)
- Localized content management
- Cultural adaptation features

📱 **Modern User Experience**
- Responsive design across all devices
- Interactive animations and transitions
- Progressive Web App capabilities

🔗 **Seamless Integrations**
- Notion API for content management
- Cloudinary for image optimization
- Algolia for powerful search

## 📚 Table of Contents

- [🌟 Introduction](#-introduction)
  - [✨ Key Features](#-key-features)
  - [📚 Table of Contents](#-table-of-contents)
  - [🛠️ Tech Stack](#️-tech-stack)
  - [🏗️ Architecture Overview](#️-architecture-overview)
    - [Frontend Architecture](#frontend-architecture)
    - [Backend Architecture](#backend-architecture)
    - [Content Management Flow](#content-management-flow)
    - [Deployment Pipeline](#deployment-pipeline)
  - [📂 Project Structure](#-project-structure)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Quick Start Installation](#quick-start-installation)
    - [Manual Installation](#manual-installation)
    - [Environment Configuration](#environment-configuration)
  - [📝 API Documentation](#-api-documentation)
    - [Form Submissions](#form-submissions)
    - [Image Upload](#image-upload)
    - [Ecosystem Management](#ecosystem-management)
  - [📖 Development Guide](#-development-guide)
    - [Key Components](#key-components)
    - [Adding New Features](#adding-new-features)
    - [Internationalization](#internationalization)
  - [🌐 Content Management](#-content-management)
  - [🎨 UI Components](#-ui-components)
  - [🚀 Deployment](#-deployment)
    - [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
    - [Environment Variables Setup](#environment-variables-setup)
    - [Custom Domain Setup](#custom-domain-setup)
  - [🤝 Contributing](#-contributing)
    - [Development Process](#development-process)
    - [Code Style Guidelines](#code-style-guidelines)
    - [Issue Reporting](#issue-reporting)
  - [📄 License](#-license)
  - [🙋‍♀️ Author](#️-author)

## 🛠️ Tech Stack

<div align="center">
  <table>
    <tr>
      <td align="center" width="96">
        <img src="https://cdn.simpleicons.org/docusaurus" width="48" height="48" alt="Docusaurus" />
        <br>Docusaurus
      </td>
      <td align="center" width="96">
        <img src="https://cdn.simpleicons.org/react" width="48" height="48" alt="React" />
        <br>React
      </td>
      <td align="center" width="96">
        <img src="https://cdn.simpleicons.org/typescript" width="48" height="48" alt="TypeScript" />
        <br>TypeScript
      </td>
      <td align="center" width="96">
        <img src="https://cdn.simpleicons.org/tailwindcss" width="48" height="48" alt="TailwindCSS" />
        <br>Tailwind
      </td>
      <td align="center" width="96">
        <img src="https://cdn.simpleicons.org/notion" width="48" height="48" alt="Notion" />
        <br>Notion API
      </td>
      <td align="center" width="96">
        <img src="https://cdn.simpleicons.org/cloudinary" width="48" height="48" alt="Cloudinary" />
        <br>Cloudinary
      </td>
      <td align="center" width="96">
        <img src="https://cdn.simpleicons.org/vercel" width="48" height="48" alt="Vercel" />
        <br>Vercel
      </td>
    </tr>
  </table>
</div>

> [!TIP]
> Each technology in our stack was chosen for its production readiness and excellent developer experience. See our detailed documentation for implementation specifics.

## 🏗️ Architecture Overview

### Frontend Architecture

The platform follows a modern component-based architecture with clear separation of concerns:

- **Presentation Layer**: React components with TypeScript
- **Content Layer**: MDX files and dynamic Notion integration
- **Styling Layer**: TailwindCSS with custom design system
- **Internationalization**: Built-in i18n support for English/Chinese

### Backend Architecture

The platform uses a serverless architecture with API routes handling various functionalities:

| Component | Purpose | Integration |
|-----------|---------|-------------|
| PDF Form Submit | Collects user info before downloads | Notion Database |
| Ecosystem Submit | Manages member directory | Notion + Cloudinary |
| Image Upload | Handles media uploads | Cloudinary API |
| Content Sync | Manages blog/docs content | Notion CMS |

### Content Management Flow

The content workflow supports both static and dynamic content:

1. **Static Content**: MDX files for documentation and blog posts
2. **Dynamic Content**: Notion databases for ecosystem members and form submissions
3. **Media Assets**: Cloudinary for optimized image delivery
4. **Search**: Algolia integration for powerful site search

### Deployment Pipeline

The application uses modern CI/CD practices with automatic deployments:

- **Development**: Local development with hot reload
- **Staging**: Branch deployments on Vercel
- **Production**: Automatic deployment from main branch
- **CDN**: Global content delivery via Vercel Edge Network

## 📂 Project Structure

```
femtech-weekend-website/
├── api/                    # Serverless API functions
│   ├── pdf-form-submit/   # PDF download form handler
│   ├── submit-ecosystem/  # Ecosystem directory submissions
│   └── upload-image/      # Image upload service
├── src/
│   ├── components/        # React UI components
│   │   ├── AboutUs/      # About page components
│   │   ├── Competition/  # Competition-related components
│   │   ├── Ecosystem/    # Member directory components
│   │   ├── Reports/      # Research reports components
│   │   └── ui/           # Reusable UI components
│   ├── constants/        # Application constants
│   ├── data/            # Static data and configurations
│   ├── pages/           # Main application pages
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── docs/                # Documentation and insights
├── blog/                # Competition announcements
├── i18n/                # Internationalization files
│   └── zh-Hans/        # Chinese translations
├── static/              # Static assets
│   ├── img/            # Images and logos
│   └── data/           # JSON data files
└── tailwind.config.js   # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites

> [!IMPORTANT]
> Before you begin, ensure you have the following installed:
> - Node.js 18.0 or higher
> - npm or yarn package manager
> - Git version control
> - Notion account and API token
> - Cloudinary account (optional, for image uploads)

### Quick Start Installation

The fastest way to get started is using our one-click installation script:

```bash
# Clone the repository
git clone https://github.com/ChanMeng666/femtech-weekend-website.git
cd femtech-weekend-website

# Run the automated setup
node install.js
```

This script will:
1. ✅ Check your Node.js version compatibility
2. 📦 Install all project dependencies
3. ⚙️ Create necessary configuration files
4. 🔗 Verify API routes functionality
5. 🚀 Offer to start the development environment

### Manual Installation

If you prefer manual installation:

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API credentials

# Start development servers
npm run dev
```

### Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Notion API Configuration
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_main_database_id
NOTION_BLOG_DATABASE_ID=your_blog_database_id
PDF_FORM_DATABASE_ID=your_pdf_form_database_id

# Cloudinary Configuration (Optional)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Additional Configuration
NODE_ENV=development
```

## 📝 API Documentation

### Form Submissions

<details>
<summary>PDF Form Submission</summary>

```http
POST /api/pdf-form-submit
Content-Type: application/json

{
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com",
    "company": "Tech Corp",
    "website": "https://techcorp.com",
    "country": "China",
    "pdfUrl": "https://example.com/report.pdf",
    "timestamp": "2024-01-01T00:00:00Z"
}

Response 200:
{
    "success": true,
    "message": "Form submitted successfully",
    "pageId": "notion_page_id"
}
```
</details>

<details>
<summary>Ecosystem Submission</summary>

```http
POST /api/submit-ecosystem
Content-Type: application/json

{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "companyName": "HealthTech Innovations",
    "companyWebsite": "https://healthtech.com",
    "founderName": "Jane Doe",
    "businessDescription": "AI-powered women's health platform",
    "businessStage": "Series A",
    "categories": ["AI/ML", "Digital Health"]
}

Response 200:
{
    "success": true,
    "message": "Application submitted successfully",
    "pageId": "notion_page_id"
}
```
</details>

### Image Upload

<details>
<summary>Image Upload to Cloudinary</summary>

```http
POST /api/upload-image
Content-Type: multipart/form-data

FormData:
- file: [image file]
- folder: "ecosystem" (optional)

Response 200:
{
    "success": true,
    "url": "https://res.cloudinary.com/...",
    "publicId": "image_public_id"
}
```
</details>

### Ecosystem Management

The ecosystem directory automatically syncs with Notion databases, supporting:
- Member profile management
- Category filtering and search
- Automatic image optimization
- Real-time content updates

## 📖 Development Guide

### Key Components

> [!NOTE]
> The application follows a modular component architecture:

**Homepage Components:**
- `Hero.tsx`: Main landing section with rotating text
- `CompetitionSection.tsx`: Competition announcements
- `Features.tsx`: Platform features showcase
- `PartnershipSection.tsx`: Partner organizations

**Ecosystem Components:**
- `EcosystemHero.tsx`: Ecosystem landing section
- `MemberDirectory.tsx`: Searchable member directory
- `JoinForm/`: Multi-step application form
- `MemberCard.tsx`: Individual member profiles

**Utility Components:**
- `DownloadPdfButton/`: PDF download with form collection
- `ShowcaseCard/`: Reusable content cards
- `ZoomableImage/`: Interactive image viewer

### Adding New Features

> [!TIP]
> Follow this workflow to add new features:

1. **Create Component Structure**
```bash
mkdir src/components/NewFeature
touch src/components/NewFeature/index.tsx
touch src/components/NewFeature/README.md
```

2. **Define TypeScript Interfaces**
```typescript
// src/types/new-feature.ts
export interface NewFeatureProps {
  title: string;
  description: string;
  // Add other props
}
```

3. **Add Internationalization**
```typescript
// src/constants/new-feature.ts
export const getNewFeatureTitle = () => translate({
  id: 'newFeature.title',
  message: 'Default Title',
});
```

4. **Implement Component**
```tsx
// src/components/NewFeature/index.tsx
import React from 'react';
import { getNewFeatureTitle } from '../../constants/new-feature';

export const NewFeature: React.FC<NewFeatureProps> = (props) => {
  const title = getNewFeatureTitle();
  
  return (
    <div className="new-feature">
      <h2>{title}</h2>
      {/* Component implementation */}
    </div>
  );
};
```

### Internationalization

The platform supports full bilingual functionality:

**Adding New Translations:**

1. **English (Default)**
```json
// i18n/en/code.json
{
  "newFeature.title": "New Feature Title",
  "newFeature.description": "Feature description"
}
```

2. **Chinese**
```json
// i18n/zh-Hans/code.json
{
  "newFeature.title": "新功能标题",
  "newFeature.description": "功能描述"
}
```

3. **Usage in Components**
```tsx
import { translate } from '@docusaurus/Translate';

const title = translate({
  id: 'newFeature.title',
  message: 'Default Title', // Fallback
});
```

## 🌐 Content Management

The platform uses Notion as a headless CMS for dynamic content:

**Notion Database Structure:**

| Database | Purpose | Properties |
|----------|---------|------------|
| Main Content | Blog posts and articles | Title, Content, Author, Date, Tags |
| Ecosystem Members | Member directory | Name, Company, Bio, Category, Location |
| PDF Forms | Download tracking | Name, Email, Company, Country, PDF URL |
| Competition | Event management | Title, Description, Dates, Requirements |

**Content Workflow:**
1. 📝 Content creators update Notion databases
2. 🔄 Webhook triggers content sync (or manual rebuild)
3. 🚀 Static site regeneration updates live site
4. 📱 Users see updated content instantly

## 🎨 UI Components

The platform includes a comprehensive design system:

**Base Components:**
- `Button`: Customizable buttons with variants
- `Card`: Content containers with consistent styling  
- `Modal`: Accessible modal dialogs
- `Marquee`: Scrolling text animations

**Advanced Components:**
- `WordRotate`: Animated text rotation
- `LogoMosaic`: Dynamic logo displays
- `ZoomableImage`: Image viewer with zoom
- `ShowcaseFilters`: Advanced filtering system

**Styling System:**
- 🎨 TailwindCSS for utility-first styling
- 🌙 Dark/light theme support
- 📱 Responsive design patterns
- ♿ Accessibility-first approach

## 🚀 Deployment

### Vercel Deployment (Recommended)

The platform is optimized for Vercel deployment:

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod
```

**Deployment Configuration:**
```json
// vercel.json
{
  "builds": [
    { "src": "package.json", "use": "@vercel/static-build" },
    { "src": "api/**/*.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/$1" }
  ]
}
```

### Environment Variables Setup

In your Vercel dashboard, add these environment variables:

- `NOTION_TOKEN`: Your Notion integration token
- `NOTION_DATABASE_ID`: Main content database ID
- `PDF_FORM_DATABASE_ID`: PDF form submissions database ID
- `CLOUDINARY_CLOUD_NAME`: Cloudinary account name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

### Custom Domain Setup

1. Add your domain in Vercel dashboard
2. Configure DNS records:
   - `A` record: `76.76.19.61`
   - `CNAME` record: `cname.vercel-dns.com`
3. Enable SSL (automatic with Vercel)

## 🤝 Contributing

We welcome contributions to the FemTech Weekend platform! Here's how you can help:

### Development Process

1. **Fork the Repository**
```bash
git clone https://github.com/ChanMeng666/femtech-weekend-website.git
cd femtech-weekend-website
```

2. **Create Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

3. **Make Your Changes**
- Follow existing code patterns
- Add TypeScript types for new features
- Include internationalization for user-facing text
- Write tests for complex logic

4. **Test Your Changes**
```bash
npm run build
npm run start
```

5. **Submit Pull Request**
- Provide clear description of changes
- Include screenshots for UI changes
- Reference related issues

### Code Style Guidelines

- 🔤 Use TypeScript for all new code
- 📏 Follow ESLint configuration
- 🎨 Use TailwindCSS for styling
- 📝 Add JSDoc comments for complex functions
- 🌐 Include translations for new text

### Issue Reporting

When reporting issues, please include:
- 🖥️ Browser and version
- 📱 Device type (mobile/desktop)
- 🔍 Steps to reproduce
- 📸 Screenshots if applicable
- 🌐 Language setting (EN/ZH)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♀️ Author

**Chan Meng**
- <img src="https://cdn.simpleicons.org/linkedin/0A66C2" width="16" height="16"> LinkedIn: [chanmeng666](https://www.linkedin.com/in/chanmeng666/)
- <img src="https://cdn.simpleicons.org/github/181717" width="16" height="16"> GitHub: [ChanMeng666](https://github.com/ChanMeng666)
- <img src="https://cdn.simpleicons.org/gmail/EA4335" width="16" height="16"> Email: chanmeng666@gmail.com

---

<div align="center">
<strong>🚀 Empowering Women's Health Innovation 🌟</strong>
<br/>
<em>Rooted in China, Connecting globally</em>
<br/><br/>
⭐ Star us on GitHub | 📖 Read the Docs | 🐛 Report Issues | 💡 Request Features
<br/><br/>
<img src="static/img/logo/femtech_weekend_logo_new.svg" width="100px">
</div>
