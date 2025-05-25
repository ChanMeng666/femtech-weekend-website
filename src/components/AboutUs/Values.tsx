import React from 'react';
import {
  getValuesTitle,
  getValuesSubtitle,
  getValueInnovationTitle,
  getValueInnovationDescription,
  getValueGlobalTitle,
  getValueGlobalDescription,
  getValueInclusiveTitle,
  getValueInclusiveDescription,
  getValueEvidenceTitle,
  getValueEvidenceDescription
} from '../../constants/about-us-components';

export function Values() {
  // Get translated texts
  const title = getValuesTitle();
  const subtitle = getValuesSubtitle();
  
  const values = [
    {
      title: getValueInnovationTitle(),
      description: getValueInnovationDescription(),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m4.5 0a12.052 12.052 0 0 0 3.75-.806 2.25 2.25 0 0 0 1.5-2.122 2.25 2.25 0 0 0-.78-1.69l-1.754-1.533a.25.25 0 0 0-.28-.082l-2.46 1.039a.75.75 0 0 1-.735-.117l-1.071-.857a.25.25 0 0 0-.28-.082l-2.86 1.206a.75.75 0 0 1-.884-.334l-1.044-2.088A.25.25 0 0 0 6.5 10.5H5.25a2.25 2.25 0 0 0-2.122 1.5 12.06 12.06 0 0 0 0 4.5c.06.814.412 1.582.988 2.122.575.54 1.308.878 2.122.878h1.25a.25.25 0 0 0 .218-.128l1.044-2.088a.75.75 0 0 1 .884-.334l2.86 1.206a.25.25 0 0 0 .28-.082l1.071-.857a.75.75 0 0 1 .735-.117l2.46 1.039a.25.25 0 0 0 .28-.082l1.754-1.533a2.25 2.25 0 0 0 .78-1.69 2.25 2.25 0 0 0-1.5-2.122A12.052 12.052 0 0 0 16.5 18.75Z" />
        </svg>
      )
    },
    {
      title: getValueGlobalTitle(),
      description: getValueGlobalDescription(),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      )
    },
    {
      title: getValueInclusiveTitle(),
      description: getValueInclusiveDescription(),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      )
    },
    {
      title: getValueEvidenceTitle(),
      description: getValueEvidenceDescription(),
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
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {subtitle}
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