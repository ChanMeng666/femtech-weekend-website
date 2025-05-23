import React from 'react';
import Link from '@docusaurus/Link';
import { Button } from '../ui/button';

export function CallToAction() {
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