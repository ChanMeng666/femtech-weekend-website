// Showcase page related types

export interface ShowcasePageProps {
  title?: string;
  description?: string;
}

export interface ShowcaseHeaderProps {
  className?: string;
}

export interface ShowcaseLayoutProps {
  children?: React.ReactNode;
}

export interface ShowcaseTranslation {
  id: string;
  message: string;
}

export type ShowcaseConstants = {
  readonly TITLE_ID: string;
  readonly DESCRIPTION_ID: string;
  readonly DEFAULT_TITLE: string;
  readonly DEFAULT_DESCRIPTION: string;
}; 