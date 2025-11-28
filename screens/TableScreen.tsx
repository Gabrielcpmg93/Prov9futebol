
import React from 'react';
import type { TableEntry } from '../types';

interface TableScreenProps {
  table: TableEntry[];
  onBack: () => void;
}

const TableScreen: React.FC<TableScreenProps> = ({ table, onBack }) => {
  const sortedTable = [...table].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return b.goalDifference - a.goalDifference;
  });

  return (
    <div className="p-4 h-full">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-800">Tabela - Brasileirão Série A</h1>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-2 py-3 text-center">#</th>
              <th scope="col" className="px-4 py-3">Time</th>
              <th scope="col" className="px-2 py-3 text-center">P</th>
              <th scope="col" className="px-2 py-3 text-center">J</th>
              <th scope="col" className="px-2 py-3 text-center">V</th>
              <th scope="col" className="px-2 py-3 text-center">E</th>
              <th scope="col" className="px-2 py-3 text-center">D</th>
              <th scope="col" className="px-2 py-3 text-center">SG</th>
            </tr>
          </thead>
          <tbody>
            {sortedTable.map((entry, index) => (
              <tr key={entry.teamId} className="bg-white border-b hover:bg-gray-50">
                <td className="px-2 py-3 font-medium text-gray-900 text-center">{index + 1}</td>
                <td className="px-4 py-3 font-semibold text-gray-800">{entry.teamName}</td>
                <td className="px-2 py-3 font-bold text-gray-900 text-center">{entry.points}</td>
                <td className="px-2 py-3 text-center">{entry.played}</td>
                <td className="px-2 py-3 text-center">{entry.wins}</td>
                <td className="px-2 py-3 text-center">{entry.draws}</td>
                <td className="px-2 py-3 text-center">{entry.losses}</td>
                <td className="px-2 py-3 text-center">{entry.goalDifference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableScreen;
