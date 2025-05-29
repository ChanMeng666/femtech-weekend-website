import React from 'react';
import clsx from 'clsx';
import { LogoBackground } from './ui/LogoBackground';
import Waves from './Waves';
import styles from '../css/components/PartnershipSection.module.css';
import {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const PartnershipSection: React.FC = () => {
  const {i18n: {currentLocale}} = useDocusaurusContext();
  
  const title = translate({
    id: 'homepage.partnership.title',
    message: 'Our Partners'
  });
  
  const subtitle = translate({
    id: 'homepage.partnership.subtitle',
    message: 'Collaborating with leading organizations to advance women\'s health technology'
  });
  
  const partners = [
    {
      name: 'C2C',
      logo: '/img/partnership-logo/c2c-logo.svg',
    },
    {
      name: 'She Rewires',
      logo: '/img/partnership-logo/she-rewires-logo.svg',
    },
    {
      name: 'Yue Ji Yi Mu',
      logo: '/img/partnership-logo/yue-ji-yi-mu-logo.svg',
    },
  ];

  return (
    <div className="relative bg-background py-24 sm:py-32 overflow-hidden">
      {/* Logo background */}
      <LogoBackground pattern="scattered" opacity={0.04} animate={true} />
      
      {/* Waves background */}
      <Waves 
        lineColor="rgba(214, 171, 147, 0.85)"
        backgroundColor="transparent"
        waveSpeedX={0.01}
        waveSpeedY={0.007}
        waveAmpX={25}
        waveAmpY={12}
        friction={0.93}
        tension={0.007}
        maxCursorMove={80}
        xGap={18}
        yGap={45}
        className="z-0 opacity-40"
      />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {subtitle}
          </p>
        </div>
        
        <div className={clsx('mt-16 sm:mt-20 lg:mt-24', styles.partnersContainer)}>
          {partners.map((partner, idx) => (
            <div key={idx} className={styles.partnerItem}>
              <div className={styles.partnerLogoWrapper}>
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className={styles.partnerLogo}
                />
              </div>
            </div>
          ))}
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
    </div>
  );
} 