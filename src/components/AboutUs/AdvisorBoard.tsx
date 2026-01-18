import React, { useEffect, useRef, useState } from 'react';
import { TeamMember, TeamMemberProps } from './TeamMember';
import { getAdvisorBoardTitle, getAdvisorBoardDescription } from '../../constants/about-us-components';
import { AnimatedLine } from '../ui/AnimatedLine';
import { translate } from '@docusaurus/Translate';

export function AdvisorBoard() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const title = getAdvisorBoardTitle();
  const description = getAdvisorBoardDescription();

  const sectionLabel = translate({
    id: 'aboutUs.advisors.label',
    message: 'Advisory Board',
  });

  const advisors: TeamMemberProps[] = [
    {
      name: "Celina Chew",
      role: "Former President of Bayer Group Greater China",
      bio: "Celina is the former President of Bayer for Greater China.  She holds Bachelor and Master degrees in law. She worked as a private practice lawyer before moving in-house to the Bayer Greater China Legal Department in 1997.  She was head of Legal in Greater China (1998-2011), then became Country Group Head for Bayer North ASEAN Region (2011-2014) and President of Bayer, Greater China (2014-2019) overseeing Bayer's operations in these regions. Celina has also been a Board member of various chambers of commerce, Enactus China and has acted as advisor to various organizations such as Ladies Who Tech, SilVR Adventures, Global Women Connect. She is honoured to be named in Forbes 100 Most Powerful Business Lists (2017 and 2018) and to receive an International Friendship Award from IESE in 2018, presented by the Queen of Spain. Celina is also featured in the book \"China CEO II: Voices of Experience from 25 Top Executives Leading MNCs in China\" by Juan Antonio Fernandez, Laurie Underwood.",
      image: "/img/team/advisor-celina-chew.jpg",
    },
    {
      name: "Sandy Lv",
      role: "Bayer Women's Health Department",
      bio: "Sandy is responsible for innovation and commercialization in early venture partnerships. One of Bayer Women's Health's key focus areas is to collaboratively build a women's health ecosystem with partners from government, industry, academia, research, and technology innovation companies. The goal is to dispel misconceptions, raise awareness of diseases, and provide high-quality, professional, and comprehensive healthcare services for women at all stages of life.",
      image: "/img/team/advisor-sandy-lv.jpg",
    },
    {
      name: "Nicole Bu",
      role: "Healthcare Business Developer",
      bio: "Over 7+ years in startups scaling at-home diagnostics, SaMD, and remote patient monitoring platforms, Nicole has spearheaded GTM strategies for new product launches and built high-conversion, AI-automated sales funnels, cultivating a network of 500+ providers across pulmonology, mental health, and primary care. Combining operational execution with data-driven decision-making (MS, Healthcare Decision Analysis, USC), Nicole bridges the gap between innovation and clinical adoption—driving growth for cutting-edge healthtech solutions.",
      image: "/img/team/advisor-nicole-bu.svg",
    },
    {
      name: "Huiqi (Yvonne) Lu",
      role: "Lecturer in Engineering Science, University of Oxford",
      bio: "Dr Huiqi Yvonne Lu is a researcher in AI for health and sensor informatics and a Lecturer in Engineering Science at the University of Oxford. Her research focuses on AI for digital health and sensor signal processing, and wearable devices for health monitoring (human, machine, and environmental changes). Dr Lu has led and co-led clinical AI and mobile health projects in academic and commercial settings and filed one patent. She has served as the conference and workshop committee member at notable conferences, including ICLR (PMLDC), NeurIPs (ML4H), IJCAI(KDHD), and the PHM. Dr Lu actively contributes to the IEEE Standard Committee for P3191: Performance Monitoring of Machine Learning-enabled Medical Devices in Clinical Use. She is an Associate Editor of Nature npj Women's Health, a Chief Editor of a special collection of \"Advances in AI for Women's Health, Reproductive Health, and Maternal Care: Bridging Innovation and Healthcare\". She also holds an honorary Research Fellow position at the George Institute for Global Health, Imperial College London.",
      image: "/img/team/advisor-yvvone.jpeg",
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <div
            className="mb-6 transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <AnimatedLine variant="label" label={sectionLabel} />
          </div>

          <h2
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '100ms',
            }}
          >
            {title}
          </h2>

          <p
            className="mt-4 max-w-2xl text-lg text-muted-foreground transition-all duration-700"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '200ms',
            }}
          >
            {description}
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advisors.map((advisor, index) => (
            <div
              key={index}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionProperty: 'opacity, transform',
                transitionDuration: '700ms',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${300 + index * 100}ms`,
              }}
            >
              <TeamMember {...advisor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
