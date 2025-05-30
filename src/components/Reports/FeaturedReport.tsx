import React from 'react';
import Link from '@docusaurus/Link';
import { Card } from '../ui/card';
import { FeaturedReportProps } from '../../types/reports';
import { getFeaturedReportLabel } from '../../constants/reports-components';

interface ReportTagProps {
  tag: string;
  onClick: (tag: string) => void;
}

const ReportTag = ({ tag, onClick }: ReportTagProps) => (
  <span
    className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary font-medium cursor-pointer hover:bg-primary/20 transition-colors"
    onClick={(e) => {
      e.preventDefault(); // Prevent the Link from navigating
      onClick(tag);
    }}
  >
    {tag}
  </span>
);

export function FeaturedReport({ report, onTagClick }: FeaturedReportProps): React.ReactNode {
  const featuredReportLabel = getFeaturedReportLabel();
  
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl border-0 bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm">
      <Link to={report.link} className="block text-decoration-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
            {report.image ? (
              <img 
                src={report.image} 
                alt={report.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/30">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary/40 mb-4">
                    {report.title.split(' ')[0]}
                  </div>
                  <div className="text-primary/70 font-medium">
                    {report.category}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
                {featuredReportLabel}
              </span>
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
              {report.title}
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {report.description}
            </p>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <span className="font-medium">{report.author}</span>
              <span className="mx-2">•</span>
              <span>{report.date}</span>
              <span className="mx-2">•</span>
              <span>{report.readTime}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {report.tags.map((tag, index) => (
                <ReportTag
                  key={index}
                  tag={tag}
                  onClick={onTagClick}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
} 