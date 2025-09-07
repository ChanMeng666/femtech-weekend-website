import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import FooterLinks from '@theme/Footer/Links';
import FooterLogo from '@theme/Footer/Logo';
import FooterCopyright from '@theme/Footer/Copyright';
import FooterLayout from '@theme/Footer/Layout';

function Footer() {
  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }
  
  const {links, logo, style} = footer;
  
  // Filter out the Developer section from config since we don't need it as a column anymore
  const filteredLinks = links?.filter(section => section.title !== 'Developer') || [];

  return (
    <FooterLayout
      style={style}
      links={filteredLinks && filteredLinks.length > 0 && <FooterLinks links={filteredLinks} />}
      logo={logo && <FooterLogo logo={logo} />}
      copyright={<FooterCopyright />}
    />
  );
}

export default React.memo(Footer); 