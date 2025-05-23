export interface EcosystemMember {
  id: string;
  name: string;
  role: string;
  company?: string;
  bio: string;
  category: string;
  location?: string;
  image?: string;
  website?: string;
  linkedin?: string;
  expertise?: string[];
  achievements?: string;
}

export interface StatItem {
  value: string;
  label: string;
} 