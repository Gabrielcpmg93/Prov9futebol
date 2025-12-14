
import React from 'react';
import { HomeIcon, SocialIcon, PlayIcon, UsersIcon, MarketIcon } from './icons';
import type { NavItem } from '../types';

const NavItemComponent: React.FC<{ item: NavItem; isActive: boolean; onClick: () => void }> = ({ item, isActive, onClick }) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center w-14 py-1 transition-colors duration-200">
      <div className={`w-5 h-5 ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
        {item.icon(isActive)}
      </div>
      <span className={`text-[10px] mt-0.5 font-medium leading-none ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
        {item.label}
      </span>
    </button>
  );
};

interface BottomNavBarProps {
    activeLabel: string;
    onNavigate: (label: string) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeLabel, onNavigate }) => {

  const navItems: NavItem[] = [
    { icon: (isActive) => <HomeIcon filled={isActive} />, label: 'Início' },
    { icon: () => <SocialIcon />, label: 'Social' },
    { icon: () => <PlayIcon />, label: 'Jogar' },
    { icon: () => <UsersIcon />, label: 'Elenco' },
    { icon: () => <MarketIcon />, label: 'Mercado' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-[0_-1px_3px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-around items-center h-14">
        {navItems.map((item, index) => (
          <NavItemComponent
            key={index}
            item={item}
            isActive={activeLabel === item.label}
            onClick={() => onNavigate(item.label)}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomNavBar;
