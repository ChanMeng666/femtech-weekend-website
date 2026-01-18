import React, { useState } from 'react';
import { Button } from '../ui/button';
import { MemberCard } from './MemberCard';
import { ecosystemMembers, categories } from '../../data/ecosystemData';
import { translate } from '@docusaurus/Translate';

export function MemberDirectory() {
  const title = translate({
    id: 'ecosystem.directory.title',
    message: 'Meet Our Community'
  });
  
  const description = translate({
    id: 'ecosystem.directory.description',
    message: 'Discover the diverse group of innovators, leaders, and changemakers driving women\'s health forward.'
  });
  
  const noMembersText = translate({
    id: 'ecosystem.directory.noMembers',
    message: 'No members found in this category. Check back soon as our community grows!'
  });
  
  const allMembersText = translate({
    id: 'ecosystem.directory.allMembers',
    message: 'All Members'
  });
  
  // Function to translate category names
  const translateCategory = (category: string) => {
    if (category === 'All Members') {
      return allMembersText;
    } else if (category === 'FemTech founders (Mainland China)') {
      return translate({
        id: 'ecosystem.directory.category.femtechFoundersChina',
        message: 'FemTech founders (Mainland China)'
      });
    } else if (category === 'FemTech founders (International)') {
      return translate({
        id: 'ecosystem.directory.category.femtechFoundersInternational',
        message: 'FemTech founders (International)'
      });
    } else if (category === 'Investors') {
      return translate({
        id: 'ecosystem.directory.category.investors',
        message: 'Investors'
      });
    } else if (category === 'Corporates') {
      return translate({
        id: 'ecosystem.directory.category.corporates',
        message: 'Corporates'
      });
    } else if (category === 'Academia') {
      return translate({
        id: 'ecosystem.directory.category.academia',
        message: 'Academia'
      });
    } else if (category === 'FemTech enthusiasts') {
      return translate({
        id: 'ecosystem.directory.category.femtechEnthusiasts',
        message: 'FemTech enthusiasts'
      });
    }
    return category;
  };
  
  const [activeCategory, setActiveCategory] = useState(allMembersText);
  const [originalActiveCategory, setOriginalActiveCategory] = useState('All Members');

  // Filter members based on active category - use original category for filtering
  const filteredMembers = ecosystemMembers.filter(member => {
    if (originalActiveCategory === 'All Members') {
      return true;
    }
    return member.category === originalActiveCategory;
  });

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setOriginalActiveCategory(category);
    setActiveCategory(translateCategory(category));
  };

  return (
    <div className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={originalActiveCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className={`transition-all duration-300 ${
                originalActiveCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'hover:bg-primary/10 hover:text-primary hover:border-primary'
              }`}
            >
              {translateCategory(category)}
              <span className={`ml-2 text-xs px-2 py-1 ${
                originalActiveCategory === category
                  ? 'bg-white/20 text-white font-medium'
                  : 'bg-primary/20 text-primary'
              }`}>
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
              {noMembersText}
            </p>
          </div>
        )}

      </div>
    </div>
  );
} 