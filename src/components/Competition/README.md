# Competition Components

This directory contains modular components for the competition page, designed to be reusable and maintainable.

## Components Overview

### 🎯 CompetitionHero
The main hero section with the competition title, description, and call-to-action buttons.

**Features:**
- Gradient background with animated elements
- Registration status badge
- Primary and secondary CTA buttons

### 📊 CompetitionStats
Displays key competition statistics in a grid layout.

**Features:**
- Responsive grid (2 columns on mobile, 4 on desktop)
- Data driven from `src/data/competition.ts`
- Highlighted numbers with descriptions

### ⏰ Timeline
Interactive timeline showing competition phases and important dates.

**Features:**
- Alternating left/right layout
- Current phase highlighting
- Visual timeline with connecting line
- Responsive design

### 🏆 Prizes
Prize breakdown including main prizes and special awards.

**Features:**
- Highlighted grand prize with scaling effect
- Benefit lists with checkmark icons
- Special awards section
- Responsive grid layout

### ✅ Requirements
Competition categories and eligibility criteria.

**Features:**
- Category cards with hover effects
- Eligibility checklist with icons
- Two-column responsive layout

### 📧 RegistrationCTA
Final call-to-action section for registration.

**Features:**
- Email registration link
- Secondary navigation options
- Feature highlights with icons
- Benefit summary

## Usage

### Individual Import
```tsx
import CompetitionHero from '../components/Competition/CompetitionHero';
import Timeline from '../components/Competition/Timeline';
```

### Barrel Import (Recommended)
```tsx
import {
  CompetitionHero,
  CompetitionStats,
  Timeline,
  Prizes,
  Requirements,
  RegistrationCTA
} from '../components/Competition';
```

### Page Assembly
```tsx
export default function Competition() {
  return (
    <Layout>
      <main>
        <CompetitionHero />
        <CompetitionStats />
        <Timeline />
        <Prizes />
        <Requirements />
        <RegistrationCTA />
      </main>
    </Layout>
  );
}
```

## Data Management

All static data is managed in `src/data/competition.ts`:

- **competitionStats**: Array of statistics with values and labels
- **timelineEvents**: Timeline events with dates, descriptions, and status
- **prizes**: Prize information including benefits and highlighting
- **specialAwards**: List of special award categories
- **competitionCategories**: Competition focus areas
- **eligibilityCriteria**: Participation requirements

## Styling

Components use:
- **Tailwind CSS** for styling
- **Shadcn/ui components** for consistent design
- **Responsive design** for mobile-first approach
- **CSS custom properties** for theme integration

## Customization

### Modifying Data
Update `src/data/competition.ts` to change:
- Statistics values
- Timeline dates and descriptions
- Prize amounts and benefits
- Categories and requirements

### Styling Changes
- Use Tailwind utility classes
- Follow existing design patterns
- Maintain responsive behavior
- Keep accessibility in mind

### Adding New Components
1. Create new component file in this directory
2. Export from `index.ts`
3. Import and use in the main page
4. Add any new data to `competition.ts`

## Best Practices

- ✅ Keep components focused on single responsibility
- ✅ Use TypeScript interfaces for type safety
- ✅ Follow existing naming conventions
- ✅ Maintain responsive design
- ✅ Add proper accessibility attributes
- ✅ Use semantic HTML elements

## Dependencies

- React
- @docusaurus/Link
- ../ui/card (Shadcn/ui)
- ../ui/button (Shadcn/ui)
- ../../data/competition

This modular approach ensures maintainability, reusability, and clear separation of concerns. 