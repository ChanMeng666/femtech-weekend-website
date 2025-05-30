import React from 'react';
import Link from '@docusaurus/Link';
import { Card, CardContent } from '../ui/card';
import { ReportCardProps } from '../../types/reports';

interface ReportCardTagProps {
  tag: string;
  onClick: (tag: string) => void;
}

const ReportCardTag = ({ tag, onClick }: ReportCardTagProps) => (
  <span
    className="inline-block rounded bg-muted px-2 py-1 text-xs text-muted-foreground cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
    onClick={(e) => {
      e.preventDefault(); // Prevent the Link from navigating
      onClick(tag);
    }}
  >
    {tag}
  </span>
);

export function ReportCard({ report, onTagClick }: ReportCardProps): React.ReactNode {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 bg-white/50 backdrop-blur-sm">
      <Link to={report.link} className="block h-full text-decoration-none">
        <div className="aspect-[16/10] overflow-hidden rounded-t-lg bg-gradient-to-br from-primary/10 to-primary/5">
          {report.image ? (
            <img 
              src={report.image} 
              alt={report.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary/20 mb-2">
                  {report.title.split(' ')[0]}
                </div>
                <div className="text-primary/60 text-sm font-medium">
                  {report.category}
                </div>
              </div>
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="mb-3">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {report.category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {report.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {report.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span>{report.author}</span>
              <span>•</span>
              <span>{report.date}</span>
              <span>•</span>
              <span>{report.readTime}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {report.tags.slice(0, 3).map((tag, index) => (
              <ReportCardTag 
                key={index} 
                tag={tag} 
                onClick={onTagClick} 
              />
            ))}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
} 