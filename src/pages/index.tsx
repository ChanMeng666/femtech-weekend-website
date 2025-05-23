import React from 'react';
import { PageContainer, HomepageContent } from '../components';
import { homepageConfig } from '../data';

export default function Home(): React.ReactNode {
  return (
    <PageContainer description={homepageConfig.seo.description}>
      <HomepageContent />
    </PageContainer>
  );
}
