import React from 'react';
import Translate from '@docusaurus/Translate';
import {useThemeConfig} from '@docusaurus/theme-common';

export default function FooterCopyright() {
  const {footer} = useThemeConfig();
  const {copyright} = footer || {};

  if (!copyright) {
    return null;
  }

  // 获取当前年份
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer__copyright">
      <Translate
        id="copyright"
        description="The footer copyright"
        values={{
          year: currentYear,
        }}>
        {copyright}
      </Translate>
    </div>
  );
} 