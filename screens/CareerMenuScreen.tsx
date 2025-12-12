
import React from 'react';
import type { CareerMenuScreenProps } from '../types';

const CareerMenuScreen: React.FC<CareerMenuScreenProps> = ({ player, onPlayMatch, onExit }) => {
  const progressPercentage = (player.matchesPlayed / player.totalSeasonMatches) * 100;

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Header Info */}
      <header className="p-6 bg-gradient-to-b from-gray-800 to-gray-900 shadow-md">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-sm text-gray-400 uppercase tracking-wider">Jogador</h2>
                <h1 className="text-3xl font-bold text-yellow-400">{player.name}</h1>
                <span className="inline-block mt-1 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">{player.position}</span>
            </div>
            <div className="text-right">
                <h2 className="text-sm text-gray-400 uppercase tracking-wider">Clube Atual</h2>
                <p className="text-xl font-semibold">{player.teamName}</p>
            </div>
        </div>
      </header>

      {/* Main Stats Area */}
      <main className="flex-grow p-4 flex flex-col space-y-6">
        
        {/* Season Progress */}
        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <div className="flex justify-between text-sm mb-2 text-gray-300">
                <span>Temporada Atual</span>
                <span>{player.matchesPlayed} / {player.totalSeasonMatches} Jogos</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 p-6 rounded-xl flex flex-col items-center justify-center border border-gray-700">
                <span className="text-4xl font-bold text-white mb-1">{player.goals}</span>
                <span className="text-sm text-gray-400 uppercase">Gols</span>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl flex flex-col items-center justify-center border border-gray-700">
                <span className="text-4xl font-bold text-white mb-1">{player.assists}</span>
                <span className="text-sm text-gray-400 uppercase">Assistências</span>
            </div>
        </div>

        {/* Play Button */}
        <div className="mt-auto py-4">
            {player.matchesPlayed < player.totalSeasonMatches ? (
                <button
                    onClick={onPlayMatch}
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-extrabold py-5 rounded-2xl text-xl shadow-lg shadow-yellow-500/20 hover:scale-[1.02] transition-transform"
                >
                    JOGAR PRÓXIMA PARTIDA
                </button>
            ) : (
                <div className="text-center p-4 bg-green-900 rounded-xl border border-green-700">
                    <h2 className="text-xl font-bold text-green-300">Temporada Finalizada!</h2>
                    <p className="text-green-200">Parabéns pela jornada.</p>
                </div>
            )}
        </div>

        <button 
            onClick={onExit}
            className="w-full text-gray-500 hover:text-white py-2 text-sm"
        >
            Voltar ao Menu Principal
        </button>
      </main>
    </div>
  );
};

export default CareerMenuScreen;
