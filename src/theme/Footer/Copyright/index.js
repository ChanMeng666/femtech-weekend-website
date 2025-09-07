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

  // 获取当前年份
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer__copyright">
      <div className="footer__copyright-main">
        <Translate
          id="copyright"
          description="The footer copyright"
          values={{
            year: currentYear,
          }}>
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