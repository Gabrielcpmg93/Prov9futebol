
import React, { useState, useEffect } from 'react';
import type { GameScreenProps } from '../types';

// --- Helper Components for the Field ---
const PlayerDot: React.FC<{ x: number; y: number; team: 'user' | 'opponent' }> = ({ x, y, team }) => {
  const color = team === 'user' ? 'bg-blue-500 border-blue-200' : 'bg-red-500 border-red-200';
  return (
    <div
      className={`absolute w-3 h-3 rounded-full ${color} border-2 shadow-md transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out`}
      style={{ left: `${x}%`, top: `${y}%` }}
    />
  );
};

const Ball: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <div
    className="absolute w-2 h-2 rounded-full bg-white border border-black shadow-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-linear"
    style={{ left: `${x}%`, top: `${y}%` }}
  />
);

// --- Player Initialization ---
const initializePlayers = () => {
  const players = [];
  // User Team (4-4-2)
  players.push({ id: 'user-gk', x: 8, y: 50, team: 'user' });
  players.push({ id: 'user-def1', x: 25, y: 20, team: 'user' });
  players.push({ id: 'user-def2', x: 25, y: 40, team: 'user' });
  players.push({ id: 'user-def3', x: 25, y: 60, team: 'user' });
  players.push({ id: 'user-def4', x: 25, y: 80, team: 'user' });
  players.push({ id: 'user-mid1', x: 45, y: 20, team: 'user' });
  players.push({ id: 'user-mid2', x: 45, y: 40, team: 'user' });
  players.push({ id: 'user-mid3', x: 45, y: 60, team: 'user' });
  players.push({ id: 'user-mid4', x: 45, y: 80, team: 'user' });
  players.push({ id: 'user-atk1', x: 65, y: 35, team: 'user' });
  players.push({ id: 'user-atk2', x: 65, y: 65, team: 'user' });

  // Opponent Team (4-4-2)
  players.push({ id: 'opp-gk', x: 92, y: 50, team: 'opponent' });
  players.push({ id: 'opp-def1', x: 75, y: 20, team: 'opponent' });
  players.push({ id: 'opp-def2', x: 75, y: 40, team: 'opponent' });
  players.push({ id: 'opp-def3', x: 75, y: 60, team: 'opponent' });
  players.push({ id: 'opp-def4', x: 75, y: 80, team: 'opponent' });
  players.push({ id: 'opp-mid1', x: 55, y: 20, team: 'opponent' });
  players.push({ id: 'opp-mid2', x: 55, y: 40, team: 'opponent' });
  players.push({ id: 'opp-mid3', x: 55, y: 60, team: 'opponent' });
  players.push({ id: 'opp-mid4', x: 55, y: 80, team: 'opponent' });
  players.push({ id: 'opp-atk1', x: 35, y: 35, team: 'opponent' });
  players.push({ id: 'opp-atk2', x: 35, y: 65, team: 'opponent' });

  return players;
};


