import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Link from '@docusaurus/Link';

// Competition Hero Section
function CompetitionHero() {
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
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              🏆 Registration Now Open
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            FemTech Weekend Competition 2024
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join the premier women's health innovation competition in China. Showcase your groundbreaking 
            solutions, connect with leading investors, and accelerate your FemTech journey.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="#register">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Register Now
              </Button>
            </Link>
            <Link to="#timeline">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Competition Stats
function CompetitionStats() {
  const stats = [
    { value: '50+', label: 'Participating Teams' },
    { value: '¥500K', label: 'Total Prize Pool' },
    { value: '30+', label: 'Industry Mentors' },
    { value: '20+', label: 'Investment Partners' },
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

// Timeline Section
function Timeline() {
  const timelineEvents = [
    {
      date: 'Jan 15 - Feb 28',
      title: 'Registration & Application',
      description: 'Submit your application with team details and project pitch',
      status: 'current'
    },
    {
      date: 'Mar 1 - Mar 15',
      title: 'Initial Screening',
      description: 'Expert panel reviews applications and selects semifinalists',
      status: 'upcoming'
    },
    {
      date: 'Mar 20 - Apr 15',
      title: 'Mentorship Phase',
      description: 'Selected teams receive mentorship and refine their solutions',
      status: 'upcoming'
    },
    {
      date: 'Apr 20 - Apr 21',
      title: 'Final Pitch Weekend',
      description: 'Teams present to judges and investors at the main event',
      status: 'upcoming'
    },
    {
      date: 'Apr 21',
      title: 'Awards Ceremony',
      description: 'Winners announced and networking celebration',
      status: 'upcoming'
    }
  ];

  return (
    <div id="timeline" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Competition Timeline
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Follow our structured program designed to maximize your success and growth.
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-primary/20"></div>
          
          {timelineEvents.map((event, index) => (
            <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <Card className={`${event.status === 'current' ? 'border-primary bg-primary/5' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'current' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {event.date}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Timeline dot */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background ${
                event.status === 'current' ? 'bg-primary' : 'bg-muted'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Prizes Section
function Prizes() {
  const prizes = [
    {
      title: 'Grand Prize',
      amount: '¥200,000',
      benefits: [
        'Cash prize of ¥200,000',
        'Incubation program placement',
        'Investor introductions',
        'Mentorship for 6 months'
      ],
      highlight: true
    },
    {
      title: '2nd Place',
      amount: '¥100,000',
      benefits: [
        'Cash prize of ¥100,000',
        'Accelerator program access',
        'Networking opportunities',
        'Mentorship for 3 months'
      ]
    },
    {
      title: '3rd Place',
      amount: '¥50,000',
      benefits: [
        'Cash prize of ¥50,000',
        'Industry connections',
        'Marketing support',
        'Mentorship for 1 month'
      ]
    }
  ];

  const specialAwards = [
    'Most Innovative Technology Award (¥25,000)',
    'Best Social Impact Award (¥25,000)',
    'People\'s Choice Award (¥25,000)',
    'Best Presentation Award (¥25,000)'
  ];

  return (
    <div className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Prizes & Awards
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Competitive prizes and valuable opportunities for winning teams.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
          {prizes.map((prize, index) => (
            <Card key={index} className={`text-center ${prize.highlight ? 'border-primary bg-primary/5 transform scale-105' : ''}`}>
              <CardHeader>
                <CardTitle className="text-2xl">{prize.title}</CardTitle>
                <div className="text-3xl font-bold text-primary">{prize.amount}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {prize.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg className="h-4 w-4 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Special Awards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specialAwards.map((award, index) => (
                <div key={index} className="flex items-center">
                  <svg className="h-5 w-5 text-primary mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{award}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Requirements Section
function Requirements() {
  const categories = [
    {
      title: 'Reproductive Health',
      description: 'Fertility tracking, contraception, pregnancy care, menopause management'
    },
    {
      title: 'Mental Health & Wellness',
      description: 'Postpartum depression, anxiety management, wellness apps, therapy platforms'
    },
    {
      title: 'Preventive Care',
      description: 'Cancer screening, diagnostic tools, early detection systems, health monitoring'
    },
    {
      title: 'Chronic Disease Management',
      description: 'PCOS, endometriosis, autoimmune conditions, personalized treatment plans'
    }
  ];

  const eligibilityCriteria = [
    'Early-stage startups (pre-Series A)',
    'Focus on women\'s health technology',
    'Team of 2-5 members',
    'Working prototype or MVP',
    'Clear business model and go-to-market strategy',
    'Commitment to participate in full program'
  ];

  return (
    <div id="requirements" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Competition Categories & Requirements
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We welcome innovative solutions across all areas of women's health technology.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-16">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Eligibility Criteria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eligibilityCriteria.map((criterion, index) => (
                <div key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>{criterion}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Registration CTA
function RegistrationCTA() {
  return (
    <div id="register" className="bg-primary/5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Transform Women's Health?
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Join us in building the future of FemTech. Registration closes February 28, 2024.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="mailto:competition@femtechweekend.com?subject=Competition Registration">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Register Your Team
              </Button>
            </Link>
            <Link to="/showcase">
              <Button variant="outline" size="lg">
                View Previous Winners
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free to participate
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Expert mentorship included
            </div>
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Investor access guaranteed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Competition(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="Competition"
      description="Join the premier women's health innovation competition in China. Showcase your FemTech solutions and connect with leading investors.">
      <main>
        <CompetitionHero />
        <CompetitionStats />
        <Timeline />
        <Prizes />
        <Requirements />
        <RegistrationCTA />
      </main>
    </Layout>
  );
} 