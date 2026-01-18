import React from 'react';
import Link from '@docusaurus/Link';
import { Card, CardContent } from '../ui/card';
import { InsightCardProps } from '../../types/insights';

interface InsightCardTagProps {
  tag: string;
  onClick: (tag: string) => void;
}

const InsightCardTag = ({ tag, onClick }: InsightCardTagProps) => (
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

export function InsightCard({ insight, onTagClick }: InsightCardProps): React.ReactNode {
  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 bg-white/50 backdrop-blur-sm">
      <Link to={insight.link} className="block h-full text-decoration-none">
        <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
          {insight.image ? (
            <img
              src={insight.image}
              alt={insight.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary/20 mb-2">
                  {insight.title.split(' ')[0]}
                </div>
                <div className="text-primary/60 text-sm font-medium">
                  {insight.category}
                </div>
              </div>
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="mb-3">
            <span className="inline-block bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {insight.category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
            {insight.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {insight.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span>{insight.author}</span>
              <span>•</span>
              <span>{insight.date}</span>
              <span>•</span>
              <span>{insight.readTime}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-3">
            {insight.tags.slice(0, 3).map((tag, index) => (
              <InsightCardTag
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
