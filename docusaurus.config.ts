import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// 广告宣传位配置
// 当需要显示新的重要公告时，更新这个日期和事件名称
// 这样即使用户之前关闭了广告，新的重要事件公告仍会显示
const ANNOUNCEMENT_EVENT = 'shanghai-summit-2026';
const ANNOUNCEMENT_DATE = '2026-03-01'; // 格式: YYYY-MM-DD

const config: Config = {
  title: 'Femtech Weekend',
  tagline: 'Rooted in China, Connecting globally',
  favicon: 'img/logo/femtech_weekend_logo_new.ico',

  // Set the production url of your site here
  url: 'https://www.femtechweekend.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ChanMeng666', // Usually your GitHub org/user name.
  projectName: 'femtech-weekend-website', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'ignore',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-Hans'],
  },

  // Custom fields for passing environment variables to the frontend
  customFields: {
    turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || '',
  },

  markdown: {
    mermaid: true,
    mdx1Compat: {
      comments: false,
      admonitions: false,
      headingIds: false,
    },
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [
    ['./src/plugins/tailwind-config.js', {}],
    ['./src/plugins/api-routes.js', {}],
    // Stories Blog - 人物采访
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'stories',
        routeBasePath: 'stories',
        path: './stories',
        showReadingTime: true,
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true,
        },
        editUrl: 'https://github.com/ChanMeng666/femtech-weekend-website/blob/main/',
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'warn',
        blogTitle: 'FemTech Weekend Stories',
        blogDescription: 'Character interviews and inspiring stories from the FemTech community',
        postsPerPage: 'ALL',
        blogSidebarTitle: 'All Stories',
        blogSidebarCount: 0,
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
    // Opinions Blog - 短篇文章
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'opinions',
        routeBasePath: 'opinions',
        path: './opinions',
        showReadingTime: true,
        feedOptions: {
          type: ['rss', 'atom'],
          xslt: true,
        },
        editUrl: 'https://github.com/ChanMeng666/femtech-weekend-website/blob/main/',
        onInlineTags: 'warn',
        onInlineAuthors: 'warn',
        onUntruncatedBlogPosts: 'warn',
        blogTitle: 'FemTech Weekend Opinions',
        blogDescription: 'Short articles and essays on women\'s health technology',
        postsPerPage: 'ALL',
        blogSidebarTitle: 'All Opinions',
        blogSidebarCount: 0,
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
  ],
  scripts: [],

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
          blogTitle: 'FemTech Weekend Blog',
          blogDescription: 'FemTech Weekend Platform Updates',
          postsPerPage: 'ALL',
          blogSidebarTitle: 'All posts',
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
    image: 'img/femtech-weekend-social-card.jpg',
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
        // Ecosystem temporarily hidden
        // {
        //   to: '/ecosystem',
        //   label: 'Ecosystem',
        //   position: 'left'
        // },
        {
          to: '/insights',
          label: 'Insights',
          position: 'left'
        },
        {
          to: '/stories',
          label: 'Stories',
          position: 'left'
        },
        {
          to: '/opinions',
          label: 'Opinions',
          position: 'left'
        },
        // Gallery temporarily hidden until real images are ready
        // {
        //   to: '/gallery',
        //   label: 'Gallery',
        //   position: 'left'
        // },
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
    announcementBar: {
      id: `${ANNOUNCEMENT_EVENT}-${ANNOUNCEMENT_DATE}`,
      content: '<b><a href="/shanghai-summit">Shanghai Summit 2026</a></b> — Cross-Border Capital & Partnerships in Women\'s Health | June 22-25, Shanghai',
      backgroundColor: '#0a0a0a',
      textColor: '#ffffff',
      isCloseable: true,
    },
    algolia: {
      // The application ID provided by Algolia - Application ID
      appId: 'VNBIILHFAK',

      // Public API key: it is safe to commit it - Search API Key
      apiKey: 'a66efbe06c7b3a50d3c677308e22ca7f',

      // Crawler Name
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
              label: 'About Us',
              to: '/about-us',
            },
            // Ecosystem temporarily hidden
            // {
            //   label: 'Ecosystem',
            //   to: '/ecosystem',
            // },
            {
              label: 'Insights',
              to: '/insights',
            },
            {
              label: 'Stories',
              to: '/stories',
            },
            {
              label: 'Opinions',
              to: '/opinions',
            },
            // Gallery temporarily hidden until real images are ready
            // {
            //   label: 'Gallery',
            //   to: '/gallery',
            // },
            // Database temporarily hidden
            // {
            //   label: 'Database',
            //   to: '/database',
            // },
          ],
        },
        {
          title: 'Connect With Us',
          items: [
            {
              label: 'hello@femtechweekend.com',
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
                <div style="display: flex; gap: 20px; align-items: center; justify-content: center;">
                  <div style="text-align: center;">
                    <img src="/img/qrcode/femtech-weekend-xiaohongshu-qrcode.png" alt="Xiaohongshu QR Code" style="width: 80px; height: 80px;" />
                    <div style="margin-top: 5px; font-size: 12px;">Xiaohongshu</div>
                  </div>
                  <div style="text-align: center;">
                    <img src="/img/qrcode/femtech-weekend-gongzhonghao-qrcode.jpg" alt="WeChat Official Account QR Code" style="width: 80px; height: 80px;" />
                    <div style="margin-top: 5px; font-size: 12px;">WeChat</div>
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
