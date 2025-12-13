
import React from 'react';
import type { Player } from '../types';

interface PlayerStatsModalProps {
  player: Player;
  onClose: () => void;
}

const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const positionColors = {
  GOL: 'bg-yellow-500',
  DEF: 'bg-blue-500',
  MEI: 'bg-green-500',
  ATA: 'bg-red-500',
};

const StatItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="flex justify-between items-baseline py-3 border-b border-gray-200">
        <span className="text-sm text-gray-500 uppercase tracking-wider">{label}</span>
        <span className="font-bold text-gray-800">{value}</span>
    </div>
);


const PlayerStatsModal: React.FC<PlayerStatsModalProps> = ({ player, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="text-center mb-6">
          <div className={`mx-auto w-16 h-16 rounded-full ${positionColors[player.position]} flex items-center justify-center font-bold text-white text-2xl mb-3 border-4 border-white shadow-md`}>
            {player.position}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{player.name}</h2>
          <p className="text-md text-gray-500">{player.age} anos</p>
        </header>
        
        <main className="space-y-1">
            <StatItem label="Habilidade" value={player.skill} />
            <StatItem label="Valor de Mercado" value={formatCurrency(player.value)} />
            <StatItem label="Salário Semanal" value={formatCurrency(player.salary || 0)} />
            <StatItem label="Contrato (Semanas)" value={player.contractWeeks || 0} />
        </main>

        <footer className="mt-8">
          <button
            onClick={onClose}
            className="w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Fechar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PlayerStatsModal;
