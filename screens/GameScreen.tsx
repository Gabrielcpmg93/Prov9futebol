
import React, { useState, useEffect } from 'react';
import type { GameScreenProps } from '../types';

const GameScreen: React.FC<GameScreenProps> = ({ userTeam, opponentTeam, onBack, matchDay, onMatchEnd, isFriendly = false }) => {
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTime(prevTime => {
        if (prevTime >= 90) {
          clearInterval(timer);
          return 90;
        }
        // Goal simulation
        if (!isFriendly && Math.random() < 0.03) {
          if (Math.random() < 0.6) { // 60% chance for user's team
            setUserScore(s => s + 1);
          } else {
            setOpponentScore(s => s + 1);
          }
        }
        return prevTime + 1;
      });
    }, 200); // Faster game time for demonstration

    return () => clearInterval(timer);
  }, [isFriendly]);

  useEffect(() => {
    if (gameTime >= 90 && !gameEnded) {
      setGameEnded(true);
      // Wait a moment for the user to see the final score
      if (!isFriendly && onMatchEnd) {
        setTimeout(() => {
          onMatchEnd(userScore, opponentScore);
        }, 2000);
      }
    }
  }, [gameTime, userScore, opponentScore, onMatchEnd, gameEnded, isFriendly]);

  const displayHalf = gameTime <= 45 ? '1º' : '2º';
  const displayMinutes = gameTime <= 45 ? gameTime : Math.min(gameTime - 45, 45);

  return (
    <div className="p-4 flex flex-col h-full bg-green-800 text-white">
      <header className="text-center mb-4 relative">
        <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 text-white hover:text-gray-200" disabled={gameEnded && !isFriendly}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="font-bold">
          {isFriendly ? 'Partida Amistosa' : `Brasileirão Série A - Partida ${matchDay} de 38`}
        </p>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 font-bold my-2">
            <span className="text-xl text-right truncate">{userTeam.name}</span>
            <div className="text-4xl">{userScore} - {opponentScore}</div>
            <span className="text-xl text-left truncate">{opponentTeam.name}</span>
        </div>
        <div className="text-2xl font-mono bg-black bg-opacity-30 px-3 py-1 rounded-md inline-block">
          {gameTime < 90 ? `${displayHalf} Tempo: ${displayMinutes}'` : 'Fim de Jogo'}
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="w-2/3 aspect-[2/3] bg-green-600 border-2 border-white border-opacity-50 relative">
          {/* Field Markings */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white bg-opacity-50 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-20 h-20 border border-white border-opacity-50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          
           {/* Penalty Areas */}
          <div className="absolute top-8 bottom-8 left-0 w-20 border-r border-t border-b border-white border-opacity-50 rounded-r-lg"></div>
          <div className="absolute top-8 bottom-8 right-0 w-20 border-l border-t border-b border-white border-opacity-50 rounded-l-lg"></div>

           {/* Goal Areas */}
          <div className="absolute top-16 bottom-16 left-0 w-8 border-r border-t border-b border-white border-opacity-50 rounded-r-md"></div>
          <div className="absolute top-16 bottom-16 right-0 w-8 border-l border-t border-b border-white border-opacity-50 rounded-l-md"></div>

          {/* Penalty Spots */}
          <div className="absolute top-1/2 -translate-y-1/2 left-12 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-12 w-1 h-1 bg-white rounded-full"></div>

           {/* Goals */}
           <div className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-1 h-16 bg-gray-200 border border-gray-400"></div>
           <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-1 h-16 bg-gray-200 border border-gray-400"></div>
        </div>
      </main>
    </div>
  );
};

export default GameScreen;
