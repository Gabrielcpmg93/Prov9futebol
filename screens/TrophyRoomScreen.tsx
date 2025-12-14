
import React from 'react';
import type { Trophy, TrophyRoomScreenProps } from '../types';

const PixelTrophy: React.FC = () => (
    <svg width="60" height="60" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2 3H14V5H13V6H12V7H11V8H10V9H9V10H7V9H6V8H5V7H4V6H3V5H2V3ZM4 5H12V3H4V5ZM7 11H9V12H11V14H5V12H7V11Z" fill="#FFD700"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M1 3H2V5H3V6H4V7H5V8H6V9H7V10H9V9H10V8H11V7H12V6H13V5H14V3H15V1H1V3ZM4 1H12V3H4V1Z" fill="#B8860B" fillOpacity="0.3"/>
    </svg>
);

const TrophyRoomScreen: React.FC<TrophyRoomScreenProps> = ({ trophies, onBack }) => {
  return (
    <div className="h-full flex flex-col bg-stone-800 relative font-mono">
      {/* Background Pixel Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>

      <header className="flex items-center p-4 border-b-4 border-stone-900 bg-stone-700 z-10">
        <button onClick={onBack} className="mr-4 text-yellow-500 hover:text-yellow-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-yellow-500 tracking-widest uppercase text-shadow">SALA DE TROFÉUS</h1>
      </header>

      <main className="flex-grow overflow-y-auto p-4 space-y-8">
        {/* Prateleira 1 */}
        <div className="relative pt-8 pb-4 px-4 bg-stone-600 border-x-4 border-t-4 border-stone-900 shadow-xl">
             {/* Sombra interna */}
             <div className="absolute top-0 left-0 right-0 h-4 bg-stone-900 opacity-30"></div>
             
             <div className="flex flex-wrap gap-4 justify-center items-end min-h-[100px]">
                {trophies.length === 0 ? (
                    <div className="text-stone-400 text-xs text-center py-6">
                        <p>NENHUMA CONQUISTA AINDA...</p>
                        <p className="mt-2 text-[10px] opacity-70">VENÇA O BRASILEIRÃO (89 PONTOS)</p>
                    </div>
                ) : (
                    trophies.map((trophy) => (
                        <div key={trophy.id} className="flex flex-col items-center group cursor-pointer transform hover:-translate-y-1 transition-transform">
                            <div className="relative">
                                <PixelTrophy />
                                <div className="absolute -bottom-2 w-full h-1 bg-black opacity-20 rounded-full blur-sm"></div>
                            </div>
                            <div className="bg-stone-900 text-yellow-500 text-[10px] px-2 py-1 mt-2 border-2 border-yellow-600 rounded-sm text-center w-24">
                                <p className="font-bold leading-tight">{trophy.name}</p>
                                <p className="text-stone-400">{trophy.year}</p>
                                {/* FIX: Display the date the trophy was earned */}
                                <p className="text-stone-300 text-[9px]">{trophy.dateEarned}</p>
                            </div>
                        </div>
                    ))
                )}
             </div>

             {/* Base da prateleira */}
             <div className="absolute bottom-0 left-[-4px] right-[-4px] h-6 bg-stone-800 border-4 border-stone-950"></div>
        </div>

        {/* Prateleira 2 (Decorativa/Vazia por enquanto) */}
        <div className="relative pt-8 pb-4 px-4 bg-stone-600 border-x-4 border-t-4 border-stone-900 shadow-xl opacity-60">
             <div className="absolute top-0 left-0 right-0 h-4 bg-stone-900 opacity-30"></div>
             <div className="flex justify-center items-center min-h-[80px]">
                 <span className="text-stone-500 text-[10px]">ESPAÇO PARA FUTURAS GLÓRIAS</span>
             </div>
             <div className="absolute bottom-0 left-[-4px] right-[-4px] h-6 bg-stone-800 border-4 border-stone-950"></div>
        </div>

      </main>
    </div>
  );
};

export default TrophyRoomScreen;
