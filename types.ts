
export enum SessionStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export type ResourceType = 'book' | 'article' | 'poem' | 'podcast';
export type UserTier = 'guest' | 'member';

export interface Badge {
  id: string;
  label: string;
  icon: string;
  description: string;
  unlockedAt?: string;
}

export interface BookRecommendation {
  title: string;
  author: string;
  description: string;
  whyThisBook: string;
  journalPrompts: string[];
  type: ResourceType;
  tags: string[];
}

export interface ConversationTurn {
  role: 'user' | 'ai';
  text: string;
}

export interface SessionRecord {
  id: string;
  date: string;
  transcript: ConversationTurn[];
  summary: string;
  recommendations: BookRecommendation[];
  professionalNote?: string;
  pointsEarned: number;
}

export interface UserProfile {
  name: string;
  email: string;
  tier: UserTier;
  history: SessionRecord[];
  badges: Badge[];
  streak: number;
  points: number;
  level: number;
  lastActiveDate?: string;
}

export interface Course {
  id: string;
  title: string;
  modules: number;
  completedModules: number;
  description: string;
  pointsAwarded: number;
}

export interface EducationalItem {
  id: string;
  type: 'infographic' | 'essay' | 'quote' | 'quiz';
  title: string;
  content: string;
  category: string;
}

export interface BookClub {
  id: string;
  name: string;
  currentBook: string;
  memberCount: number;
}
