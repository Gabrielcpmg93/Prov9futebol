
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

export interface GameScreenProps {
  userTeam: Team;
  opponentTeam: Team;
  onBack: () => void;
  isFriendly?: boolean;
  matchDay?: number;
  onMatchEnd?: (userScore: number, opponentScore: number) => void;
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
}

export interface PressConferenceScreenProps {
  onBack: () => void;
  lastMatch?: LastMatchContext | null;
}

export interface SquadScreenProps {
  squad: Player[];
  onBack: () => void;
}
