import React, { useEffect } from 'react';
import type { TeamMemberData } from '../../data/team-members';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface TeamMemberModalProps {
  member: TeamMemberData | null;
  onClose: () => void;
}

export function TeamMemberModal({ member, onClose }: TeamMemberModalProps) {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const locale = currentLocale === 'zh-Hans' ? 'zh' : 'en';

  useEffect(() => {
    if (!member) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [member, onClose]);

  if (!member) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getPlaceholderImage = (name: string) => {
    const seed = name.replace(/\s+/g, '').toLowerCase();
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=f3f4f6`;
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6 space-y-6">
          {/* Header with close button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground p-2 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Photo + Name + Role */}
          <div className="flex flex-col items-center text-center">
            <div className="h-40 w-40 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/40 mb-4">
              <img
                src={member.image || getPlaceholderImage(member.name)}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="font-display text-2xl text-foreground">{member.name}</h3>
            <p className="text-primary mt-1">{member.role[locale]}</p>
          </div>

          {/* Bio */}
          <div className="border-t border-border pt-4">
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {member.bio[locale]}
            </p>
          </div>

          {/* LinkedIn link */}
          {member.linkedin && (
            <div className="border-t border-border pt-4">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors text-sm"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
