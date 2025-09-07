# Complete Guide to Implementing Bilingual Footer in Docusaurus

## Overview

This tutorial demonstrates how to implement a bilingual footer with developer attribution in a Docusaurus project, supporting both English and Simplified Chinese. We'll cover the challenges encountered, failed approaches, and the final working solution.

## Project Context

We wanted to add subtle developer branding to a Docusaurus website footer that would:
- Display developer information (logo, name, contact)
- Support English/Chinese language switching
- Remain unobtrusive and professional
- Include clickable GitHub profile link

## Initial Requirements

- Display developer logo (`static/img/logo/chan_logo.svg`)
- Show developer name with GitHub link
- Include email contact with mailto link
- Support bilingual text switching
- Integrate with existing copyright section

## Implementation Journey

### Attempt 1: Dedicated Footer Column (❌ Failed - Too Prominent)

**Approach**: Added developer information as a separate footer column via `docusaurus.config.ts`

```typescript
// docusaurus.config.ts
footer: {
  links: [
    // ... existing sections
    {
      title: 'Developer',
      items: [
        {
          html: `
            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
              <img src="/img/logo/chan_logo.svg" alt="Chan Meng Logo" style="width: 24px; height: 24px;" />
              <span style="font-weight: 600;">Chan Meng</span>
            </div>
          `,
        },
        { label: 'Email Consultation', href: 'mailto:chanmeng.dev@gmail.com' },
        { label: 'Portfolio', href: 'https://github.com/ChanMeng666' },
      ],
    },
  ],
}
```

**Problem**: User feedback indicated this was too prominent and intrusive.

### Attempt 2: Custom Footer Component with Dedicated Section (❌ Failed - Still Too Prominent)

**Approach**: Override `src/theme/Footer/index.js` to add custom developer section

```javascript
// src/theme/Footer/index.js
import React from 'react';
// ... imports

function DeveloperSection() {
  return (
    <div className="col footer__col">
      <div className="footer__developer-card">
        {/* Custom developer content */}
      </div>
    </div>
  );
}

function Footer() {
  const {footer} = useThemeConfig();
  const filteredLinks = links?.filter(section => section.title !== 'Developer') || [];
  
  return (
    <FooterLayout
      links={
        <div className="footer__links">
          {filteredLinks.length > 0 && <FooterLinks links={filteredLinks} />}
          <DeveloperSection />
        </div>
      }
      // ... other props
    />
  );
}
```

**Problem**: Still created a separate column, making developer promotion too visible.

### Attempt 3: Integration into Copyright Section (✅ Partial Success)

**Approach**: Override `src/theme/Footer/Copyright/index.js` to embed developer info

```javascript
// src/theme/Footer/Copyright/index.js
import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import {Translate} from '@docusaurus/Translate';

export default function FooterCopyright() {
  const {footer} = useThemeConfig();
  const {copyright} = footer || {};
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer__copyright">
      <div className="footer__copyright-main">
        <Translate id="copyright" values={{year: currentYear}}>
          {copyright}
        </Translate>
      </div>
      
      <div className="footer__developer-attribution">
        <span className="footer__developer-text">
          Website crafted with ❤️ by
          <img src="/img/logo/chan_logo.svg" alt="Chan Meng" className="footer__developer-mini-logo"/>
          <a href="https://github.com/ChanMeng666" className="footer__developer-name-mini">
            Chan Meng
          </a>
        </span>
        <span className="footer__developer-contact">
          Need a website? 
          <a href="mailto:chanmeng.dev@gmail.com" className="footer__developer-email">
            Get in touch
          </a>
        </span>
      </div>
    </div>
  );
}
```

**Problem**: Text remained in English when switching to Chinese language.

## The Internationalization Challenge

### Attempt 4: Using Translate Components (❌ Failed - Translation Keys Not Recognized)

**Approach**: Attempted to use Docusaurus's `Translate` component for i18n

```javascript
// Attempted implementation with self-closing Translate tags
<Translate id="footer.developer.attribution.text" description="Developer attribution text" />

// Also tried with default text children
<Translate id="footer.developer.attribution.text" description="Developer attribution text">
  Website crafted with
</Translate>
```

**Translation Files Setup**:

```json
// i18n/zh-Hans/docusaurus-theme-classic/footer.json
{
  "footer.developer.attribution.text": {
    "message": "网站用心制作",
    "description": "Developer attribution text"
  },
  "footer.developer.attribution.by": {
    "message": "由",
    "description": "Developer attribution by"
  },
  "footer.developer.attribution.contact": {
    "message": "需要网站？",
    "description": "Contact for development"
  },
  "footer.developer.attribution.email": {
    "message": "联系我",
    "description": "Email contact"
  }
}
```

```json
// i18n/en/docusaurus-theme-classic/footer.json
{
  "footer.developer.attribution.text": {
    "message": "Website crafted with",
    "description": "Developer attribution text"
  },
  "footer.developer.attribution.by": {
    "message": "by",
    "description": "Developer attribution by"
  },
  "footer.developer.attribution.contact": {
    "message": "Need a website?",
    "description": "Contact for development"
  },
  "footer.developer.attribution.email": {
    "message": "Get in touch",
    "description": "Email contact"
  }
}
```

**Problems Encountered**:

1. **Translation Extraction Issues**: Docusaurus warned that translation keys were "unknown"
2. **Self-closing Tags**: `<Translate id="..." />` tags weren't recognized by the extraction system
3. **Custom Theme Limitations**: Translation extraction system had issues with custom theme overrides
4. **Cache Issues**: Even after proper setup, translations didn't work consistently

