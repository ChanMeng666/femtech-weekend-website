import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { LogoAnimation } from './ui/LogoAnimation';

interface PageContainerProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  showLogo?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  description,
  children,
  showLogo = true
}) => {
  const { siteConfig } = useDocusaurusContext();
  
  const pageTitle = title || siteConfig.title;
  
  return (
    <Layout
      title={pageTitle}
      description={description}
    >
      {showLogo && (
        <>
          <div className="fixed bottom-20 right-8 opacity-5 pointer-events-none z-0 hidden md:block">
            <LogoAnimation size={200} opacity={1} rotate={true} />
          </div>
        </>
      )}
      <main>
        {children}
      </main>
    </Layout>
  );
}; 