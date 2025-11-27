
import React, { useState } from 'react';
import { HomeIcon, SocialIcon, PlayIcon, UsersIcon, MarketIcon } from './icons';
import type { NavItem } from '../types';

const NavItemComponent: React.FC<{ item: NavItem; isActive: boolean; onClick: () => void }> = ({ item, isActive, onClick }) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-center space-y-1 w-16 transition-colors duration-200">
      <div className={`w-6 h-6 ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
        {item.icon(isActive)}
      </div>
      <span className={`text-xs font-medium ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
        {item.label}
      </span>
    </button>
  );
};

const BottomNavBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems: NavItem[] = [
    { icon: (isActive) => <HomeIcon filled={isActive} />, label: 'Início' },
    { icon: () => <SocialIcon />, label: 'Social' },
    { icon: () => <PlayIcon />, label: 'Jogar' },
    { icon: () => <UsersIcon />, label: 'Elenco' },
    { icon: () => <MarketIcon />, label: 'Mercado' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item, index) => (
          <NavItemComponent
            key={index}
            item={item}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomNavBar;
