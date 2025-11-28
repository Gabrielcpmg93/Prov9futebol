
import React from 'react';
import type { GameMenuScreenProps } from '../types';

const GameMenuScreen: React.FC<GameMenuScreenProps> = ({ onStartMatch, isFriendlyMatchAvailable, onStartFriendlyMatch }) => {
  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Menu de Jogo</h1>
      <div className="flex flex-col items-center w-full max-w-xs">
        <button
          onClick={onStartMatch}
          className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition-colors shadow-md mb-4"
        >
          Próxima Partida 2D
        </button>
        <button
          onClick={onStartFriendlyMatch}
          disabled={!isFriendlyMatchAvailable}
          className="w-full bg-sky-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-sky-600 transition-colors shadow-md disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Partida Amistosa
        </button>
        {!isFriendlyMatchAvailable && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Agende um amistoso no Calendário (tela de Início) para habilitar.
          </p>
        )}
      </div>
    </div>
  );
};

export default GameMenuScreen;
