import React from 'react';
import { Button } from './ui/button';
import { WordRotate } from './ui/word-rotate';
import Link from '@docusaurus/Link';
import Waves from './Waves';
import { 
  getHeroTitle, 
  getHeroSubtitle, 
  getCtaStart 
} from '../constants/homepage';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {translate} from '@docusaurus/Translate';

export function Hero() {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  
  // Define rotating words based on current locale
  const rotatingWords = currentLocale === 'zh-Hans' 
    ? [
        "用科技推动女性健康创新",
        "提升女性科技创业影响力", 
        "建立全球协作生态系统"
      ]
    : [
        "Drive women\'s health innovation with technology",
        "Amplify women in tech entrepreneurship", 
        "Build a global collaborative ecosystem"
      ];

  const title = getHeroTitle();
  const subtitle = getHeroSubtitle();
  const ctaText = translate({
    id: 'homepage.hero.cta.join',
    message: 'Join The Ecosystem'
  });

  return (
    <div className="relative isolate overflow-hidden bg-background">
      {/* Waves background */}
      <Waves 
        lineColor="#D6AB93"
        backgroundColor="rgba(214, 171, 147, 0.03)"
        waveSpeedX={0.02}
        waveSpeedY={0.01}
        waveAmpX={40}
        waveAmpY={20}
        friction={0.9}
        tension={0.01}
        maxCursorMove={120}
        xGap={12}
        yGap={36}
        className="z-[-15]"
      />
      
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
            {title}
          </h1>
          <div className="mt-4 mb-6">
            <WordRotate
              className="text-2xl font-semibold text-primary sm:text-3xl"
              words={rotatingWords}
              duration={3000}
            />
          </div>
          <p className="text-lg leading-8 text-muted-foreground">
            {subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/ecosystem/join">
              <Button size="lg">{ctaText}</Button>
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