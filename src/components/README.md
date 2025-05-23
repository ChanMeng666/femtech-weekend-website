# Components

This directory contains reusable React components used throughout the FemTech Weekend Website.

## Structure

### Showcase Components

These components are used in the database/showcase page:

- **ShowcaseHeader/** - Page header component with title and description
- **ShowcaseLayout/** - Main layout component that combines all showcase elements
- **ShowcaseFilters/** - Filter functionality for showcase items
- **ShowcaseCards/** - Grid display of showcase items
- **ShowcaseSearchBar/** - Search functionality
- **ShowcaseCard/** - Individual showcase item component
- **ShowcaseTagSelect/** - Tag selection component

### UI Components

- **ui/** - Generic UI components (buttons, inputs, etc.)

### Feature Components

- **HomepageFeatures/** - Homepage specific feature components
- **Competition/** - Competition related components
- **Reports/** - Report display components
- **Ecosystem/** - Ecosystem visualization components
- **AboutUs/** - About us section components

## Guidelines

1. Each component should be in its own directory
2. Use `index.tsx` for the main component implementation
3. Include TypeScript types in `src/types/` directory
4. Use constants from `src/constants/` directory
5. Follow the existing naming conventions 