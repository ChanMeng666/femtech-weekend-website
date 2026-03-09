import React, {type ComponentProps, type ReactNode} from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

const announcementContent = {
  en: '<b><a href="/shanghai-summit">Shanghai Summit 2026</a></b> — Cross-Border Capital & Partnerships in Women\'s Health | June 22-25, Shanghai',
  zh: '<b><a href="/zh-Hans/shanghai-summit">2026上海峰会</a></b> — 女性健康跨境资本与合作 | 6月22-25日，上海',
};

export default function AnnouncementBarContent(
  props: ComponentProps<'div'>,
): ReactNode {
  const {announcementBar} = useThemeConfig();
  const {i18n: {currentLocale}} = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';
  const content = announcementContent[locale] || announcementBar!.content;

  return (
    <div
      {...props}
      className={clsx(styles.content, props.className)}
      dangerouslySetInnerHTML={{__html: content}}
    />
  );
}
