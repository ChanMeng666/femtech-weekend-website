import React from 'react';
import Link from '@docusaurus/Link';
import { Button } from '../ui/button';

export default function CompetitionHero() {
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