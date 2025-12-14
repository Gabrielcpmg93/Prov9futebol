
import React, { useState } from 'react';
import type { Player } from '../types';

interface ContractModalProps {
  player: Player;
  onClose: () => void;
  onConfirm: (player: Player, salary: number, contractWeeks: number) => void;
}

const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const ContractModal: React.FC<ContractModalProps> = ({ player, onClose, onConfirm }) => {
  const suggestedSalary = Math.round((player.value / 100) / 50) * 50;
  const [salary, setSalary] = useState(suggestedSalary);
  const [contractWeeks, setContractWeeks] = useState(52); // Default 1 year

  const minSalary = Math.round((suggestedSalary * 0.75) / 50) * 50;
  const maxSalary = Math.round((suggestedSalary * 1.5) / 50) * 50;

  const handleConfirm = () => {
    onConfirm(player, salary, contractWeeks);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-gray-100 rounded-full mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800">Conversa com Empresário</h2>
          <p className="text-sm text-gray-500 mt-1">Negociando: <span className="font-semibold text-gray-700">{player.name}</span></p>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-baseline mb-2">
                <label className="font-semibold text-gray-700">Salário Semanal</label>
                <span className="font-bold text-green-600 text-lg">{formatCurrency(salary)}</span>
            </div>
            <input 
              type="range"
              min={minSalary}
              max={maxSalary}
              step={50}
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>
          <div>
            <div className="flex justify-between items-baseline mb-2">
                <label className="font-semibold text-gray-700">Duração do Contrato</label>
                <span className="font-bold text-gray-800 text-lg">{contractWeeks} semanas</span>
            </div>
            <input 
              type="range"
              min="12"
              max="156"
              step="1"
              value={contractWeeks}
              onChange={(e) => setContractWeeks(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Encerrar
          </button>
          <button
            onClick={handleConfirm}
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
          >
            Contratar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractModal;
