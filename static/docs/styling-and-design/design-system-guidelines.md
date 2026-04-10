# FemTech Weekend Design System Guidelines

## Overview

This document defines the design system and visual guidelines for the FemTech Weekend Platform. The design is inspired by McKinsey's professional, business-oriented aesthetic while maintaining our warm brand identity with the signature brown color (#AA7C52).

**Last Updated:** January 2026
**Design Philosophy:** Professional, Business-Oriented, Warm, Accessible

---

## Table of Contents

1. [Brand Colors](#brand-colors)
2. [Typography](#typography)
3. [Layout Principles](#layout-principles)
4. [Component Patterns](#component-patterns)
5. [Animation Guidelines](#animation-guidelines)
6. [UI Components](#ui-components)
7. [Page Templates](#page-templates)
8. [Dark Mode](#dark-mode)
9. [Responsive Design](#responsive-design)
10. [Implementation Reference](#implementation-reference)

---

## Brand Colors

### Primary Color Palette

| Color Name | Hex Code | HSL | Usage |
|------------|----------|-----|-------|
| Primary | `#AA7C52` | `33 42% 49%` | Main brand color, CTAs, accents |
| Primary Dark | `#996F49` | `33 42% 40%` | Hover states, emphasis |
| Primary Light | `#B58960` | `33 42% 55%` | Subtle backgrounds |
| Primary Lightest | `#CDA379` | `33 42% 65%` | Decorative elements |

### Semantic Colors

```css
:root {
  --background: 0 0% 100%;           /* White background */
  --foreground: 240 10% 3.9%;        /* Near-black text */
  --card: 0 0% 100%;                 /* Card background */
  --muted: 240 4.8% 95.9%;           /* Muted backgrounds */
  --muted-foreground: 240 3.8% 46.1%; /* Secondary text */
  --border: 240 5.9% 90%;            /* Borders */
  --primary: 33 42% 49%;             /* Brand primary */
}
```

### Color Usage Rules

1. **Primary Color** - Use for:
   - Call-to-action buttons
   - Active navigation states
   - Important links
   - Section labels
   - Corner accent decorations

2. **Foreground/Background** - Use for:
   - Main content text
   - Section backgrounds (inverted for CTAs)
   - High contrast elements

3. **Muted Colors** - Use for:
   - Secondary text
   - Descriptions
   - Metadata (dates, read times)
   - Inactive states

---

## Typography

### Font Families

```javascript
fontFamily: {
  'display': ['Georgia', 'Times New Roman', 'serif'],
  'body': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  'mono': ['SF Mono', 'Monaco', 'Courier New', 'monospace'],
}
```

### Typography Classes

#### 1. McKinsey Headline (`.mckinsey-headline`)
```css
.mckinsey-headline {
  font-family: Georgia, 'Times New Roman', serif;
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
```
**Usage:** Main page titles, hero headlines

#### 2. Display Text (`.font-display`)
```css
.font-display {
  font-family: Georgia, 'Times New Roman', serif;
}
```
**Usage:** Section titles, card titles, any prominent text

#### 3. McKinsey Label (`.mckinsey-label`)
```css
.mckinsey-label {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.75rem;
}
```
**Usage:** Section labels, category tags, navigation tabs, metadata

#### 4. Body Text (`.mckinsey-body`)
```css
.mckinsey-body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 400;
  line-height: 1.6;
}
```
**Usage:** Paragraphs, descriptions, general content

### Typography Scale

| Element | Desktop | Tablet | Mobile | Class |
|---------|---------|--------|--------|-------|
| Hero Title | 6xl (3.75rem) | 5xl (3rem) | 4xl (2.25rem) | `text-4xl sm:text-5xl lg:text-6xl` |
| Section Title | 5xl (3rem) | 4xl (2.25rem) | 3xl (1.875rem) | `text-3xl sm:text-4xl lg:text-5xl` |
| Card Title | 2xl (1.5rem) | xl (1.25rem) | xl (1.25rem) | `text-xl sm:text-2xl` |
| Body Large | xl (1.25rem) | lg (1.125rem) | lg (1.125rem) | `text-lg lg:text-xl` |
| Body | base (1rem) | base (1rem) | base (1rem) | `text-base` |
| Label | xs (0.75rem) | xs (0.75rem) | xs (0.75rem) | `mckinsey-label` |

---

## Layout Principles

### Spacing System

Use consistent spacing based on Tailwind's spacing scale:

| Size | Value | Usage |
|------|-------|-------|
| Section Padding | `py-20 lg:py-28` | Vertical section spacing |
| Container | `max-w-7xl px-6 lg:px-8` | Content width constraints |
| Card Padding | `p-6` or `p-8` | Internal card spacing |
| Element Gap | `gap-4`, `gap-6`, `gap-8` | Grid/flex gaps |
| Content Margin | `mb-4`, `mb-6`, `mb-8` | Between content blocks |

### Grid Systems

#### Feature Cards Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

#### Team/Advisor Grid
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
```

#### Two-Column Featured Layout
```html
<div class="grid grid-cols-1 lg:grid-cols-2 h-full">
```

### Corners and Borders

**Important:** All corners must be square (no rounded corners).

```javascript
borderRadius: {
  lg: '0',
  md: '0',
  sm: '0',
  none: '0',
  DEFAULT: '0',
}
```

---

## Component Patterns

### Section Header Pattern

Every major section should follow this header structure:

```tsx
<div className="mb-16">
  {/* Animated Label */}
  <div className="mb-6">
    <AnimatedLine variant="label" label="Section Name" />
  </div>

  {/* Serif Title */}
  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
    Section Title Here
  </h2>

  {/* Optional Description */}
  <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
    Section description text...
  </p>
</div>
```

### Card Pattern

Standard card structure with corner accents:

```tsx
<div
  className="group relative border border-border bg-card p-6 transition-all duration-500 hover:border-primary/30"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  {/* Corner accents - Top Left */}
  <div
    className="absolute top-4 left-4 w-6 h-px bg-primary transition-all duration-500"
    style={{ opacity: isHovered ? 1 : 0 }}
  />
  <div
    className="absolute top-4 left-4 w-px h-6 bg-primary transition-all duration-500"
    style={{ opacity: isHovered ? 1 : 0 }}
  />

  {/* Corner accents - Bottom Right */}
  <div
    className="absolute bottom-4 right-4 w-6 h-px bg-primary transition-all duration-500"
    style={{ opacity: isHovered ? 1 : 0 }}
  />
  <div
    className="absolute bottom-4 right-4 w-px h-6 bg-primary transition-all duration-500"
    style={{ opacity: isHovered ? 1 : 0 }}
  />

  {/* Card Content */}
  <div className="relative z-10">
    {/* Content here */}
  </div>
</div>
```

### Numbered Card Pattern

For features, values, and other enumerated content:

```tsx
<div className="...card-classes">
  {/* Index Number */}
  <span className="mckinsey-label text-primary/60 mb-4 block">01</span>

  {/* Title */}
  <h3 className="font-display text-xl text-foreground mb-3">
    Card Title
  </h3>

  {/* Description */}
  <p className="text-muted-foreground text-sm">
    Card description...
  </p>
</div>
```

### Image with Hover Frame Pattern

For team members, featured content, and image cards:

```tsx
<div className="relative overflow-hidden">
  <img
    src={imageSrc}
    alt={altText}
    className="h-full w-full object-cover transition-transform duration-700"
    style={{
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
    }}
  />
  {/* Frame overlay on hover */}
  <div
    className="absolute inset-3 border border-white/40 pointer-events-none transition-opacity duration-500"
    style={{ opacity: isHovered ? 1 : 0 }}
  />
</div>
```

### Dark Section Pattern (CTA Sections)

For call-to-action and emphasis sections:

```tsx
<div className="bg-foreground text-background py-20 lg:py-28">
  <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
    <AnimatedLine
      variant="label"
      label="Label"
      className="text-background/70 before:bg-background/50"
    />

    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal">
      Title
    </h2>

    <p className="mt-6 text-lg text-background/80">
      Description
    </p>

    <Button className="bg-background text-foreground hover:bg-background/90">
      Button Text
    </Button>
  </div>
</div>
```

---

## Animation Guidelines

### Timing Function

All animations use the professional cubic-bezier timing function:

```css
transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
```

This provides a smooth, professional feel with a slight ease-out effect.

### Standard Durations

| Animation Type | Duration | Usage |
|---------------|----------|-------|
| Micro-interactions | `300ms` | Button states, icon rotations |
| Element transitions | `500ms` | Border reveals, opacity changes |
| Page animations | `700ms` | Scroll-triggered content |
| Complex animations | `800ms+` | Hero elements, major transitions |

### Scroll-Triggered Animations

Use Intersection Observer for scroll-based animations:

```tsx
const [isVisible, setIsVisible] = useState(false);
const sectionRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
}, []);
```

Apply animations with staggered delays:

```tsx
<div
  style={{
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transitionProperty: 'opacity, transform',
    transitionDuration: '700ms',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: '100ms', // Increase for each element
  }}
>
```

### Hover Animations

#### Title Shift
```tsx
style={{
  transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
}}
```

#### Arrow Rotation
```tsx
<ArrowUpRight
  className="h-4 w-4 transition-transform duration-300"
  style={{
    transform: isHovered ? 'translate(2px, -2px)' : 'translate(0, 0)'
  }}
/>
```

#### Image Scale
```tsx
style={{
  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
}}
```

---

## UI Components

### AnimatedLine Component

Located at: `src/components/ui/AnimatedLine.tsx`

```tsx
import { AnimatedLine } from '../ui/AnimatedLine';

// Label variant (most common)
<AnimatedLine variant="label" label="Section Name" />

// Divider variant
<AnimatedLine variant="divider" />

// Default variant (simple line)
<AnimatedLine />

// With custom styling (for dark sections)
<AnimatedLine
  variant="label"
  label="Label"
  className="text-background/70 before:bg-background/50"
/>
```

### Button Component

Located at: `src/components/ui/button.tsx`

```tsx
import { Button } from '../ui/button';

// Primary button
<Button size="lg">Button Text</Button>

// Inverted button (for dark sections)
<Button
  size="lg"
  className="bg-background text-foreground hover:bg-background/90"
>
  Button Text
</Button>
```

### Card Components

Located at: `src/components/ui/card.tsx`

Note: For McKinsey-style cards, prefer custom implementations with corner accents rather than the base Card component.

---

## Page Templates

### Hero Section Template

```tsx
<div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background pt-24 pb-20 lg:pt-32 lg:pb-28">
  {/* Subtle gradient decoration */}
  <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
    <div
      className="relative left-[calc(50%-20rem)] aspect-[1155/678] w-[50rem] -translate-x-1/2 bg-gradient-to-tr from-primary/20 to-primary/5 opacity-30"
      style={{ clipPath: 'polygon(...)' }}
    />
  </div>

  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="max-w-3xl">
      <AnimatedLine variant="label" label="Page Label" />

      <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground">
        Page Title
      </h1>

      <p className="mt-6 text-lg lg:text-xl leading-8 text-muted-foreground max-w-2xl">
        Subtitle or description
      </p>
    </div>
  </div>
</div>
```

### Content Section Template

```tsx
<div className="bg-background py-20 lg:py-28">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    {/* Section Header */}
    <div className="mb-16">
      <AnimatedLine variant="label" label="Section Label" />
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground mt-6">
        Section Title
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Section description
      </p>
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Cards or content */}
    </div>
  </div>
</div>
```

### CTA Section Template

```tsx
<div className="bg-foreground text-background py-20 lg:py-28">
  <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
    <AnimatedLine
      variant="label"
      label="Join Us"
      className="text-background/70 before:bg-background/50"
    />

    <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight mt-6">
      Call to Action Title
    </h2>

    <p className="mt-6 text-lg text-background/80 max-w-2xl mx-auto">
      Call to action description
    </p>

    <div className="mt-10">
      <Button
        size="lg"
        className="bg-background text-foreground hover:bg-background/90"
      >
        Button Text
      </Button>
    </div>
  </div>
</div>
```

---

## Dark Mode

### Color Variables

```css
[data-theme='dark'] {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --primary: 33 42% 73%;
  --primary-foreground: 240 5.9% 10%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --border: 240 3.7% 15.9%;
}
```

### Dark Mode Considerations

1. **Primary color lightens** in dark mode for visibility
2. **Card backgrounds** match the page background
3. **Border colors** are subtle but visible
4. **Text contrast** is maintained for accessibility

---

## Responsive Design

### Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large screens |

### Common Responsive Patterns

```tsx
// Typography scaling
className="text-4xl sm:text-5xl lg:text-6xl"

// Grid columns
className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"

// Spacing scaling
className="py-20 lg:py-28"
className="px-6 lg:px-8"

// Gap scaling
className="gap-6 lg:gap-8"
```

### Mobile-First Approach

Always design for mobile first, then add responsive modifiers:

```tsx
// Good: Mobile-first
className="text-xl sm:text-2xl lg:text-3xl"

// Avoid: Desktop-first
className="lg:text-3xl md:text-2xl text-xl"
```

---

## Implementation Reference

### File Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── AnimatedLine.tsx    # Core animated line component
│   │   ├── button.tsx          # Button component
│   │   └── card.tsx            # Card components
│   ├── AboutUs/
│   │   ├── AboutHero.tsx
│   │   ├── MissionVision.tsx
│   │   ├── Values.tsx
│   │   ├── Team.tsx
│   │   ├── TeamMember.tsx
│   │   ├── AdvisorBoard.tsx
│   │   └── CallToAction.tsx
│   ├── Insights/
│   │   ├── InsightsHero.tsx
│   │   ├── InsightsNavigation.tsx
│   │   ├── FeaturedInsight.tsx
│   │   ├── InsightCard.tsx
│   │   └── InsightsCTA.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── StatsSection.tsx
│   └── PartnershipSection.tsx
├── css/
│   └── custom.css              # Global styles & McKinsey classes
└── pages/
    ├── index.tsx
    ├── about-us.tsx
    └── insights.tsx
```

### Key CSS Classes Quick Reference

| Class | Purpose |
|-------|---------|
| `.mckinsey-headline` | Large serif headlines |
| `.mckinsey-label` | Uppercase tracking labels |
| `.mckinsey-body` | Body text |
| `.font-display` | Serif font family |
| `.ease-professional` | Professional easing |
| `.hover-lift` | Card lift on hover |
| `.corner-accents` | Corner accent decorations |
| `.grayscale-hover` | Grayscale to color effect |

### Component Checklist

When creating new components, ensure:

- [ ] Square corners (no border-radius)
- [ ] Serif typography for titles (`font-display`)
- [ ] Uppercase labels (`mckinsey-label`)
- [ ] Corner accents on hover (where appropriate)
- [ ] Professional easing (`cubic-bezier(0.16, 1, 0.3, 1)`)
- [ ] Scroll-triggered animations (for sections)
- [ ] Responsive scaling
- [ ] Dark mode support
- [ ] i18n support with `translate()` functions

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | January 2026 | Initial design system documentation |

---

## Contact

For questions about this design system, please contact the development team.
