import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import { Button } from '../../../src/components/ui/button';
import { cn } from '../../../src/lib/utils';

// 中文版 Hero 组件
function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="absolute inset-x-0 top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[var(--ifm-color-primary)] to-[var(--ifm-color-primary-lightest)] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            女性科技周末
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            植根中国，连接全球。为女性健康创新和创业提供平台。
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/docs/intro">
              <Button size="lg">快速开始</Button>
            </Link>
            <Link to="/blog">
              <Button variant="outline" size="lg">了解更多</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[var(--ifm-color-primary-darker)] to-[var(--ifm-color-primary)] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
}

// 中文版功能组件
function Features() {
  interface FeatureProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    className?: string;
  }

  function Feature({ title, description, icon, className = '' }: FeatureProps) {
    return (
      <div className={cn("flex flex-col items-start", className)}>
        <div className="mb-4 rounded-lg bg-primary/10 p-3 text-primary">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-medium text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    );
  }

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            赋能女性健康创新
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            女性科技周末汇聚创业者、投资者和医疗专业人士，共同推进女性健康解决方案。
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              title="创业"
              description="支持为女性健康挑战构建创新解决方案的创始人。"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
              }
            />
            <Feature
              title="投资"
              description="将有前景的女性科技初创企业与战略投资者和融资机会联系起来。"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              }
            />
            <Feature
              title="全球连接"
              description="在中国的女性科技生态系统与全球女性健康社区之间搭建桥梁。"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// 中文版推荐语组件
function TestimonialSection() {
  interface TestimonialProps {
    quote: string;
    author: string;
    role?: string;
    company?: string;
  }

  function Testimonial({ quote, author, role, company }: TestimonialProps) {
    return (
      <div className="relative rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <svg
              className="absolute left-0 top-0 h-8 w-8 -translate-x-4 -translate-y-4 transform text-muted-foreground opacity-50"
              fill="none"
              height="48"
              viewBox="0 0 48 48"
              width="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0269 18.0645H21.0159C21.0159 13.1935 18.7394 11.129 16.4629 10.4516V7.25806C21.2445 7.82258 27.0269 10.7742 27.0269 19.4193V36.7097H14.0269V18.0645ZM32.0484 18.0645H39.0374C39.0374 13.1935 36.761 11.129 34.4845 10.4516V7.25806C39.2661 7.82258 45.0484 10.7742 45.0484 19.4193V36.7097H32.0484V18.0645Z"
                fill="currentColor"
              />
            </svg>
            <blockquote className="text-lg font-medium leading-relaxed text-card-foreground">
              {quote}
            </blockquote>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-medium text-card-foreground">{author}</div>
              {(role || company) && (
                <div className="text-sm text-muted-foreground">
                  {role}
                  {role && company && " · "}
                  {company}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function TestimonialGrid({ children }: { children: React.ReactNode }) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    );
  }

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            社区成员评价
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            听听创业者、投资者和医疗专业人士对我们成长中的生态系统的评价。
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-7xl">
          <TestimonialGrid>
            <Testimonial 
              quote="女性科技周末为我们提供了与真正了解中国女性健康市场的投资者联系的完美平台。"
              author="张薇"
              role="创始人"
              company="她健康科技"
            />
            <Testimonial 
              quote="在女性科技周末获得的指导和人脉对我们扩展国际产品线起到了关键作用。"
              author="陈丽娜"
              role="CEO"
              company="女性创新科技"
            />
            <Testimonial 
              quote="作为投资者，女性科技周末让我接触到了一些解决女性医疗关键需求的最有前途的初创公司。"
              author="李梅"
              role="合伙人"
              company="远景投资"
            />
          </TestimonialGrid>
        </div>
      </div>
    </div>
  );
}

export default function Home(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="女性科技周末"
      description="女性科技周末 - 植根中国，连接全球">
      <main>
        <Hero />
        <Features />
        <TestimonialSection />
      </main>
    </Layout>
  );
} 