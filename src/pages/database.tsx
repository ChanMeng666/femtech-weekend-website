import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ShowcaseLayout from '@site/src/components/ShowcaseLayout';
import { LogoDivider } from '../components/ui/LogoDivider';
import { getShowcaseTitle, getShowcaseDescription } from '@site/src/constants/showcase';

export default function Showcase(): React.ReactNode {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  
  const title = getShowcaseTitle();
  const description = getShowcaseDescription();

  return (
    <Layout 
      title={title}
      description={description}>
      <ShowcaseLayout />
    </Layout>
  );
} 