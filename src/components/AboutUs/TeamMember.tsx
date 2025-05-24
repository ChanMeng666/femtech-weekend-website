import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';

export interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
}

export function TeamMember({ name, role, bio, image, linkedin }: TeamMemberProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Generate a placeholder image URL based on the name
  const getPlaceholderImage = (name: string) => {
    const seed = name.replace(/\s+/g, '').toLowerCase();
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=f3f4f6`;
  };

  return (
    <>
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-24 w-24 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40">
            <img 
              src={image || getPlaceholderImage(name)} 
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
          <CardTitle className="text-xl">{name}</CardTitle>
          <p className="text-primary font-medium">{role}</p>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setIsModalOpen(true)}
          >
            Read Bio
          </Button>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={name}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 flex-shrink-0">
              <img 
                src={image || getPlaceholderImage(name)} 
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              <p className="text-primary font-medium">{role}</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">{bio}</p>
          {linkedin && (
            <div className="pt-4">
              <a 
                href={linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn Profile</span>
              </a>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
} 