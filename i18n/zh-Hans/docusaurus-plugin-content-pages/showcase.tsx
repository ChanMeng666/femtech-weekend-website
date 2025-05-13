import React from 'react';
import {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ShowcaseFilters from '@site/src/components/ShowcaseFilters';
import ShowcaseCards from '@site/src/components/ShowcaseCards';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function ShowcaseHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">
        中国女性健康公司展示
      </Heading>
      <p>
        中国女性健康领域的创新企业列表
      </p>
    </section>
  );
}

export default function Showcase(): React.ReactNode {
  const title = "中国女性健康公司展示";
  const description = "中国女性健康领域的创新企业列表";

  return (
    <Layout 
      title={title}
      description={description}>
      <main className="margin-vert--lg">
        <ShowcaseHeader />
        <ShowcaseFilters />
        <ShowcaseCards />
      </main>
    </Layout>
  );
} 