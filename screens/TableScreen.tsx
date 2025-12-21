
import React from 'react';
import type { TableScreenProps } from '../types';

const TableScreen: React.FC<TableScreenProps> = ({ table, onBack, userTeamId }) => {
  const sortedTable = [...table].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return b.goalDifference - a.goalDifference;
  });

  return (
    <div className="p-4 h-full bg-gray-900 text-white">
      <header className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-gray-300 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-100">Brasileirão Série A</h1>
      </header>
      <div className="overflow-x-auto bg-gray-800/50 rounded-lg shadow-lg border border-gray-700 backdrop-blur-sm">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-black/20">
            <tr>
              <th scope="col" className="px-3 py-4 text-center">#</th>
              <th scope="col" className="px-4 py-4">Clube</th>
              <th scope="col" className="px-2 py-4 text-center">P</th>
              <th scope="col" className="px-2 py-4 text-center">J</th>
              <th scope="col" className="px-2 py-4 text-center">V</th>
              <th scope="col" className="px-2 py-4 text-center">E</th>
              <th scope="col" className="px-2 py-4 text-center">D</th>
              <th scope="col" className="px-2 py-4 text-center">SG</th>
            </tr>
          </thead>
          <tbody>
            {sortedTable.map((entry, index) => {
              const isUserTeam = entry.teamId === userTeamId;
              const rank = index + 1;
              let rankColor = 'bg-gray-700';
              if (rank === 1) rankColor = 'bg-yellow-500 text-black';
              else if (rank <= 4) rankColor = 'bg-blue-600';
              else if (rank >= sortedTable.length - 3) rankColor = 'bg-red-600';
              
              return (
                <tr key={entry.teamId} className={`border-b border-gray-700/50 ${isUserTeam ? 'bg-green-500/10' : ''}`}>
                  <td className="px-2 py-4 font-medium text-center">
                    <span className={`inline-block w-6 h-6 leading-6 rounded-md text-xs font-bold ${rankColor}`}>
                        {rank}
                    </span>
                  </td>
                  <td className={`px-4 py-4 font-semibold whitespace-nowrap ${isUserTeam ? 'text-green-400' : 'text-gray-100'}`}>{entry.teamName}</td>
                  <td className="px-2 py-4 font-bold text-white text-center">{entry.points}</td>
                  <td className="px-2 py-4 text-center">{entry.played}</td>
                  <td className="px-2 py-4 text-center text-green-400">{entry.wins}</td>
                  <td className="px-2 py-4 text-center text-yellow-400">{entry.draws}</td>
                  <td className="px-2 py-4 text-center text-red-400">{entry.losses}</td>
                  <td className="px-2 py-4 text-center font-semibold">{entry.goalDifference}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
       <div className="mt-4 p-2 bg-gray-800/50 rounded-lg border border-gray-700 text-xs text-gray-400 flex items-center justify-center space-x-4">
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-600 mr-2"></span><span>Libertadores</span></div>
            <div className="flex items-center"><span className="w-3 h-3 rounded-full bg-red-600 mr-2"></span><span>Rebaixamento</span></div>
        </div>
    </div>
  );
};

export default TableScreen;
