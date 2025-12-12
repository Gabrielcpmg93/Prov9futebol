
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

  return (
    <div className="p-4 flex flex-col h-full bg-green-900 text-white">
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
          {gameTime < 90 ? `${gameTime}'` : 'Fim de Jogo'}
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-sm aspect-[3/4] p-2 bg-gradient-to-b from-green-700 to-green-800 rounded-lg shadow-inner">
            <div className="relative w-full h-full bg-green-600">
                <svg width="100%" height="100%" viewBox="0 0 300 400" className="absolute top-0 left-0">
                    <defs>
                        <radialGradient id="grass" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
                            <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.1)', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0)', stopOpacity: 1 }} />
                        </radialGradient>
                    </defs>
                    <rect width="300" height="400" fill="url(#grass)" />

                    {/* Outlines */}
                    <rect x="10" y="10" width="280" height="380" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />

                    {/* Mid line */}
                    <line x1="10" y1="200" x2="290" y2="200" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    
                    {/* Mid circle */}
                    <circle cx="150" cy="200" r="40" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <circle cx="150" cy="200" r="2" fill="rgba(255,255,255,0.7)" />

                    {/* Penalty areas */}
                    <rect x="10" y="125" width="80" height="150" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <rect x="210" y="125" width="80" height="150" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    
                    {/* Goal areas */}
                    <rect x="10" y="160" width="30" height="80" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <rect x="260" y="160" width="30" height="80" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />

                    {/* Penalty spots */}
                    <circle cx="60" cy="200" r="2" fill="rgba(255,255,255,0.7)" />
                    <circle cx="240" cy="200" r="2" fill="rgba(255,255,255,0.7)" />

                    {/* Penalty arcs */}
                    <path d="M 90 160 A 40 40 0 0 1 90 240" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <path d="M 210 160 A 40 40 0 0 0 210 240" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />

                    {/* Corner arcs */}
                    <path d="M 10 30 A 20 20 0 0 1 30 10" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <path d="M 270 10 A 20 20 0 0 1 290 30" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <path d="M 10 370 A 20 20 0 0 0 30 390" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <path d="M 270 390 A 20 20 0 0 0 290 370" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />

                    {/* Goals */}
                    <rect x="2" y="175" width="8" height="50" fill="none" stroke="white" strokeWidth="2"/>
                    <rect x="290" y="175" width="8" height="50" fill="none" stroke="white" strokeWidth="2"/>
                </svg>
            </div>
        </div>
      </main>
    </div>
  );
};

export default GameScreen;
