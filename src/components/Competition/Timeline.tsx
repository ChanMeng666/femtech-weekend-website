import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { timelineEvents } from '../../data/competition';

export default function Timeline() {
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