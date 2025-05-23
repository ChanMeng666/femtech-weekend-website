# Ecosystem Components

This directory contains all components related to the FemTech Weekend Ecosystem page.

## Structure

```
Ecosystem/
├── index.ts                # Exports all components for easy importing
├── EcosystemHero.tsx      # Hero section with main heading and introduction
├── EcosystemMission.tsx   # Mission statement and values section
├── EcosystemStats.tsx     # Statistics display component
├── JoinEcosystem.tsx      # Call-to-action section for joining
├── MemberCard.tsx         # Individual member profile card
├── MemberDirectory.tsx    # Member filtering and grid display
└── README.md              # This documentation file
```

## Component Responsibilities

### `EcosystemHero`
- Displays the main hero section with title and description
- Includes decorative background elements
- No props required

### `EcosystemMission`
- Shows the mission statement and values
- Explains the purpose and goals of the ecosystem
- No props required

### `EcosystemStats`
- Displays key statistics about the community
- Uses data from `../../data/ecosystemData.ts`
- No props required

### `MemberCard`
- Renders individual member profile cards
- Props: `{ member: EcosystemMember }`
- Displays member info, expertise tags, and achievements

### `MemberDirectory`
- Handles member filtering by category
- Displays filtered member grid
- Contains category filter buttons
- Manages its own state for active category

### `JoinEcosystem`
- Call-to-action section for joining the ecosystem
- Contains links to learn more and apply
- No props required

## Data Dependencies

All components use data from:
- `../../types/ecosystem.ts` - TypeScript type definitions
- `../../data/ecosystemData.ts` - Ecosystem member data and categories

## Usage

```tsx
import {
  EcosystemHero,
  EcosystemStats,
  EcosystemMission,
  MemberDirectory,
  JoinEcosystem
} from '../components/Ecosystem';

// Use in your page component
<main>
  <EcosystemHero />
  <EcosystemStats />
  <EcosystemMission />
  <MemberDirectory />
  <JoinEcosystem />
</main>
```

## Benefits of This Structure

1. **Modularity**: Each component has a single responsibility
2. **Reusability**: Components can be used in different contexts
3. **Maintainability**: Easy to find and modify specific functionality
4. **Testability**: Individual components can be tested in isolation
5. **Type Safety**: Shared types ensure consistency across components 