import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HomepageContent } from '../components';
import { getHomepageTitle, getHomepageDescription } from '../constants/homepage';

export default function Home(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  
  const title = getHomepageTitle();
  const description = getHomepageDescription();
  
  return (
    <Layout
      title={title}
      description={description}>
      <main>
        <HomepageContent />
      </main>
    </Layout>
  );
}
