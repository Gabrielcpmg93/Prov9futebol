
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
          <h2 className="text-xl font-bold text-gray-800">Proposta de Contrato</h2>
          <p className="text-lg font-semibold text-gray-600 mt-1">{player.name}</p>
          <p className="text-sm text-gray-500">{player.age} anos | Habilidade: {player.skill} | Passe: {formatCurrency(player.value)}</p>
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
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Assinar Contrato
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractModal;
