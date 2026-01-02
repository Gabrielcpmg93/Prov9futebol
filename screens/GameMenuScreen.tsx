
import React from 'react';
import type { GameMenuScreenProps } from '../types';

const GameMenuScreen: React.FC<GameMenuScreenProps> = ({ onStartMatch, isFriendlyMatchAvailable, onStartFriendlyMatch, onStart3dMatch }) => {
  return (
    <div className="p-4 flex flex-col items-center justify-center h-full bg-gray-50">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800">Central de Partidas</h1>
        <p className="text-gray-500 mt-1">Escolha o próximo desafio</p>
      </div>

      <div className="flex flex-col items-center w-full max-w-xs space-y-4">
        <button
          onClick={onStartMatch}
          className="w-full bg-green-500 text-white font-bold py-4 px-6 rounded-xl text-lg hover:bg-green-600 transition-transform transform hover:scale-105 shadow-lg"
        >
          Jogar Partida 2D
        </button>
        
        <button
          onClick={onStart3dMatch}
          className="w-full bg-indigo-500 text-white font-bold py-4 px-6 rounded-xl text-lg hover:bg-indigo-600 transition-transform transform hover:scale-105 shadow-lg"
        >
          Jogar Partida 3D
        </button>

        <div className="w-full">
            <button
              onClick={onStartFriendlyMatch}
              disabled={!isFriendlyMatchAvailable}
              className="w-full bg-sky-500 text-white font-bold py-3 px-6 rounded-xl text-md hover:bg-sky-600 transition-colors shadow-lg disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Partida Amistosa
            </button>
            {!isFriendlyMatchAvailable && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                Agende um amistoso no Calendário para habilitar.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default GameMenuScreen;
