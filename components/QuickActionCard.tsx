
import React from 'react';
import type { QuickActionCardData } from '../types';

const QuickActionCard: React.FC<QuickActionCardData> = ({ icon, bgColor, iconColor, title }) => {
  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer aspect-square">
      <div className={`p-3 rounded-xl ${bgColor}`}>
        <div className={`w-6 h-6 ${iconColor}`}>
            {icon}
        </div>
      </div>
      <p className="mt-3 font-semibold text-gray-800 text-center text-sm">{title}</p>
    </div>
  );
};

export default QuickActionCard;
