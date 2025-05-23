import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Link from '@docusaurus/Link';

// Team member component
interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
}

function TeamMember({ name, role, bio, image, linkedin }: TeamMemberProps) {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="text-2xl font-bold text-primary">
              {name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>
        <CardTitle className="text-xl">{name}</CardTitle>
        <p className="text-primary font-medium">{role}</p>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground mb-4">{bio}</p>
        {linkedin && (
          <Link to={linkedin} className="text-primary hover:text-primary/80">
            <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

// Hero section for About Us
function AboutHero() {
  return (
    <div className="relative isolate overflow-hidden bg-background pt-24 pb-16">
      <div className="absolute inset-x-0 top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[var(--ifm-color-primary)] to-[var(--ifm-color-primary-lightest)] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            About FemTech Weekend
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We are passionate about advancing women's health through innovation, entrepreneurship, and global collaboration.
          </p>
        </div>
      </div>
    </div>
  );
}

// Mission and Vision section
function MissionVision() {
  return (
    <div className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="mb-4 rounded-lg bg-primary/10 p-3 text-primary w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                </svg>
              </div>
              <CardTitle className="text-2xl text-foreground">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-7">
                To accelerate innovation in women's health by connecting entrepreneurs, investors, and healthcare professionals across China and globally. We foster an ecosystem where groundbreaking FemTech solutions can thrive and create meaningful impact.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <div className="mb-4 rounded-lg bg-primary/10 p-3 text-primary w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <CardTitle className="text-2xl text-foreground">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-7">
                To become the leading platform bridging China's FemTech ecosystem with the global women's health community, empowering a future where every woman has access to innovative healthcare solutions tailored to her unique needs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Values section
function Values() {
  const values = [
    {
      title: "Innovation First",
      description: "We believe in pushing boundaries and supporting cutting-edge solutions that address real challenges in women's health.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m4.5 0a12.052 12.052 0 0 0 3.75-.806 2.25 2.25 0 0 0 1.5-2.122 2.25 2.25 0 0 0-.78-1.69l-1.754-1.533a.25.25 0 0 0-.28-.082l-2.46 1.039a.75.75 0 0 1-.735-.117l-1.071-.857a.25.25 0 0 0-.28-.082l-2.86 1.206a.75.75 0 0 1-.884-.334l-1.044-2.088A.25.25 0 0 0 6.5 10.5H5.25a2.25 2.25 0 0 0-2.122 1.5 12.06 12.06 0 0 0 0 4.5c.06.814.412 1.582.988 2.122.575.54 1.308.878 2.122.878h1.25a.25.25 0 0 0 .218-.128l1.044-2.088a.75.75 0 0 1 .884-.334l2.86 1.206a.25.25 0 0 0 .28-.082l1.071-.857a.75.75 0 0 1 .735-.117l2.46 1.039a.25.25 0 0 0 .28-.082l1.754-1.533a2.25 2.25 0 0 0 .78-1.69 2.25 2.25 0 0 0-1.5-2.122A12.052 12.052 0 0 0 16.5 18.75Z" />
        </svg>
      )
    },
    {
      title: "Global Connectivity",
      description: "We build bridges between different markets, cultures, and communities to create a truly global FemTech ecosystem.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      )
    },
    {
      title: "Inclusive Community",
      description: "We foster an environment where diverse perspectives are welcomed and everyone can contribute to advancing women's health.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      )
    },
    {
      title: "Evidence-Based Impact",
      description: "We prioritize solutions backed by research and data, ensuring real-world impact on women's health outcomes.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Values
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            The principles that guide everything we do at FemTech Weekend.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="mb-4 rounded-lg bg-primary/10 p-3 text-primary">
                {value.icon}
              </div>
              <h3 className="mb-2 text-xl font-medium text-foreground">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Team section
function Team() {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Founder & CEO",
      bio: "Healthcare entrepreneur with 15+ years of experience in women's health innovation and investment.",
    },
    {
      name: "Michael Zhang",
      role: "Co-founder & CTO",
      bio: "Tech veteran specializing in healthcare platforms and digital health solutions for emerging markets.",
    },
    {
      name: "Dr. Li Wei",
      role: "Medical Director",
      bio: "Renowned gynecologist and researcher focused on personalized women's healthcare technologies.",
    },
    {
      name: "Emma Johnson",
      role: "Global Partnerships Lead",
      bio: "International business development expert connecting Asian and Western healthcare ecosystems.",
    }
  ];

  return (
    <div className="bg-muted/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Passionate leaders driving innovation in women's health across the globe.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Call to Action section
function CallToAction() {
  return (
    <div className="bg-background">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Join Our Mission
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Whether you're an entrepreneur, investor, or healthcare professional, there's a place for you in our community.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/blog">
              <Button size="lg">Get Involved</Button>
            </Link>
            <Link to="/database">
              <Button variant="outline" size="lg">Explore Companies</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutUs(): React.ReactNode {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <Layout
      title="About Us"
      description="Learn about FemTech Weekend's mission to advance women's health through innovation, entrepreneurship, and global collaboration.">
      <main>
        <AboutHero />
        <MissionVision />
        <Values />
        <Team />
        <CallToAction />
      </main>
    </Layout>
  );
} 