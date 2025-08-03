export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface PresetQuestion {
  id: string;
  question: string;
  category: 'about' | 'competition' | 'ecosystem' | 'research' | 'general';
  answer?: string;
}