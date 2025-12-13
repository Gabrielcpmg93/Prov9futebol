
import React from 'react';
import type { Team } from '../types';

interface TeamSelectionScreenProps {
  teams: Team[];
  onSelectTeam: (team: Team) => void;
}

const TeamSelectionScreen: React.FC<TeamSelectionScreenProps> = ({ teams, onSelectTeam }) => {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-100 font-sans p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 my-6">Escolha seu Time</h1>
      <div className="flex-grow overflow-y-auto space-y-3">
        {teams.map((team) => (
          <div key={team.id} className="bg-white rounded-2xl p-4 flex items-center shadow-md">
            <span className="font-semibold text-lg text-gray-700 flex-grow">{team.name}</span>
            <button
              onClick={() => onSelectTeam(team)}
              className="bg-green-500 text-white font-semibold py-1 px-3 text-sm rounded-lg hover:bg-green-600 transition-colors"
            >
              Selecionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSelectionScreen;