const GameScreen: React.FC<GameScreenProps> = ({ userTeam, opponentTeam, onBack, matchDay, onMatchEnd, isFriendly = false }) => {
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [playerPositions, setPlayerPositions] = useState(initializePlayers());
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTime(prevTime => {
        if (prevTime >= 90) {
          clearInterval(timer);
          return 90;
        }
        if (!isFriendly && Math.random() < 0.03) {
          if (Math.random() < 0.6) {
            setUserScore(s => s + 1);
          } else {
            setOpponentScore(s => s + 1);
          }
        }
        return prevTime + 1;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [isFriendly]);

  useEffect(() => {
    if (gameTime >= 90 && !gameEnded) {
      setGameEnded(true);
      if (onMatchEnd) {
        setTimeout(() => {
          onMatchEnd(userScore, opponentScore);
        }, 2000);
      }
    }
  }, [gameTime, userScore, opponentScore, onMatchEnd, gameEnded]);

  // Animation loop for players and ball
  useEffect(() => {
    if (gameEnded) return;

    const animationInterval = setInterval(() => {
      // Player idle movement
      setPlayerPositions(prevPositions =>
        prevPositions.map(p => {
          const moveX = p.id.includes('gk') ? (Math.random() * 2 - 1) : (Math.random() * 4 - 2);
          const moveY = p.id.includes('gk') ? (Math.random() * 2 - 1) : (Math.random() * 4 - 2);
          
          let newX = p.x + moveX / 10;
          let newY = p.y + moveY / 10;
          
          newX = Math.max(2, Math.min(98, newX));
          newY = Math.max(2, Math.min(98, newY));

          return { ...p, x: newX, y: newY };
        })
      );
      
      // Ball movement
      setBallPosition(prevBall => {
        let newX = prevBall.x + (Math.random() * 20 - 10);
        let newY = prevBall.y + (Math.random() * 20 - 10);
        newX = Math.max(2, Math.min(98, newX));
        newY = Math.max(2, Math.min(98, newY));
        return { x: newX, y: newY };
      });

    }, 500);

    return () => clearInterval(animationInterval);
  }, [gameEnded]);


  return (
    <div className="p-2 flex flex-col h-full bg-green-900 text-white">
      <header className="text-center mb-2 relative">
        <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 text-white hover:text-gray-200" disabled={gameEnded && !isFriendly}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="font-bold text-sm">
          {isFriendly ? 'Partida Amistosa' : `Brasileirão - Partida ${matchDay}`}
        </p>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 font-bold my-1">
            <span className="text-lg text-right truncate">{userTeam.name}</span>
            <div className="text-3xl">{userScore} - {opponentScore}</div>
            <span className="text-lg text-left truncate">{opponentTeam.name}</span>
        </div>
        <div className="text-xl font-mono bg-black bg-opacity-30 px-3 py-1 rounded-md inline-block">
          {gameTime < 90 ? `${gameTime}'` : 'Fim de Jogo'}
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-xs aspect-[2/3] p-1 bg-gradient-to-b from-green-700 to-green-800 rounded-lg shadow-inner">
            <div className="relative w-full h-full bg-green-600">
                <svg width="100%" height="100%" viewBox="0 0 300 450" className="absolute top-0 left-0">
                    <defs>
                        <radialGradient id="grass" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
                            <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.1)', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0)', stopOpacity: 1 }} />
                        </radialGradient>
                    </defs>
                    <rect width="300" height="450" fill="url(#grass)" />

                    <rect x="10" y="10" width="280" height="430" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <line x1="10" y1="225" x2="290" y2="225" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <circle cx="150" cy="225" r="40" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <circle cx="150" cy="225" r="2" fill="rgba(255,255,255,0.7)" />
                    
                    <rect x="50" y="10" width="200" height="80" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <rect x="50" y="360" width="200" height="80" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    
                    <rect x="90" y="10" width="120" height="40" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <rect x="90" y="400" width="120" height="40" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    
                    <circle cx="150" cy="65" r="2" fill="rgba(255,255,255,0.7)" />
                    <circle cx="150" cy="385" r="2" fill="rgba(255,255,255,0.7)" />
                    
                    <path d="M 110 90 A 40 40 0 0 1 190 90" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <path d="M 110 360 A 40 40 0 0 0 190 360" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />

                    <path d="M 10 30 A 20 20 0 0 1 30 10" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <path d="M 270 10 A 20 20 0 0 1 290 30" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <path d="M 10 420 A 20 20 0 0 0 30 440" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                    <path d="M 270 440 A 20 20 0 0 0 290 420" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />

                    <rect x="120" y="2" width="60" height="8" fill="none" stroke="white" strokeWidth="2"/>
                    <rect x="120" y="440" width="60" height="8" fill="none" stroke="white" strokeWidth="2"/>
                </svg>
                {/* Render Players and Ball */}
                {playerPositions.map(player => (
                  <PlayerDot key={player.id} x={player.x} y={player.y} team={player.team} />
                ))}
                <Ball x={ballPosition.x} y={ballPosition.y} />
            </div>
        </div>
      </main>
    </div>
  );
};

export default GameScreen;
