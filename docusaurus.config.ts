import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// 广告宣传位配置
// 当需要显示新的重要公告时，更新这个日期和事件名称
// 这样即使用户之前关闭了广告，新的重要事件公告仍会显示
const ANNOUNCEMENT_EVENT = 'competition-2024';
const ANNOUNCEMENT_DATE = '2024-12-01'; // 格式: YYYY-MM-DD

const config: Config = {
  title: 'Femtech Weekend',
  tagline: 'Rooted in China, Connecting globally',
  favicon: 'img/logo/femtech_weekend_logo_new.ico',

  // Set the production url of your site here
  url: 'https://femtech-weekend-website.vercel.app/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ChanMeng666', // Usually your GitHub org/user name.
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
  plugins: [
    ['./src/plugins/tailwind-config.js', {}],
    ['./src/plugins/api-routes.js', {}],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ChanMeng666/femtech-weekend-website/blob/main/',
          sidebarCollapsible: true,
          sidebarCollapsed: true,
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
            'https://github.com/ChanMeng666/femtech-weekend-website/blob/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          blogTitle: 'FemTech Weekend Competition',
          blogDescription: 'FemTech Weekend Competition Platform',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'All competitions',
          blogSidebarCount: 0,
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
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
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 6,
    },
    navbar: {
      hideOnScroll: true,
      title: 'Femtech Weekend',
      logo: {
        alt: 'Femtech Weekend Logo',
        src: 'img/logo/femtech_weekend_logo_new.svg',
        srcDark: 'img/logo/femtech_weekend_logo_new.svg',
      },
      items: [
        {
          to: '/about-us',
          label: 'About Us',
          position: 'left'
        },
        {to: '/competition', 
          label: 'Competition', 
          position: 'left'
        },
        {
          to: '/ecosystem',
          label: 'Ecosystem',
          position: 'left'
        },
        {
          type: 'dropdown',
          label: 'Insights',
          position: 'left',
          items: [
            {
              to: '/reports',
              label: 'Reports',
            },
            {
              to: '/database',
              label: 'Database',
            },
          ],
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    /* Temporarily commented out - uncomment when needed
    announcementBar: {
      id: `${ANNOUNCEMENT_EVENT}-${ANNOUNCEMENT_DATE}`,
      content: '🎉 <b><a target="_blank" href="/competition">FemTech Weekend 2024 Competition</a> is now open for registration!</b> 🚀',
      backgroundColor: '#fdf2f8',
      textColor: '#be185d',
      isCloseable: true,
    },
    */
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
            {
              label: 'Database',
              to: '/database',
            },
            {
              label: 'About Us',
              to: '/about-us',
            },
          ],
        },
        {
          title: 'Connect With Us',
          items: [
            {
              label: 'Email',
              href: 'mailto:hello@femtechweekend.com',
            },
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/company/femtech-weekend',
            },
            {
              label: 'Website',
              href: 'https://www.femtechweekend.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ChanMeng666/femtech-weekend-website',
            },
          ],
        },
        {
          title: 'Scan to Follow',
          items: [
            {
              html: `
                <div class="footer__qrcode-container">
                  <div class="footer__qrcode-item">
                    <img src="/img/qrcode/femtech-weekend-xiaohongshu-qrcode.png" alt="Xiaohongshu QR Code" />
                    <span>Xiaohongshu</span>
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
