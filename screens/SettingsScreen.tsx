
import React from 'react';
import type { SettingsScreenProps } from '../types';

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack, volume, onVolumeChange }) => {
  return (
    <div className="p-4 h-full flex flex-col bg-gray-100">
      <header className="flex items-center mb-6 relative">
        <button onClick={onBack} className="absolute left-0 text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Configurações</h1>
      </header>

      <main className="flex-grow space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="font-bold text-gray-800 mb-4">Volume da Música</h2>
            <div className="flex items-center space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => onVolumeChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                 <span className="font-semibold text-gray-700 w-12 text-center">
                    {Math.round(volume * 100)}%
                </span>
            </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsScreen;
