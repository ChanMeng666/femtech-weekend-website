import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ShowcaseFilters from '@site/src/components/ShowcaseFilters';
import ShowcaseCards from '@site/src/components/ShowcaseCards';

const TITLE = translate({message: '中国女性健康公司展示'});
const DESCRIPTION = translate({
  message: '中国女性健康领域的创新企业列表',
});

function ShowcaseHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">{TITLE}</Heading>
      <p>{DESCRIPTION}</p>
    </section>
  );
}

export default function Showcase(): React.ReactNode {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <main className="margin-vert--lg">
        <ShowcaseHeader />
        <ShowcaseFilters />
        <ShowcaseCards />
      </main>
    </Layout>
  );
} 