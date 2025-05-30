import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { competitionCategories, eligibilityCriteria } from '../../data/competition';
import { getCompetitionCategories, getEligibilityCriteria } from '../../data/competition-i18n';
import { 
  getRequirementsTitle, 
  getRequirementsDescription, 
  getEligibilityCriteriaTitle 
} from '../../constants/competition-components';

export default function Requirements() {
  const title = getRequirementsTitle();
  const description = getRequirementsDescription();
  const eligibilityCriteriaTitle = getEligibilityCriteriaTitle();
  const categories = getCompetitionCategories();
  const criteria = getEligibilityCriteria();
  
  return (
    <div id="requirements" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {description}
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
            <CardTitle>{eligibilityCriteriaTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {criteria.map((criterion, index) => (
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