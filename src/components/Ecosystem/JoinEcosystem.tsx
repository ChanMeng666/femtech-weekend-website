import React from 'react';
import Link from '@docusaurus/Link';
import { Button } from '../ui/button';

export function JoinEcosystem() {
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