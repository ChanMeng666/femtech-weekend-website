import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  getStatsSectionTitle,
  getStatsSectionSubtitle,
  getCountriesLabel,
  getExpertsLabel,
  getPublicationsLabel,
  getAwardsLabel
} from '../constants/stats-section';

export function StatsSection() {
  const treeSvgUrl = useBaseUrl('/img/bg/abstract-flowing-lines-and-elegant-curves-represen1.png');

  // Get translated texts
  const title = getStatsSectionTitle();
  const subtitle = getStatsSectionSubtitle();
  const countriesLabel = getCountriesLabel();
  const expertsLabel = getExpertsLabel();
  const publicationsLabel = getPublicationsLabel();
  const awardsLabel = getAwardsLabel();

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
          {/* Main Content */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
              {title}
            </h2>
            <p className="text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Countries Engaged */}
            <Card className="text-center border-primary/20 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-primary">15+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{countriesLabel}</p>
              </CardContent>
            </Card>

            {/* Expert Partners */}
            <Card className="text-center border-primary/20 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-primary">200+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{expertsLabel}</p>
              </CardContent>
            </Card>

            {/* Research Publications */}
            <Card className="text-center border-primary/20 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-primary">50+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{publicationsLabel}</p>
              </CardContent>
            </Card>

            {/* Industry Awards */}
            <Card className="text-center border-primary/20 bg-background/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-2.997 0" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-primary">10+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{awardsLabel}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
