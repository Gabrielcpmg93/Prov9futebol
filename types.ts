
import type { ReactElement } from 'react';

export type ActionType = { type: 'arrow' } | { type: 'badge'; value: string };

export interface ActionListItemData {
  icon: ReactElement;
  bgColor: string;
  iconColor: string;
  title: string;
  subtitle: string;
  action: ActionType;
}

export interface QuickActionCardData {
  icon: ReactElement;
  bgColor: string;
  iconColor: string;
  title: string;
}

export interface NavItem {
    icon: (isActive: boolean) => ReactElement;
    label: string;
}
