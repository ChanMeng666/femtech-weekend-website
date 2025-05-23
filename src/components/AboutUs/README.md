# AboutUs Components

This directory contains all the components related to the About Us page, organized for better maintainability and reusability.

## Component Structure

```
AboutUs/
├── index.ts                 # Main export file
├── AboutHero.tsx           # Hero section component
├── MissionVision.tsx       # Mission and Vision section
├── Values.tsx              # Company values section  
├── Team.tsx                # Team section container
├── TeamMember.tsx          # Individual team member card
├── CallToAction.tsx        # CTA section
└── README.md               # This documentation
```

## Components Description

### AboutHero
The hero section with the main title and introduction text.

### MissionVision  
Displays the company's mission and vision in a two-column card layout.

### Values
Shows the four core values with icons and descriptions in a responsive grid.

### Team
Container component that renders all team members using the TeamMember component.

### TeamMember
Reusable component for displaying individual team member information including:
- Name and role
- Bio text
- Optional profile image
- Optional LinkedIn link

**Props:**
```typescript
interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
}
```

### CallToAction
Final section with buttons encouraging user engagement.

## Usage

Import components individually:
```typescript
import { AboutHero, Team } from '../components/AboutUs';
```

Or import all components:
```typescript
import { 
  AboutHero, 
  MissionVision, 
  Values, 
  Team, 
  CallToAction 
} from '../components/AboutUs';
```

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be used in other pages if needed
3. **Maintainability**: Easy to find and update specific sections
4. **Testability**: Each component can be tested independently
5. **Scalability**: Easy to add new sections or modify existing ones

## Dependencies

- React
- Docusaurus Link component
- UI components from `../ui/` (Card, Button)
- TailwindCSS for styling 