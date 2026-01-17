# Reports Components

This directory contains all components related to the Reports page functionality.

## Structure

```
Reports/
├── index.tsx              # Main exports
├── ReportCard.tsx         # Individual report card component
├── FeaturedReport.tsx     # Featured report display component
├── ReportsHero.tsx        # Hero section component
├── ReportsNavigation.tsx  # Category navigation component
├── ReportsCTA.tsx         # Call-to-action section component
└── README.md             # This file
```

## Components

### ReportCard
Individual report card component that displays:
- Report thumbnail/placeholder
- Category badge
- Title and description
- Author, date, and read time
- Tags

### FeaturedReport
Large featured report component with enhanced layout:
- Side-by-side image and content layout
- Featured badge
- Larger typography
- All report tags displayed

### ReportsHero
Hero section with:
- Page title
- Description
- Background gradient effect

### ReportsNavigation
Category navigation component:
- Category filter buttons
- Active state handling
- Responsive design

### ReportsCTA
Call-to-action section:
- Newsletter signup encouragement
- Action buttons
- Contact information

## Usage

```tsx
import {
  ReportCard,
  FeaturedReport,
  ReportsHero,
  ReportsNavigation,
  ReportsCTA
} from '../components/Reports';

// Use in your page component
<ReportsHero />
<ReportsNavigation 
  activeCategory={activeCategory}
  onCategoryChange={handleCategoryChange}
/>
<FeaturedReport report={featuredReport} />
<ReportCard report={report} />
<ReportsCTA />
```

## Related Files

- `src/types/reports.ts` - Type definitions
- `src/data/reports.ts` - Data and utility functions
- `src/constants/reports.ts` - Constants
- `src/pages/reports.tsx` - Main page component 