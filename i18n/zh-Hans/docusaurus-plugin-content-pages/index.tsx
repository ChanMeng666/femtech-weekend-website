import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { HomepageContent } from '../../../src/components';

export default function Home(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  
  return (
    <Layout
      title="女性健康科技周末"
      description="女性健康科技周末 - 植根中国，连接全球">
      <main>
        <HomepageContent />
      </main>
    </Layout>
  );
} 