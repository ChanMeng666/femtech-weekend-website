import React from 'react';
import {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ShowcaseFilters from '@site/src/components/ShowcaseFilters';
import ShowcaseCards from '@site/src/components/ShowcaseCards';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function ShowcaseHeader() {
  return (
    <div className="bg-background py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Heading as="h1" className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
          中国女性健康公司展示
        </Heading>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          中国女性健康领域的创新企业列表
        </p>
      </div>
    </div>
  );
}

export default function Showcase(): React.ReactNode {
  const title = "中国女性健康公司展示";
  const description = "中国女性健康领域的创新企业列表";

  return (
    <Layout 
      title={title}
      description={description}>
      <main className="bg-background min-h-screen">
        <ShowcaseHeader />
        <div className="relative -mt-8 z-10">
          <ShowcaseFilters />
        </div>
        <ShowcaseCards />
      </main>
    </Layout>
  );
} 