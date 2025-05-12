import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Femtech Weekend',
  tagline: 'Rooted in China, Connecting globally',
  favicon: 'img/logo/femtech-weekend-sub-logo-brown.ico',

  // Set the production url of your site here
  url: 'https://femtech-weekend-website.vercel.app/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'femtechweekend', // Usually your GitHub org/user name.
  projectName: 'femtech-weekend-website', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
  },

  markdown: {
    mermaid: true,
    mdx1Compat: {
      comments: false,
      admonitions: false,
      headingIds: false,
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/femtechweekend/femtech-weekend-website/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/femtechweekend/femtech-weekend-website/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          blogTitle: 'FemTech Weekend Competition',
          blogDescription: 'FemTech Weekend Competition Platform',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'All competitions',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/femtech-weekend-social-card.png',
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      hideOnScroll: true,
      title: 'Femtech Weekend',
      logo: {
        alt: 'Femtech Weekend Logo',
        src: 'img/logo/femtech-weekend-sub-logo-brown.svg',
        srcDark: 'img/logo/femtech-weekend-sub-logo-beige.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Reports',
        },
        {to: '/blog', label: 'Competition', position: 'left'},
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    
    algolia: {
      // The application ID provided by Algolia
      appId: 'VNBIILHFAK',

      // Public API key: it is safe to commit it
      apiKey: 'a66efbe06c7b3a50d3c677308e22ca7f',

      indexName: 'femtech-weekend-website-crawler',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Comment out or adjust this section to fix URL mapping issues
      /*
      replaceSearchResultPathname: {
        from: '/docs/', // or as RegExp: /\/docs\//
        to: '/',
      },
      */

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,

      //... other Algolia params
    },

    footer: {
      style: 'light',
      logo: {
        alt: 'Femtech Weekend Logo',
        src: 'img/logo/femtech-weekend-logo-cn.svg',
        href: '/',
        width: 300,
      },
      links: [
        {
          title: 'Site Map',
          items: [
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'Reports',
              to: '/docs/intro',
            },
            {
              label: 'Competition',
              to: '/blog',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/company/femtech-weekend',
            },
            {
              label: 'WeChat',
              href: '#',
            },
            {
              label: 'Xiaohongshu',
              href: '#',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/femtechweekend/femtech-weekend-website',
            },
          ],
        },
        {
          title: 'Follow Us',
          className: 'footer__follow-us-col',
          items: [
            {
              html: `
                <div class="footer__qrcode-container">
                  <div class="footer__qrcode-item">
                    <img src="/img/qrcode/femtech-weekend-xiaohongshu-qrcode.png" alt="Xiaohongshu QR Code" />
                    <span>Xiaohongshu</span>
                  </div>
                  <div class="footer__qrcode-item">
                    <img src="/img/qrcode/femtech-weekend-linkedin-qrcode.png" alt="LinkedIn QR Code" />
                    <span>LinkedIn</span>
                  </div>
                  <div class="footer__qrcode-item">
                    <img src="/img/qrcode/femtech-weekend-gongzhonghao-qrcode.jpg" alt="WeChat Official Account QR Code" />
                    <span>WeChat</span>
                  </div>
                </div>
              `,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FemTech Weekend.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
