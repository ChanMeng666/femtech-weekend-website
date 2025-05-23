import React from 'react';
import { Testimonial, TestimonialGrid } from './Testimonial';
import { testimonialsData } from '../data';

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  title = "What Our Community Says",
  subtitle = "Hear from entrepreneurs, investors, and healthcare professionals who are part of our growing ecosystem.",
  className = ""
}) => {
  return (
    <div className={`bg-background py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {subtitle}
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-7xl">
          <TestimonialGrid>
            {testimonialsData.map((testimonial, index) => (
              <Testimonial 
                key={`${testimonial.author}-${index}`}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
              />
            ))}
          </TestimonialGrid>
        </div>
      </div>
    </div>
  );
}; 