**Commands Used for Debugging**:
```bash
npm run write-translations  # Regenerate translation files
npm run clear              # Clear Docusaurus cache
npm run build             # Build to test translations
```

## Final Solution: Direct Locale Detection (✅ Success)

### Approach: Using useDocusaurusContext

Instead of relying on the `Translate` component system, we used direct locale detection:

```javascript
// src/theme/Footer/Copyright/index.js
import React from 'react';
import Translate from '@docusaurus/Translate';
import {useThemeConfig} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function FooterCopyright() {
  const {footer} = useThemeConfig();
  const {copyright} = footer || {};
  const {i18n} = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  if (!copyright) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <div className="footer__copyright">
      <div className="footer__copyright-main">
        <Translate
          id="copyright"
          description="The footer copyright"
          values={{year: currentYear}}>
          {copyright}
        </Translate>
      </div>
      
      {/* Low-key developer attribution */}
      <div className="footer__developer-attribution">
        <span className="footer__developer-text">
          {currentLocale === 'zh-Hans' ? '网站用心制作' : 'Website crafted with'}
          {' '}❤️{' '}
          {currentLocale === 'zh-Hans' ? '由' : 'by'}
          {' '}
          <img 
            src="/img/logo/chan_logo.svg" 
            alt="Chan Meng" 
            className="footer__developer-mini-logo"
          />
          <a 
            href="https://github.com/ChanMeng666" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer__developer-name-mini"
          >
            Chan Meng
          </a>
        </span>
        <span className="footer__developer-contact">
          {currentLocale === 'zh-Hans' ? '需要网站？' : 'Need a website?'}
          {' '}
          <a 
            href="mailto:chanmeng.dev@gmail.com"
            className="footer__developer-email"
          >
            {currentLocale === 'zh-Hans' ? '联系我' : 'Get in touch'}
          </a>
        </span>
      </div>
    </div>
  );
}
```

### CSS Styling

```css
/* src/css/components/footer.css */

/* Low-key developer attribution styles */
.footer__developer-attribution {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: rgba(132, 98, 77, 0.7);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  opacity: 0.8;
}

.footer__developer-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.footer__developer-mini-logo {
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
}

.footer__developer-name-mini {
  font-weight: 500;
  color: #84624D;
  text-decoration: none;
  transition: all 0.2s ease;
  border-radius: 2px;
  padding: 1px 2px;
}

.footer__developer-name-mini:hover {
  color: #5A3E2B;
  background-color: rgba(132, 98, 77, 0.1);
  text-decoration: none;
}

.footer__developer-contact {
  font-size: 0.7rem;
  opacity: 0.9;
}

.footer__developer-email {
  color: #84624D;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 2px;
  padding: 1px 2px;
}

.footer__developer-email:hover {
  color: #5A3E2B;
  background-color: rgba(132, 98, 77, 0.1);
  text-decoration: none;
}

/* Responsive design */
@media (max-width: 768px) {
  .footer__developer-attribution {
    font-size: 0.7rem;
  }
  
  .footer__developer-contact {
    font-size: 0.65rem;
  }
}
```

## Key Learning Points

### Why the Translate Component Failed

1. **Translation Extraction Limitations**: Docusaurus's translation extraction system struggles with custom theme overrides
2. **Static Analysis Issues**: The system couldn't properly analyze `Translate` components in overridden theme files
3. **Cache Problems**: Translation updates weren't consistently applied even after cache clearing

### Why Direct Locale Detection Worked

1. **Simplicity**: Bypasses the translation system entirely
2. **Reliability**: Direct access to locale information via `useDocusaurusContext`
3. **Control**: Full control over conditional rendering logic
4. **No Dependencies**: Doesn't rely on translation file extraction

### Best Practices Learned

1. **Start Simple**: For custom theme overrides, direct locale detection is often more reliable than the translation system
2. **Gradual Enhancement**: Begin with basic functionality, then add internationalization
3. **Test Early**: Test language switching frequently during development
4. **Cache Management**: Always clear cache when debugging i18n issues

## Complete File Structure

```
src/
├── theme/
│   └── Footer/
│       └── Copyright/
│           └── index.js          # Main implementation
├── css/
│   └── components/
│       └── footer.css            # Styling
└── ...

docusaurus.config.ts              # Basic footer configuration
```

## Testing the Implementation

1. **Development Server**:
   ```bash
   npm run start
   ```

2. **Production Build**:
   ```bash
   npm run build
   npm run serve
   ```

3. **Translation Testing**:
   - Navigate to `http://localhost:3000`
   - Click the language switcher (🌐)
   - Verify footer text changes appropriately

## Expected Results

| Language | Footer Attribution                                           |
| -------- | ------------------------------------------------------------ |
| English  | `Website crafted with ❤️ by Chan Meng` <br/> `Need a website? Get in touch` |
| Chinese  | `网站用心制作 ❤️ 由 Chan Meng` <br/> `需要网站？联系我`       |

## Conclusion

While Docusaurus provides a robust translation system, custom theme overrides sometimes require alternative approaches. The direct locale detection method proved more reliable for our use case, providing:

- ✅ Consistent behavior across builds
- ✅ No dependency on translation extraction
- ✅ Full control over conditional logic
- ✅ Easy debugging and maintenance

This approach can be applied to other internationalization challenges in Docusaurus custom themes where the standard translation system encounters limitations.