# Docusaurus Navbar & Fullscreen Hero Styling Guide

> A battle-tested guide to implementing frosted glass navbars, fullscreen video heroes, and avoiding critical CSS pitfalls in Docusaurus 3.x projects.

## Table of Contents

- [Overview](#overview)
- [Part 1: Fullscreen Video Hero Behind Navbar](#part-1-fullscreen-video-hero-behind-navbar)
  - [The Goal](#the-goal)
  - [Understanding the Docusaurus Layout Stack](#understanding-the-docusaurus-layout-stack)
  - [Pitfall: Negative Margin on the Hero Element](#pitfall-negative-margin-on-the-hero-element)
  - [Pitfall: Relative Top Offset](#pitfall-relative-top-offset)
  - [The Root Cause: overflow-x hidden](#the-root-cause-overflow-x-hidden)
  - [The Solution: Negative Margin on the Main Element](#the-solution-negative-margin-on-the-main-element)
- [Part 2: Frosted Glass Navbar](#part-2-frosted-glass-navbar)
  - [Pitfall: backdrop-filter Directly on .navbar](#pitfall-backdrop-filter-directly-on-navbar)
  - [Pitfall: position relative Breaks hideOnScroll](#pitfall-position-relative-breaks-hideonscroll)
  - [Pitfall: Infima Background Variable Override](#pitfall-infima-background-variable-override)
  - [The Solution: Pseudo-Element + Variable Override](#the-solution-pseudo-element--variable-override)
- [Part 3: Mobile Sidebar Transparency](#part-3-mobile-sidebar-transparency)
  - [The Problem: Inherited Transparent Background](#the-problem-inherited-transparent-background)
  - [The Solution: Explicit Opaque Sidebar Styles](#the-solution-explicit-opaque-sidebar-styles)
- [Debugging Techniques](#debugging-techniques)
- [Complete Working Code](#complete-working-code)
- [Quick Reference: What NOT to Do](#quick-reference-what-not-to-do)

---

## Overview

This guide documents real pitfalls encountered while implementing two common features in a Docusaurus 3.x project:

1. A **fullscreen video hero** that fills the entire viewport on first load, extending behind the navbar
2. A **frosted glass (backdrop-blur) navbar** that lets the hero content show through

Each section describes the goal, the pitfalls attempted, why they failed, and the final working solution.

### Environment

- Docusaurus 3.7+ with React 18
- TailwindCSS with Docusaurus (preflight disabled)
- `hideOnScroll: true` in navbar config
- Custom CSS variables for theming (light/dark mode)

---

## Part 1: Fullscreen Video Hero Behind Navbar

### The Goal

Transform a standard hero section into a fullscreen video background that fills 100% of the viewport height (`100vh`), extending behind a transparent/frosted navbar so users see an immersive, edge-to-edge video on first load.

### Understanding the Docusaurus Layout Stack

Docusaurus renders the following DOM structure:

```html
<div id="__docusaurus">
  <nav class="navbar navbar--fixed-top">...</nav>     <!-- height: 3.75rem (60px) -->
  <div class="main-wrapper mainWrapper_xxxx">
    <main>                                              <!-- your page content -->
      <section class="hero">...</section>
    </main>
  </div>
  <footer>...</footer>
</div>
```

With `hideOnScroll: true`, the navbar uses `position: sticky; top: 0` and occupies space in the normal document flow. This means `<main>` starts **below** the navbar (at ~60px), leaving a visible gap between the top of the viewport and the hero.

### Pitfall: Negative Margin on the Hero Element

**Attempt**: Pull the hero up behind the navbar using negative `margin-top`.

```jsx
// Hero.tsx
<section
  className="relative w-full h-screen overflow-hidden"
  style={{ marginTop: 'calc(-1 * var(--ifm-navbar-height))' }}
>
```

**Why it fails**: CSS margin collapsing. When a child element's margin-top is negative and the parent (`<main>`) has no `padding-top`, `border-top`, or `overflow` other than `visible`, the margin collapses through the parent. However, in this project, `<main>` had `overflow-x: hidden` set globally (see next pitfall), which created a different problem entirely.

### Pitfall: Relative Top Offset

**Attempt**: Use `position: relative; top: -60px` to shift the hero visually, with negative `margin-bottom` to compensate.

```jsx
<section
  className="relative w-full h-screen overflow-hidden"
  style={{
    top: 'calc(-1 * var(--ifm-navbar-height))',
    marginBottom: 'calc(-1 * var(--ifm-navbar-height))',
  }}
>
```

**Why it fails**: The `<main>` element has `overflow: hidden auto` (see below), which **clips** any content extending above its top boundary. The hero shifts up visually to `top: 0`, but the top 60px is clipped by `<main>`'s overflow.

### The Root Cause: overflow-x hidden

This project's `custom.css` contained:

```css
/* custom.css line ~518 */
main {
  overflow-x: hidden;
}
```

This rule was added to prevent horizontal scrolling on content pages. However, per the CSS specification:

> If one `overflow` axis is set to a non-`visible` value, the other axis is automatically computed as `auto` (not `visible`).

So `overflow-x: hidden` causes the browser to compute `overflow-y: auto`, turning `<main>` into a **scroll container**. A scroll container clips content that extends beyond its boundaries, which is why any technique that moves the hero above `<main>`'s top edge fails.

**Debug output that revealed this**:

```
Ancestor 1: <main> class=""
  { overflow: "hidden auto", paddingTop: "0px", rect: { top: 60 } }
```

### The Solution: Negative Margin on the Main Element

Instead of trying to move the hero outside of `<main>`, move `<main>` itself up so the hero stays fully inside it:

```jsx
// src/pages/index.tsx
<Layout title={title} description={description}>
  <main style={{ marginTop: 'calc(-1 * var(--ifm-navbar-height))' }}>
    <HomepageContent />
  </main>
</Layout>
```

**Why this works**:

1. `<main>` shifts up by 60px (the navbar height), starting at `top: 0` instead of `top: 60`
2. The hero (`h-screen` = `100vh`) sits inside `<main>` starting from its top edge
3. No content extends above `<main>`'s boundary, so `overflow: hidden auto` clips nothing
4. The sticky navbar floats above with its frosted glass effect
5. Subsequent sections follow naturally; scrolling works normally

**Key insight**: Always check `overflow` on ancestor elements when content positioning doesn't work as expected. `overflow-x: hidden` on a parent has invisible side effects on vertical layout.

---

## Part 2: Frosted Glass Navbar

### Pitfall: backdrop-filter Directly on .navbar

**Attempt**: Apply `backdrop-filter: blur()` directly to the navbar.

```css
/* DON'T DO THIS */
.navbar {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

**Why it fails**: `backdrop-filter` creates a **new stacking context** on the element. When applied to `.navbar`, it interferes with how the mobile sidebar (`.navbar-sidebar`) is positioned and rendered. The sidebar may become invisible, partially clipped, or render behind other content.

Properties that create new stacking contexts:

| Property | Risk to Navbar | Notes |
|---|---|---|
| `backdrop-filter` | **High** | Breaks mobile sidebar rendering |
| `transform` | Medium | Affects fixed/sticky positioning |
| `filter` | Medium | Similar to backdrop-filter |
| `opacity < 1` | Low | Usually safe |
| `isolation: isolate` | Medium | Intentional stacking context |

### Pitfall: position relative Breaks hideOnScroll

**Attempt**: Add `position: relative` to `.navbar` to establish a positioning context for the `::before` pseudo-element.

```css
/* DON'T DO THIS */
.navbar {
  position: relative;  /* overrides Docusaurus */
}
```

**Why it fails**: Docusaurus sets `position: sticky; top: 0` on `.navbar--fixed-top` (when `hideOnScroll: true`). Adding `position: relative` overrides `position: sticky`, completely breaking the show-on-scroll-up / hide-on-scroll-down behavior. The navbar becomes a static element.

### Pitfall: Infima Background Variable Override

**Attempt**: Set `background: transparent` on `.navbar`.

```css
.navbar {
  background: transparent;
}
```

**Why it fails**: Docusaurus's Infima CSS framework applies the background through the CSS variable `--ifm-navbar-background-color`, which gets applied as `background-color`. Your `background: transparent` may be overridden by specificity. You need to override **both** the variable and the property.

### The Solution: Pseudo-Element + Variable Override

```css
/* Transparent navbar with frosted glass via ::before */
.navbar {
  --ifm-navbar-background-color: transparent;
  background-color: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: none;
  /* DO NOT add: position, backdrop-filter, or transform */
}

/* Frosted glass effect on pseudo-element (z-index: -1 = behind navbar content) */
.navbar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: -1;
}

/* Dark mode */
[data-theme='dark'] .navbar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme='dark'] .navbar::before {
  background: rgba(0, 0, 0, 0.4);
}
```

**Why this works**:

1. The navbar itself stays `position: sticky` (Docusaurus default) — `hideOnScroll` works
2. `--ifm-navbar-background-color: transparent` + `!important` overrides Infima's default solid background
3. `::before` pseudo-element handles the frosted glass — it's a child of `.navbar` in the rendering tree, positioned behind navbar content via `z-index: -1`
4. The stacking context from `backdrop-filter` is on `::before`, not on `.navbar` itself, so the mobile sidebar is unaffected
5. No `position: relative` needed — `.navbar` already has a stacking context from `position: sticky` + `z-index`, so `z-index: -1` on `::before` works correctly within that context

---

## Part 3: Mobile Sidebar Transparency

### The Problem: Inherited Transparent Background

After making the navbar transparent for the frosted glass effect, the mobile sidebar (`.navbar-sidebar`) inherits or references the same `--ifm-navbar-background-color: transparent`, resulting in:

- Sidebar background is transparent or black
- Menu link text is invisible against the dark/transparent background
- Users cannot navigate on mobile devices

### The Solution: Explicit Opaque Sidebar Styles

Override the sidebar components with solid, opaque backgrounds using your theme's CSS variables:

```css
/* Mobile sidebar: opaque background, not frosted glass */
.navbar-sidebar {
  --ifm-navbar-background-color: hsl(var(--background));
  background-color: hsl(var(--background)) !important;
}

.navbar-sidebar__brand {
  background-color: hsl(var(--background)) !important;
  border-bottom: 1px solid hsl(var(--border));
}

.navbar-sidebar__items {
  background-color: hsl(var(--background)) !important;
}

.navbar-sidebar .menu__link,
.navbar-sidebar .navbar__link {
  color: hsl(var(--foreground));
}

/* Dark mode sidebar */
[data-theme='dark'] .navbar-sidebar,
[data-theme='dark'] .navbar-sidebar__brand,
[data-theme='dark'] .navbar-sidebar__items {
  background-color: hsl(var(--background)) !important;
}

[data-theme='dark'] .navbar-sidebar__brand {
  border-bottom-color: hsl(var(--border));
}

[data-theme='dark'] .navbar-sidebar .menu__link,
[data-theme='dark'] .navbar-sidebar .navbar__link {
  color: hsl(var(--foreground));
}
```

**Key rule**: When customizing `.navbar` transparency, **always** provide explicit opaque styles for `.navbar-sidebar`, `.navbar-sidebar__brand`, and `.navbar-sidebar__items`. These are separate components that should not inherit the desktop navbar's transparency.

---

## Debugging Techniques

When navbar or hero positioning issues occur, inject a debug `useEffect` to log computed styles and ancestor layout info:

```tsx
useEffect(() => {
  const el = heroRef.current;
  if (!el) return;

  const cs = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  console.log('=== HERO DEBUG ===');
  console.log('--ifm-navbar-height:', getComputedStyle(document.documentElement)
    .getPropertyValue('--ifm-navbar-height'));
  console.log('Hero rect:', { top: rect.top, height: rect.height });
  console.log('Hero computed:', {
    position: cs.position, top: cs.top,
    marginTop: cs.marginTop, marginBottom: cs.marginBottom,
    overflow: cs.overflow,
  });

  // Walk up ancestors to find the element causing the gap
  let ancestor = el.parentElement;
  let depth = 1;
  while (ancestor && depth <= 8) {
    const acs = getComputedStyle(ancestor);
    const arect = ancestor.getBoundingClientRect();
    console.log(`Ancestor ${depth}: <${ancestor.tagName.toLowerCase()}> class="${ancestor.className}"`, {
      rect: { top: arect.top, height: arect.height },
      paddingTop: acs.paddingTop,
      marginTop: acs.marginTop,
      overflow: acs.overflow,
      position: acs.position,
    });
    ancestor = ancestor.parentElement;
    depth++;
  }
  console.log('=== END DEBUG ===');
}, []);
```

**What to look for**:

| Symptom | Check |
|---|---|
| Gap between navbar and hero | Ancestor `overflow` values — `hidden auto` clips content above boundary |
| Hero not moving despite negative margin | Margin collapse with parent — check parent's `padding-top`, `border-top`, `overflow` |
| Navbar not hiding on scroll | Computed `position` — should be `sticky`, not `relative` or `static` |
| Frosted glass not visible | `background-color` — Infima may override with `--ifm-navbar-background-color` |

---

## Complete Working Code

### custom.css — Navbar Styles

```css
/* ============================================
   Frosted Glass Navbar
   ============================================ */

.navbar {
  --ifm-navbar-background-color: transparent;
  background-color: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: none;
}

.navbar::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: -1;
}

[data-theme='dark'] .navbar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme='dark'] .navbar::before {
  background: rgba(0, 0, 0, 0.4);
}

/* ============================================
   Mobile Sidebar (opaque, NOT frosted glass)
   ============================================ */

.navbar-sidebar {
  --ifm-navbar-background-color: hsl(var(--background));
  background-color: hsl(var(--background)) !important;
}

.navbar-sidebar__brand {
  background-color: hsl(var(--background)) !important;
  border-bottom: 1px solid hsl(var(--border));
}

.navbar-sidebar__items {
  background-color: hsl(var(--background)) !important;
}

.navbar-sidebar .menu__link,
.navbar-sidebar .navbar__link {
  color: hsl(var(--foreground));
}

[data-theme='dark'] .navbar-sidebar,
[data-theme='dark'] .navbar-sidebar__brand,
[data-theme='dark'] .navbar-sidebar__items {
  background-color: hsl(var(--background)) !important;
}

[data-theme='dark'] .navbar-sidebar__brand {
  border-bottom-color: hsl(var(--border));
}

[data-theme='dark'] .navbar-sidebar .menu__link,
[data-theme='dark'] .navbar-sidebar .navbar__link {
  color: hsl(var(--foreground));
}
```

### Hero.tsx — Fullscreen Video Background

```tsx
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { WordRotate } from './ui/word-rotate';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video fills entire section */}
      <video
        src="/img/bg/homepage-hero.mp4"
        autoPlay loop muted playsInline preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Semi-transparent overlay for text contrast */}
      <div className="absolute inset-0 bg-black/50" />
      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <WordRotate words={['Word 1', 'Word 2', 'Word 3']} duration={3000}
          className="text-5xl lg:text-8xl font-bold uppercase tracking-wider text-white" />
        <p className="text-white/90 uppercase tracking-[0.2em] mt-4 mb-10">
          Your subtitle here
        </p>
        <a href="/your-link" className="px-6 py-3 bg-white text-black font-medium no-underline">
          Call to Action <ArrowRight className="inline h-4 w-4 ml-2" />
        </a>
      </div>
    </section>
  );
}
```

### index.tsx — Negative Margin on Main

```tsx
export default function Home() {
  return (
    <Layout title="..." description="...">
      {/* Pull <main> up behind the navbar so hero fills the full viewport */}
      <main style={{ marginTop: 'calc(-1 * var(--ifm-navbar-height))' }}>
        <HomepageContent />
      </main>
    </Layout>
  );
}
```

---

## Quick Reference: What NOT to Do

| What | Why Not | Do This Instead |
|---|---|---|
| `backdrop-filter` on `.navbar` | Creates stacking context, breaks mobile sidebar | Use `.navbar::before` pseudo-element |
| `position: relative` on `.navbar` | Overrides `position: sticky`, breaks `hideOnScroll` | Don't set position; let Docusaurus manage it |
| `background: transparent` on `.navbar` | Infima's `--ifm-navbar-background-color` overrides it | Also set `--ifm-navbar-background-color: transparent` + `!important` |
| Negative `margin-top` on hero element | Margin collapse with parent, or clipped by parent's `overflow` | Put negative `margin-top` on `<main>` in page component |
| `position: relative; top: -60px` on hero | Clipped by `<main>`'s `overflow: hidden auto` | Move `<main>` up instead of moving hero out of `<main>` |
| Transparent `.navbar` without sidebar fix | `.navbar-sidebar` inherits transparency, text becomes invisible | Always add opaque styles for `.navbar-sidebar` separately |
| Assuming `overflow-x: hidden` is safe | Browsers compute `overflow-y: auto`, creating a scroll container that clips content | Be aware of this spec behavior; check with debug logging |

---

## Key Takeaways

1. **Docusaurus CSS is layered**: Infima framework defaults, theme overrides, and your custom CSS all interact. Always check CSS variable resolution, not just property values.

2. **Test mobile after every navbar CSS change**: The mobile sidebar uses different rendering than the desktop navbar. What looks fine on desktop can be completely broken on mobile.

3. **`overflow-x: hidden` has hidden side effects**: Per CSS spec, setting one overflow axis to non-visible forces the other to `auto`, creating a scroll container. This silently clips content that extends beyond boundaries.

4. **Always provide both light and dark mode styles**: When overriding Docusaurus theme colors, always define styles for both `[data-theme='dark']` and the default (light) mode.

5. **Debug with ancestor traversal**: When positioning doesn't work, log `getBoundingClientRect()` and `getComputedStyle()` for the element and all its ancestors. The culprit is usually an ancestor's `overflow`, `position`, or `padding`.

---

*Document created: February 2026*
*Based on real debugging experience from the FemTech Weekend Platform project*
