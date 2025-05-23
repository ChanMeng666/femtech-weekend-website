import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface PageContainerProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  description,
  children
}) => {
  const { siteConfig } = useDocusaurusContext();
  
  const pageTitle = title || siteConfig.title;
  
  return (
    <Layout
      title={pageTitle}
      description={description}
    >
      <main>
        {children}
      </main>
    </Layout>
  );
}; 