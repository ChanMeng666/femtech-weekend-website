import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { prizes, specialAwards } from '../../data/competition';

export default function Prizes() {
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