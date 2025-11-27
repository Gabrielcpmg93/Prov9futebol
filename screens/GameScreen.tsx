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
        <div className="flex justify-center items-center font-bold my-2">
            <div className="flex items-center text-xl">
                <img src={userTeam.logo} alt={userTeam.name} className="w-10 h-10 mr-3"/>
                <span>{userTeam.name}</span>
            </div>
            <div className="mx-4 text-4xl">{userScore} - {opponentScore}</div>
            <div className="flex items-center text-xl">
                <span>{opponentTeam.name}</span>
                <img src={opponentTeam.logo} alt={opponentTeam.name} className="w-10 h-10 ml-3"/>
            </div>
        </div>
        <div className="text-2xl font-mono bg-black bg-opacity-30 px-3 py-1 rounded-md inline-block">
            {isSecondHalf ? '2º' : '1º'} Tempo: {isSecondHalf ? gameTime - 45 : gameTime}'
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="w-3/4 aspect-[2/3] bg-green-600 border-4 border-white border-opacity-50 relative">
          {/* Field Markings */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white bg-opacity-50 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white border-opacity-50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
           {/* Penalty Areas */}
          <div className="absolute top-8 bottom-8 left-0 w-20 border-r-2 border-t-2 border-b-2 border-white border-opacity-50 rounded-r-lg"></div>
          <div className="absolute top-8 bottom-8 right-0 w-20 border-l-2 border-t-2 border-b-2 border-white border-opacity-50 rounded-l-lg"></div>
           {/* Goals */}
           <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-20 bg-gray-200 border-2 border-gray-400"></div>
           <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-20 bg-gray-200 border-2 border-gray-400"></div>
        </div>
      </main>
    </div>
  );
};

export default GameScreen;