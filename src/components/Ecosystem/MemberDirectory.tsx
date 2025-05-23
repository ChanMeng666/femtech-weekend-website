import React, { useState } from 'react';
import { Button } from '../ui/button';
import { MemberCard } from './MemberCard';
import { ecosystemMembers, categories } from '../../data/ecosystemData';

export function MemberDirectory() {
  const [activeCategory, setActiveCategory] = useState('All Members');

  // Filter members based on active category
  const filteredMembers = ecosystemMembers.filter(member => {
    if (activeCategory === 'All Members') {
      return true;
    }
    return member.category === activeCategory;
  });

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Meet Our Community
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Discover the diverse group of innovators, leaders, and changemakers driving women's health forward.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={`transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'hover:bg-primary/10 hover:text-primary hover:border-primary'
              }`}
            >
              {category}
              <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                {category === 'All Members' 
                  ? ecosystemMembers.length 
                  : ecosystemMembers.filter(m => m.category === category).length
                }
              </span>
            </Button>
          ))}
        </div>

        {/* Members Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No members found in this category. Check back soon as our community grows!
            </p>
          </div>
        )}

      </div>
    </div>
  );
} 