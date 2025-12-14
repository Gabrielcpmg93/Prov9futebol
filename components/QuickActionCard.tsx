
import React from 'react';
import type { QuickActionCardData } from '../types';

const QuickActionCard: React.FC<QuickActionCardData> = ({ icon, bgColor, iconColor, title, onClick }) => {
  return (
    <button onClick={onClick} className="w-full bg-white rounded-xl p-2 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className={`p-2 rounded-lg ${bgColor}`}>
        <div className={`w-5 h-5 ${iconColor}`}>
            {icon}
        </div>
      </div>
      <p className="mt-1 font-semibold text-gray-800 text-center text-xs">{title}</p>
    </button>
  );
};

export default QuickActionCard;
