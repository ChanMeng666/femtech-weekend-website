import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Link from '@docusaurus/Link';

// Types for ecosystem members
interface EcosystemMember {
  id: string;
  name: string;
  role: string;
  company?: string;
  bio: string;
  category: string;
  location?: string;
  image?: string;
  website?: string;
  linkedin?: string;
  expertise?: string[];
  achievements?: string;
}

// Mock data for different ecosystem categories
const ecosystemMembers: EcosystemMember[] = [
  // FemTech founders (Mainland China)
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'Founder & CEO',
    company: 'WomenTech Solutions',
    bio: 'Pioneer in AI-powered fertility tracking solutions, helping millions of women understand their reproductive health.',
    category: 'FemTech founders (Mainland China)',
    location: 'Shanghai, China',
    expertise: ['AI/ML', 'Reproductive Health', 'Product Development'],
    achievements: 'Raised $5M Series A, 500K+ users'
  },
  {
    id: '2',
    name: 'Li Wei',
    role: 'Co-founder',
    company: 'HealthHer Tech',
    bio: 'Building comprehensive women\'s health platforms with focus on mental health and wellness.',
    category: 'FemTech founders (Mainland China)',
    location: 'Beijing, China',
    expertise: ['Mental Health', 'Platform Development', 'User Experience'],
    achievements: 'Winner FemTech Innovation Award 2023'
  },
  
  // FemTech founders (International)
  {
    id: '3',
    name: 'Emma Rodriguez',
    role: 'Founder',
    company: 'Global Women\'s Health',
    bio: 'International healthcare entrepreneur focused on accessible women\'s health solutions across emerging markets.',
    category: 'FemTech founders (International)',
    location: 'San Francisco, USA',
    expertise: ['Global Health', 'Market Expansion', 'Healthcare Access'],
    achievements: 'Expanded to 15 countries'
  },
  {
    id: '4',
    name: 'Dr. Priya Patel',
    role: 'CEO & Founder',
    company: 'MedTech Innovations',
    bio: 'Developing breakthrough medical devices for women\'s reproductive health with cutting-edge technology.',
    category: 'FemTech founders (International)',
    location: 'London, UK',
    expertise: ['Medical Devices', 'Regulatory Affairs', 'Clinical Research'],
    achievements: 'FDA Approved Device, $3M Grant'
  },
  
  // Investors
  {
    id: '5',
    name: 'Michael Zhang',
    role: 'Partner',
    company: 'Future Health Ventures',
    bio: 'Leading healthcare investor with deep expertise in women\'s health and digital therapeutics.',
    category: 'Investors',
    location: 'Hong Kong',
    expertise: ['Healthcare Investment', 'Digital Health', 'Market Analysis'],
    achievements: '$100M+ invested in FemTech'
  },
  {
    id: '6',
    name: 'Jennifer Liu',
    role: 'Investment Director',
    company: 'Innovation Capital',
    bio: 'Focused on early-stage FemTech investments and supporting women entrepreneurs in healthcare.',
    category: 'Investors',
    location: 'Singapore',
    expertise: ['Venture Capital', 'Due Diligence', 'Startup Mentoring'],
    achievements: '20+ FemTech portfolio companies'
  },
  
  // Corporates
  {
    id: '7',
    name: 'David Wang',
    role: 'Head of Innovation',
    company: 'HealthCorp Asia',
    bio: 'Leading corporate innovation initiatives in women\'s health and strategic partnerships.',
    category: 'Corporates',
    location: 'Shanghai, China',
    expertise: ['Corporate Strategy', 'Innovation Management', 'Partnerships'],
    achievements: 'Launched 5 FemTech partnerships'
  },
  {
    id: '8',
    name: 'Rachel Kim',
    role: 'VP Strategic Partnerships',
    company: 'MedDevice Global',
    bio: 'Driving corporate engagement with FemTech startups and developing new market opportunities.',
    category: 'Corporates',
    location: 'Seoul, South Korea',
    expertise: ['Business Development', 'Market Entry', 'Product Strategy'],
    achievements: '$50M+ partnership deals'
  },
  
  // Academia
  {
    id: '9',
    name: 'Prof. Dr. Maria Zhang',
    role: 'Professor of Gynecology',
    company: 'Tsinghua University',
    bio: 'Renowned researcher in women\'s reproductive health with focus on technology integration in clinical practice.',
    category: 'Academia',
    location: 'Beijing, China',
    expertise: ['Clinical Research', 'Women\'s Health', 'Medical Technology'],
    achievements: '100+ peer-reviewed publications'
  },
  {
    id: '10',
    name: 'Dr. James Liu',
    role: 'Research Director',
    company: 'Shanghai Medical Institute',
    bio: 'Leading research in digital health applications for women\'s healthcare and preventive medicine.',
    category: 'Academia',
    location: 'Shanghai, China',
    expertise: ['Digital Health Research', 'Preventive Medicine', 'Data Science'],
    achievements: 'NIH Grant Recipient, 50+ Studies'
  },
  
  // FemTech enthusiasts
  {
    id: '11',
    name: 'Anna Chen',
    role: 'Community Manager',
    company: 'Women in Tech Asia',
    bio: 'Passionate advocate for women\'s health innovation and building inclusive communities in technology.',
    category: 'FemTech enthusiasts',
    location: 'Shenzhen, China',
    expertise: ['Community Building', 'Event Management', 'Advocacy'],
    achievements: 'Built 5000+ member community'
  },
  {
    id: '12',
    name: 'Sophie Williams',
    role: 'Product Manager',
    company: 'TechForGood',
    bio: 'Technology enthusiast dedicated to leveraging innovation for social impact in women\'s health.',
    category: 'FemTech enthusiasts',
    location: 'Melbourne, Australia',
    expertise: ['Product Management', 'Social Impact', 'UX Design'],
    achievements: 'Launched 3 health-focused products'
  }
];

