
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
