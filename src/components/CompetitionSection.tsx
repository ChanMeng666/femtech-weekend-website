import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

export function CompetitionSection() {
  const treeSvgUrl = useBaseUrl('/img/bg/abstract-flowing-lines-and-elegant-curves-represen1.png');
  
  return (
    <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-24 sm:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="w-full h-full flex items-center justify-center opacity-15"
          style={{
            overflow: 'hidden',
          }}
        >
          <img 
            src={treeSvgUrl} 
            alt="Background pattern" 
            className="max-w-full max-h-full object-contain"
            style={{
              filter: 'blur(1px)',
            }}
          />
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary animate-pulse">
              🏆 Competition Now Live
            </span>
          </div>

          {/* Main Content */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
              FemTech Weekend Competition 2024
            </h2>
            <p className="text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Join China's premier women's health innovation competition. Showcase your breakthrough solutions, 
              connect with top investors, and win up to ¥500K in prizes.
            </p>
          </div>

          {/* Competition Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center border-primary/20 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-primary">¥500K</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Total Prize Pool</p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-primary">50+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Participating Teams</p>
              </CardContent>
            </Card>

            <Card className="text-center border-primary/20 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-primary">20+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Investment Partners</p>
              </CardContent>
            </Card>
          </div>

          {/* Key Dates */}
          <div className="bg-background/90 backdrop-blur-sm rounded-xl p-6 mb-8 border border-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 rounded-full bg-primary animate-pulse"></div>
                <div>
                  <p className="font-medium text-foreground">Registration Open</p>
                  <p className="text-sm text-muted-foreground">Until February 28, 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 rounded-full bg-muted"></div>
                <div>
                  <p className="font-medium text-foreground">Final Event</p>
                  <p className="text-sm text-muted-foreground">April 20-21, 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/competition">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg">
                  🚀 Join Competition
                </Button>
              </Link>
              <Link to="/competition#timeline">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <p className="mt-4 text-sm text-muted-foreground">
              Free to participate • Expert mentorship included • Investor access guaranteed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 