const categories = [
  'All Members',
  'FemTech founders (Mainland China)',
  'FemTech founders (International)',
  'Investors',
  'Corporates',
  'Academia',
  'FemTech enthusiasts'
];

// Member card component
function MemberCard({ member }: { member: EcosystemMember }) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
          {member.image ? (
            <img 
              src={member.image} 
              alt={member.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="text-lg font-bold text-primary">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>
        <CardTitle className="text-lg leading-tight">{member.name}</CardTitle>
        <p className="text-primary font-medium text-sm">{member.role}</p>
        {member.company && (
          <p className="text-muted-foreground text-sm">{member.company}</p>
        )}
        {member.location && (
          <p className="text-xs text-muted-foreground">📍 {member.location}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{member.bio}</p>
        
        {member.expertise && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {member.expertise.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs text-primary font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {member.achievements && (
          <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
            <strong>Notable:</strong> {member.achievements}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Hero section
function EcosystemHero() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 pt-24 pb-16">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[var(--ifm-color-primary)] to-[var(--ifm-color-primary-lightest)] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              🌟 Join Our Community
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            FemTech Weekend Ecosystem
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-3xl mx-auto">
            Join our dynamic and inclusive community, where founders, investors, corporates, academia, 
            and enthusiasts from diverse backgrounds unite to drive progress in women's health.
          </p>
        </div>
      </div>
    </div>
  );
}

// Mission section
function EcosystemMission() {
  return (
    <div className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">
            Building Bridges in Women's Health
          </h2>
          <div className="space-y-6 text-lg leading-8 text-muted-foreground">
            <p>
              At FemTech Weekend, we recognise that women's health has long been underserved, underfunded, 
              and overlooked. That's why we are dedicated to building bridges across disciplines—because 
              true innovation happens when different perspectives come together.
            </p>
            <p>
              We believe in the power of collaboration, serendipity, and shared purpose. Whether you are 
              a pioneering founder, a passionate investor, a corporate changemaker, an advocate, or simply 
              enthusiastic about women's health innovation, you'll find opportunities here to{' '}
              <span className="font-bold text-primary">CONNECT</span>,{' '}
              <span className="font-bold text-primary">COLLABORATE</span>, and{' '}
              <span className="font-bold text-primary">CREATE</span> impact.
            </p>
            <p>
              Through curated programs, mentorship, workshops, and engaging events, FemTech Weekend is 
              your gateway to breaking barriers and shaping a more equitable future in women's health 
              innovation in China or connecting globally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Statistics section
function EcosystemStats() {
  const stats = [
    { value: '200+', label: 'Community Members' },
    { value: '6', label: 'Member Categories' },
    { value: '15+', label: 'Countries Represented' },
    { value: '50+', label: 'Partner Organizations' },
  ];

  return (
    <div className="bg-primary/5 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Call to action
function JoinEcosystem() {
  return (
    <div className="bg-background">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Join the Ecosystem?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Join us and become part of the FemTech Weekend Ecosystem—a network that empowers, 
            inspires, and celebrates everyone working to advance women's health.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/about-us">
              <Button size="lg">Learn More</Button>
            </Link>
            <Link to="mailto:hello@femtechweekend.com?subject=Join%20FemTech%20Weekend%20Ecosystem">
              <Button variant="outline" size="lg">Apply to Join</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Ecosystem(): React.ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const [activeCategory, setActiveCategory] = useState('All Members');

  // Filter members based on active category
  const filteredMembers = ecosystemMembers.filter(member => {
    if (activeCategory === 'All Members') {
      return true;
    }
    return member.category === activeCategory;
  });

  return (
    <Layout
      title="Ecosystem"
      description="Join the FemTech Weekend community - connecting founders, investors, corporates, academia, and enthusiasts in women's health innovation.">
      <main>
        <EcosystemHero />
        <EcosystemStats />
        <EcosystemMission />
        
        {/* Member Directory Section */}
        <div className="bg-background py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Meet Our Community
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Discover the diverse group of innovators, leaders, and changemakers driving women's health forward.
              </p>
            </div>

            {/* Category Filter */}
            <div className="mb-12 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className={`transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'hover:bg-primary/10 hover:text-primary hover:border-primary'
                  }`}
                >
                  {category}
                  <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                    {category === 'All Members' 
                      ? ecosystemMembers.length 
                      : ecosystemMembers.filter(m => m.category === category).length
                    }
                  </span>
                </Button>
              ))}
            </div>

            {/* Members Grid */}
            {filteredMembers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMembers.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                  No members found in this category. Check back soon as our community grows!
                </p>
              </div>
            )}

          </div>
        </div>

        <JoinEcosystem />
      </main>
    </Layout>
  );
} 