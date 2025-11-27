import React, { useState, useEffect } from 'react';
import type { Team } from '../types';

interface GameScreenProps {
  userTeam: Team;
  opponentTeam: Team;
}

const GameScreen: React.FC<GameScreenProps> = ({ userTeam, opponentTeam }) => {
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [isSecondHalf, setIsSecondHalf] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTime(prevTime => {
        if (prevTime < 45) {
          return prevTime + 1;
        } else if (prevTime === 45 && !isSecondHalf) {
          setIsSecondHalf(true);
          return 45;
        } else if (prevTime < 90 && isSecondHalf) {
          return prevTime + 1;
        } else {
          clearInterval(timer);
          return 90;
        }
      });
    }, 500); // Game time flows faster than real time

    return () => clearInterval(timer);
  }, [isSecondHalf]);

  return (
    <div className="p-4 flex flex-col h-full bg-green-800 text-white">
      <header className="text-center mb-4">
        <p className="font-bold">Brasileirão Série A - Partida 1 de 38</p>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 font-bold my-2">
            <span className="text-xl text-right truncate">{userTeam.name}</span>
            <div className="text-4xl">{userScore} - {opponentScore}</div>
            <span className="text-xl text-left truncate">{opponentTeam.name}</span>
        </div>
        <div className="text-2xl font-mono bg-black bg-opacity-30 px-3 py-1 rounded-md inline-block">
            {isSecondHalf ? '2º' : '1º'} Tempo: {isSecondHalf ? gameTime - 45 : gameTime}'
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