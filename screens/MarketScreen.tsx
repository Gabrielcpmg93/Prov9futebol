
import React from 'react';
import type { Player, MarketScreenProps } from '../types';

const positionColors = {
  GOL: 'bg-yellow-500',
  DEF: 'bg-blue-500',
  MEI: 'bg-green-500',
  ATA: 'bg-red-500',
};

const PlayerCard: React.FC<{ player: Player; onHire: (player: Player) => void; }> = ({ player, onHire }) => {
  const formatValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-full ${positionColors[player.position]} flex items-center justify-center font-bold text-white text-lg`}>
        {player.position}
      </div>
      <div className="flex-grow">
        <p className="font-bold text-gray-800">{player.name}</p>
        <p className="text-sm text-gray-500">Idade: {player.age} | Habilidade: {player.skill}</p>
        <p className="text-sm font-semibold text-green-700">Passe: {formatValue(player.value)}</p>
      </div>
      <button 
        onClick={() => onHire(player)}
        className="bg-green-500 text-white font-semibold py-2 px-3 rounded-lg text-sm hover:bg-green-600 transition-colors"
      >
        Contratar
      </button>
    </div>
  )
}

const MarketScreen: React.FC<MarketScreenProps> = ({ players, onBack, onUpdate, onHire }) => {
  return (
    <div className="p-4 h-full flex flex-col">
      <header className="flex items-center mb-6 relative">
        <button onClick={onBack} className="absolute left-0 text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-800 text-center flex-grow">Mercado de Transferências</h1>
      </header>
      
      <div className="mb-4">
        <button
          onClick={onUpdate}
          className="w-full bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors shadow"
        >
          Atualizar Lista de Jogadores
        </button>
      </div>

      <main className="flex-grow overflow-y-auto space-y-3">
        {players.map(player => (
          <PlayerCard key={player.id} player={player} onHire={onHire} />
        ))}
      </main>
    </div>
  );
};

export default MarketScreen;
