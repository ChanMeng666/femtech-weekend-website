# Source Code Structure

## Overview
This directory contains the source code for the FemTech Weekend website, organized with clear separation of concerns and improved maintainability.

## Directory Structure

### `/components`
Contains all React components organized by functionality:

- **Layout Components**
  - `PageContainer.tsx` - Reusable page wrapper with SEO support
  - `HomepageContent.tsx` - Organizes homepage content sections

- **Content Sections**
  - `Hero.tsx` - Homepage hero section
  - `CompetitionSection.tsx` - Competition information section  
  - `Features.tsx` - Features showcase section
  - `TestimonialsSection.tsx` - Testimonials display section

- **UI Components**
  - `Testimonial.tsx` - Individual testimonial and grid components

- **Index File**
  - `index.ts` - Centralized component exports for clean imports

### `/data`
Contains configuration and data files:

- `homepage.ts` - Homepage-specific configuration
- `testimonials.ts` - Testimonial data and types
- `index.ts` - Centralized data exports

### `/pages`
Contains page-level components:

- `index.tsx` - Homepage component (simplified and refactored)

## Benefits of This Structure

### 1. **Separation of Concerns**
- Data is separated from components
- Configuration is centralized
- Each component has a single responsibility

### 2. **Maintainability**
- Easy to find and modify specific functionality
- Clear component hierarchy
- Consistent naming conventions

### 3. **Reusability**
- Components can be easily reused across pages
- Props allow customization without code duplication
- Generic containers can wrap different content

### 4. **Scalability**
- Easy to add new sections or pages
- Data can be easily extended or moved to CMS
- Components are self-contained

### 5. **Testing**
- Components can be tested in isolation
- Data can be mocked easily
- Clear interfaces make testing straightforward

## Usage Examples

### Adding a New Section
1. Create component in `/components`
2. Add to `HomepageContent.tsx`
3. Export from `/components/index.ts`

### Modifying Content
1. Update data in `/data` files
2. Components automatically reflect changes
3. No need to touch component code

### Creating New Pages
1. Use `PageContainer` for consistent layout
2. Create page-specific content components
3. Import from centralized exports 