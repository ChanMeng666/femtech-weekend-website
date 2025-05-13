import React from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ShowcaseFilters from '@site/src/components/ShowcaseFilters';
import ShowcaseCards from '@site/src/components/ShowcaseCards';

const TITLE = translate({id: 'showcase.title', message: 'FemTech Companies Showcase'});
const DESCRIPTION = translate({id: 'showcase.description', message: 'Innovative companies in the women\'s health industry in China'});

function ShowcaseHeader() {
  return (
    <section className="margin-top--lg margin-bottom--lg text--center">
      <Heading as="h1">
        <Translate id="showcase.header.title">FemTech Companies Showcase</Translate>
      </Heading>
      <p>
        <Translate id="showcase.header.description">
          Directory of innovative companies in the women's health industry in China
        </Translate>
      </p>
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