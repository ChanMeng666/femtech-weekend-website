import { useEffect, useRef } from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import gsap from 'gsap';
import BrowserOnly from '@docusaurus/BrowserOnly';

import styles from './index.module.css';

// Logos
const logos = {
  beige: require('@site/static/img/logo/femtech-weekend-sub-logo-beige.svg').default,
  black: require('@site/static/img/logo/femtech-weekend-sub-logo-black.svg').default,
  brown: require('@site/static/img/logo/femtech-weekend-sub-logo-brown.svg').default,
  white: require('@site/static/img/logo/femtech-weekend-sub-logo-white.svg').default,
};

// Team members data
const teamMembers = [
  {
    name: 'Zhu Yihan',
    role: 'Founder & CEO',
    description: 'Data, Balance Sheet Management and a global citizen',
    image: 'https://placehold.co/300x300/pink/white?text=Zhu+Yihan',
  },
  {
    name: 'Michelle Li',
    role: 'Head of Partnerships',
    description: 'Expert in Private Equity investment and Due Dilligence',
    image: 'https://placehold.co/300x300/pink/white?text=Michelle+Li',
  },
  {
    name: 'Leaf He',
    role: 'Chief Operating Officer',
    description: 'Experts in Financial Advisory and community building',
    image: 'https://placehold.co/300x300/pink/white?text=Leaf+He',
  },
  {
    name: 'Joji Lee',
    role: 'Chief Marketing Officer',
    description: 'Specializes in PR, consumer marketing and events organisation',
    image: 'https://placehold.co/300x300/pink/white?text=Joji+Lee',
  },
  {
    name: 'Lingxi Zhang',
    role: 'Chief Design Officer',
    description: 'Specializes in Animation, Video editing and story telling',
    image: 'https://placehold.co/300x300/pink/white?text=Lingxi+Zhang',
  },
];

// Initialize GSAP ScrollTrigger in browser only
const initGSAP = () => {
  if (typeof window !== 'undefined') {
    // Import ScrollTrigger dynamically to avoid SSR issues
    const ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    return ScrollTrigger;
  }
  return null;
};

function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ScrollTrigger = initGSAP();
      
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.4'
        );
      
      // Parallax effect on hero section
      if (ScrollTrigger) {
        gsap.to(heroRef.current, {
          backgroundPosition: '50% 30%',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
      
      return () => {
        if (ScrollTrigger) {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
      };
    }
  }, []);

  return (
    <header ref={heroRef} className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroTextContainer}>
          <Heading as="h1" className={styles.heroTitle} ref={titleRef}>
            FemTech Weekend
          </Heading>
          <p className={styles.heroSubtitle} ref={subtitleRef}>
            Bridging China and the world in advancing the women's health innovation
          </p>
          <div className={styles.heroCta} ref={ctaRef}>
            <Link
              className={clsx('button button--primary button--lg', styles.heroButton)}
              to="/docs/femtech-insights">
              Learn More
            </Link>
            <Link
              className={clsx('button button--outline button--lg', styles.heroButton)}
              to="https://linkedin.com/company/femtech-weekend" target="_blank" rel="noopener noreferrer">
              Join Us
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.heroWave}>
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,64C1120,53,1280,75,1360,85.3L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="var(--ifm-background-color)"></path>
        </svg>
      </div>
    </header>
  );
}

function Mission() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ScrollTrigger = initGSAP();
      
      gsap.from(textRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.mission}>
      <div className="container">
        <div className={styles.sectionHeadingContainer}>
          <Heading as="h2" className={styles.sectionHeading}>Our Mission</Heading>
        </div>
        
        <div className={styles.missionContent}>
          <div className={styles.missionText} ref={textRef}>
            <p className={styles.missionLead}>
              <strong>FemTech Weekend</strong> — Rooted in China, Connecting globally. 
              We pioneer Women's Health Innovation in China to drive worldwide impact.
            </p>
            <ul className={styles.missionList}>
              <li>
                <span className={styles.missionIcon}>🌍</span> 
                <strong>Drive Women's Health Innovation</strong> We are dedicated to pioneering innovation in women's health, advocating for cutting-edge technology to break barriers, improve care, and empower women from China.
              </li>
              <li>
                <span className={styles.missionIcon}>💡</span> 
                <strong>Amplify Women in Tech Entrepreneurship</strong> We redefine who builds the future of women's health – creating an inclusive ecosystem where every women from China can access the knowledge, capital and support needed to succeed.
              </li>
              <li>
                <span className={styles.missionIcon}>🚀</span> 
                <strong>Ecosystem Building</strong> We build a thriving homegrown innovation hub while fostering cross-border collaboration - strengthening local industry-academia-investment-research ties while opening doors for worldwide knowledge exchange.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  
  cardRefs.current = [];
  
  const addToCardRefs = el => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ScrollTrigger = initGSAP();
      
      gsap.from(sectionRef.current.querySelector('h2'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
      
      cardRefs.current.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          delay: 0.15 * index,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        });
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className={styles.team}>
      <div className="container">
        <div className={styles.sectionHeadingContainer}>
          <Heading as="h2" className={styles.sectionHeading}>Our Team</Heading>
        </div>
        
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamCard} ref={addToCardRefs}>
              <div className={styles.teamImageContainer}>
                <img src={member.image} alt={member.name} className={styles.teamImage} />
              </div>
              <h3 className={styles.teamName}>{member.name}</h3>
              <p className={styles.teamRole}>{member.role}</p>
              <p className={styles.teamDescription}>{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedHomepage() {
  return (
    <BrowserOnly>
      {() => (
        <>
          <Hero />
          <Mission />
          <Team />
        </>
      )}
    </BrowserOnly>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title={siteConfig.title}
      description="FemTech Weekend - Pioneering Women's Health Innovation in China">
      <main className={styles.homeMain}>
        <AnimatedHomepage />
      </main>
    </Layout>
  );
}
