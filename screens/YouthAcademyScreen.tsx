
import React, { useState } from 'react';
import type { Player } from '../types';
import ContractModal from '../components/ContractModal';

interface YouthAcademyScreenProps {
  players: Player[];
  onBack: () => void;
  onHire: (player: Player, salary: number, contractWeeks: number) => void;
}

const positionColors = {
  GOL: 'bg-yellow-500',
  DEF: 'bg-blue-500',
  MEI: 'bg-green-500',
  ATA: 'bg-red-500',
};

const YouthPlayerCard: React.FC<{ player: Player; onHireClick: (player: Player) => void; }> = ({ player, onHireClick }) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-4 border border-gray-100">
      <div className={`w-12 h-12 rounded-full ${positionColors[player.position]} flex items-center justify-center font-bold text-white text-lg ring-2 ring-offset-1 ring-gray-100`}>
        {player.position}
      </div>
      <div className="flex-grow">
        <p className="font-bold text-gray-800">{player.name}</p>
        <div className="flex space-x-3 text-sm text-gray-500">
             <span>{player.age} anos</span>
             <span>•</span>
             <span>Hab: <span className="font-semibold text-blue-600">{player.skill}</span></span>
        </div>
      </div>
      <button 
        onClick={() => onHireClick(player)}
        className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-indigo-600 transition-colors shadow-sm"
      >
        Contratar
      </button>
    </div>
  )
}

const YouthAcademyScreen: React.FC<YouthAcademyScreenProps> = ({ players, onBack, onHire }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

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

  return (
    <>
      <div className="p-4 h-full flex flex-col bg-slate-50">
        <header className="flex items-center mb-6 relative">
          <button onClick={onBack} className="absolute left-0 text-gray-600 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Categorias de Base</h1>
        </header>
        
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-4 text-sm text-blue-800">
            <p><strong>Observação do Olheiro:</strong> Aqui você encontra jogadores disponíveis entre 17 e 29 anos prontos para compor o elenco.</p>
        </div>

        <main className="flex-grow overflow-y-auto space-y-3">
          {players.map(player => (
            <YouthPlayerCard key={player.id} player={player} onHireClick={handleHireClick} />
          ))}
          {players.length === 0 && (
              <div className="text-center mt-10 text-gray-400">
                  <p>Nenhum jogador disponível no momento.</p>
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

export default YouthAcademyScreen;
