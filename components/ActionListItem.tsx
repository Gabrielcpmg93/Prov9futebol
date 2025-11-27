
import React from 'react';
import { ArrowRightIcon } from './icons';
import type { ActionListItemData } from '../types';

const ActionListItem: React.FC<ActionListItemData> = ({ icon, bgColor, iconColor, title, subtitle, action }) => {
  return (
    <div className="bg-white rounded-2xl p-3 flex items-center shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className={`p-3 rounded-xl ${bgColor}`}>
        <div className={`w-6 h-6 ${iconColor}`}>
          {icon}
        </div>
      </div>
      <div className="ml-4 flex-grow">
        <p className="font-bold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
      <div className="ml-auto flex-shrink-0">
        {action.type === 'arrow' ? (
          <div className="bg-gray-100 rounded-full p-1.5">
            <ArrowRightIcon className="w-4 h-4 text-gray-400" />
          </div>
        ) : (
          <div className="bg-gray-100 text-gray-700 font-semibold px-2.5 py-1 rounded-lg text-sm">
            {action.value}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionListItem;
