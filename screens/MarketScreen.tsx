
import React, { useState, useMemo } from 'react';
import type { Player, MarketScreenProps } from '../types';
import ContractModal from '../components/ContractModal';

const positionColors = {
  GOL: 'border-yellow-500 text-yellow-600 bg-yellow-100',
  DEF: 'border-blue-500 text-blue-600 bg-blue-100',
  MEI: 'border-green-500 text-green-600 bg-green-100',
  ATA: 'border-red-500 text-red-600 bg-red-100',
};

const PlayerCard: React.FC<{ player: Player; onHireClick: (player: Player) => void; }> = ({ player, onHireClick }) => {
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  return (
    <div className="bg-white p-3 rounded-xl shadow-sm flex items-center space-x-3 border border-gray-100">
        <div className={`w-10 h-10 rounded-lg ${positionColors[player.position]} border-2 flex items-center justify-center font-bold text-sm`}>
            {player.position}
        </div>
        <div className="flex-grow">
            <p className="font-bold text-gray-800 text-sm leading-tight">{player.name}</p>
            <div className="flex space-x-2 text-xs text-gray-500 mt-0.5">
                <span>{player.age} anos</span>
                <span className="font-bold text-blue-600">OVR: {player.skill}</span>
            </div>
        </div>
        <button 
            onClick={() => onHireClick(player)}
            className="bg-gray-800 text-white font-semibold py-2 px-3 rounded-lg text-xs hover:bg-gray-900 transition-colors"
        >
            Contratar
        </button>
    </div>
  )
}

const MarketScreen: React.FC<MarketScreenProps> = ({ players, onBack, onUpdate, onHire }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [positionFilter, setPositionFilter] = useState<'ALL' | Player['position']>('ALL');

  const handleHireClick = (player: Player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };

  const handleConfirmHire = (player: Player, salary: number, contractWeeks: number) => {
    onHire(player, salary, contractWeeks);
    handleModalClose();
  };
  
  const filteredPlayers = useMemo(() => {
    if (positionFilter === 'ALL') return players;
    return players.filter(p => p.position === positionFilter);
  }, [players, positionFilter]);

  const filterButtons: ('ALL' | Player['position'])[] = ['ALL', 'GOL', 'DEF', 'MEI', 'ATA'];

  return (
    <>
      <div className="p-4 h-full flex flex-col bg-gray-50">
        <header className="flex items-center mb-4 relative">
          <button onClick={onBack} className="absolute left-0 text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Mercado</h1>
        </header>
        
        <div className="mb-4">
          <button
            onClick={onUpdate}
            className="w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors shadow"
          >
            Atualizar Olheiro
          </button>
        </div>

        <div className="mb-4 flex justify-center space-x-2 bg-gray-200 p-1 rounded-lg">
          {filterButtons.map(pos => (
            <button
              key={pos}
              onClick={() => setPositionFilter(pos)}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${
                positionFilter === pos ? 'bg-white text-gray-800 shadow-sm' : 'bg-transparent text-gray-500'
              }`}
            >
              {pos === 'ALL' ? 'Todos' : pos}
            </button>
          ))}
        </div>

        <main className="flex-grow overflow-y-auto space-y-2">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map(player => (
              <PlayerCard key={player.id} player={player} onHireClick={handleHireClick} />
            ))
          ) : (
            <div className="text-center text-gray-400 pt-16">
              <p>Nenhum jogador encontrado para esta posição.</p>
            </div>
          )}
        </main>
      </div>

      {isModalOpen && selectedPlayer && (
        <ContractModal 
          player={selectedPlayer}
          onClose={handleModalClose}
          onConfirm={handleConfirmHire}
        />
      )}
    </>
  );
};

export default MarketScreen;
