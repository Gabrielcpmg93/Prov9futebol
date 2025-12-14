
import type { ReactElement } from 'react';

export type ActionType = { type: 'arrow' } | { type: 'badge'; value: string };

export interface ActionListItemData {
  icon: ReactElement;
  bgColor: string;
  iconColor: string;
  title: string;
  subtitle: string;
  action: ActionType;
  onClick?: () => void;
}

export interface QuickActionCardData {
  icon: ReactElement;
  bgColor: string;
  iconColor: string;
  title: string;
  onClick?: () => void;
}

export interface NavItem {
    icon: (isActive: boolean) => ReactElement;
    label: string;
}

export interface Team {
  id: string;
  name: string;
  logo: string; 
}

export interface Player {
  id: string;
  name: string;
  age: number;
  position: 'GOL' | 'DEF' | 'MEI' | 'ATA';
  skill: number;
  value: number;
  salary?: number;
  contractWeeks?: number;
}

export interface CareerPlayer {
  name: string;
  position: 'GOL' | 'DEF' | 'MEI' | 'ATA';
  teamId: string | null;
  teamName: string | null;
  goals: number;
  assists: number;
  matchesPlayed: number;
  totalSeasonMatches: number; // 89
}

export interface NewsArticle {
  matchDay: number;
  headline: string;
  userTeamName: string;
  opponentTeamName: string;
  userScore: number;
  opponentScore: number;
}

export interface TableEntry {
  teamId: string;
  teamName: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface Trophy {
  id: string;
  name: string;
  year: number;
  dateEarned: string;
}

export interface GameScreenProps {
  userTeam: Team;
  opponentTeam: Team;
  onBack: () => void;
  isFriendly?: boolean;
  matchDay?: number;
  onMatchEnd?: () => void;
  isCareerMode?: boolean; // New flag for visual indication
}

export interface TableScreenProps {
  table: TableEntry[];
  onBack: () => void;
  userTeamId: string;
}

export interface GameMenuScreenProps {
  onStartMatch: () => void;
  isFriendlyMatchAvailable: boolean;
  onStartFriendlyMatch: () => void;
}

export interface CalendarScreenProps {
  onBack: () => void;
  onSchedule: () => void;
}

export interface MarketScreenProps {
  players: Player[];
  onBack: () => void;
  onUpdate: () => void;
  onHire: (player: Player, salary: number, contractWeeks: number) => void;
}

export interface LastMatchContext {
  userScore: number;
  opponentScore: number;
  opponentName: string;
  isFriendly: boolean;
  result: 'win' | 'loss' | 'draw';
}

export interface PressConferenceScreenProps {
  onBack: () => void;
  lastMatch?: LastMatchContext | null;
}

export interface SquadScreenProps {
  squad: Player[];
  onBack: () => void;
}

export interface TrophyRoomScreenProps {
  trophies: Trophy[];
  onBack: () => void;
}

export interface CareerCreationScreenProps {
  onBack: () => void;
  onCreate: (name: string, position: CareerPlayer['position']) => void;
}

export interface CareerOfferScreenProps {
  offers: Team[];
  onSelectTeam: (team: Team) => void;
}

export interface CareerMenuScreenProps {
  player: CareerPlayer;
  onPlayMatch: () => void;
  onExit: () => void;
}

// --- Social Media Types ---
export type SocialAuthorType = 'player' | 'press' | 'fan' | 'agent' | 'club';
export type ReplyTone = 'aggressive' | 'diplomatic' | 'evasive' | 'motivational';
export type ConsequenceType = 'morale' | 'fan_approval' | 'board_confidence';

export interface Consequence {
    type: ConsequenceType;
    change: number; // e.g., +10, -5
    feedback: string;
}

export interface ReplyOption {
    text: string;
    tone: ReplyTone;
    consequence: Consequence;
    authorReply: string; // The text the author will reply with
}

export interface SocialPost {
    id: string;
    authorName: string;
    authorHandle: string;
    authorType: SocialAuthorType;
    content: string;
    timestamp: string;
    likes: number;
    isLiked: boolean; // New
    reposts: number;
    isInteractive: boolean;
    replyOptions?: ReplyOption[];
    
    // Conversation State
    userComment?: string;
    authorResponse?: string;
}

export interface FutGramPost {
  id: string;
  authorName: string;
  imageUrl: string;
  caption: string;
  likes: number;
  isLiked: boolean;
  commentsCount: number;
  userComment?: string;
}

export interface SocialScreenProps {
    feed: SocialPost[];
    futGramFeed: FutGramPost[];
    onReply: (postId: string, option: ReplyOption) => void;
    onLike: (app: 'Twitta' | 'FutGram', postId: string) => void;
    onFutGramComment: (postId: string, comment: string) => void;
}
