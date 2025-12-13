
import React, { useState } from 'react';
import type { Player, SquadScreenProps } from '../types';
import PlayerStatsModal from '../components/PlayerStatsModal';

const positionColors = {
  GOL: 'bg-yellow-500',
  DEF: 'bg-blue-500',
  MEI: 'bg-green-500',
  ATA: 'bg-red-500',
};

const SquadPlayerCard: React.FC<{ player: Player; onClick: () => void; }> = ({ player, onClick }) => {
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  return (
    <button onClick={onClick} className="w-full text-left bg-white p-3 rounded-lg shadow-sm flex items-center space-x-4 transition-transform active:scale-[0.98] hover:shadow-md">
      <div className={`w-12 h-12 rounded-full ${positionColors[player.position]} flex items-center justify-center font-bold text-white text-lg`}>
        {player.position}
      </div>
      <div className="flex-grow">
        <p className="font-bold text-gray-800">{player.name}</p>
        <p className="text-sm text-gray-500">Idade: {player.age} | Habilidade: {player.skill}</p>
        <div className="flex space-x-4 mt-1">
          <p className="text-xs font-semibold text-green-700">Salário: {formatValue(player.salary || 0)}</p>
          <p className="text-xs font-semibold text-gray-600">Contrato: {player.contractWeeks} sem.</p>
        </div>
      </div>
    </button>
  )
}

const SquadScreen: React.FC<SquadScreenProps> = ({ squad, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handlePlayerClick = (player: Player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };
  
  return (
    <>
      <div className="p-4 h-full flex flex-col">
        <header className="flex items-center mb-6 relative">
          <button onClick={onBack} className="absolute left-0 text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Meu Elenco</h1>
        </header>

        <main className="flex-grow overflow-y-auto space-y-3">
          {squad.map(player => (
            <SquadPlayerCard key={player.id} player={player} onClick={() => handlePlayerClick(player)} />
          ))}
          {squad.length === 0 && (
              <div className="text-center text-gray-500 mt-20">
                  <h2 className="text-lg font-semibold">Elenco Vazio</h2>
                  <p>Vá ao mercado para contratar jogadores!</p>
              </div>
          )}
        </main>
      </div>

      {isModalOpen && selectedPlayer && (
        <PlayerStatsModal player={selectedPlayer} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default SquadScreen;
