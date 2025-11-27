import React from 'react';

interface GameMenuScreenProps {
  onStartMatch: () => void;
}

const GameMenuScreen: React.FC<GameMenuScreenProps> = ({ onStartMatch }) => {
  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Menu de Jogo</h1>
      <button
        onClick={onStartMatch}
        className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition-colors shadow-md"
      >
        Assistir partida 2D
      </button>
    </div>
  );
};

export default GameMenuScreen;
