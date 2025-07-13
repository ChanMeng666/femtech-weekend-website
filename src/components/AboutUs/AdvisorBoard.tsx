import React from 'react';
import { TeamMember, TeamMemberProps } from './TeamMember';
import { getAdvisorBoardTitle, getAdvisorBoardDescription } from '../../constants/about-us-components';

export function AdvisorBoard() {
  const title = getAdvisorBoardTitle();
  const description = getAdvisorBoardDescription();
  
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

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          {advisors.map((advisor, index) => (
            <TeamMember key={index} {...advisor} />
          ))}
        </div>
      </div>
    </div>
  );
} 