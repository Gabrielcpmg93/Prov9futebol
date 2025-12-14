
import React from 'react';
import type { CopaTeamSelectionScreenProps, Team } from '../types';

const CopaTeamSelectionScreen: React.FC<CopaTeamSelectionScreenProps> = ({ teams, onSelectTeam, onBack }) => {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gradient-to-b from-blue-900 to-gray-900 font-sans p-4">
      <header className="flex items-center mb-6 relative">
        <button onClick={onBack} className="absolute left-0 text-white hover:text-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-grow text-center">
            <h1 className="text-2xl font-bold text-yellow-400">Copa das Américas</h1>
            <p className="text-sm text-gray-300">Escolha seu representante</p>
        </div>
      </header>
      <div className="flex-grow overflow-y-auto space-y-3">
        {teams.map((team) => (
          <div key={team.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 flex items-center shadow-lg">
            <span className="font-semibold text-lg text-white flex-grow">{team.name}</span>
            <button
              onClick={() => onSelectTeam(team)}
              className="bg-yellow-500 text-black font-bold py-2 px-4 text-sm rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Confirmar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CopaTeamSelectionScreen;
