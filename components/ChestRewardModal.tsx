
import React from 'react';
import type { Player } from '../types';

interface ChestRewardModalProps {
  reward: { type: 'money'; value: number } | { type: 'player'; player: Player };
  onClose: () => void;
}

const ChestRewardModal: React.FC<ChestRewardModalProps> = ({ reward, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gradient-to-b from-yellow-50 to-white rounded-3xl p-1 w-full max-w-sm shadow-2xl relative overflow-hidden transform transition-all scale-100">
        <div className="bg-white rounded-[20px] p-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-50"></div>

            <div className="text-center relative z-10">
            <div className="mb-6 flex justify-center">
                <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 p-4 rounded-full shadow-lg ring-4 ring-yellow-100 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 2a1 1 0 011-1h8a1 1 0 011 1v1h1a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h1V2zm1 1v1h8V3H6z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            
            <h2 className="text-2xl font-black text-gray-800 uppercase tracking-wide mb-1">Recompensa!</h2>
            <p className="text-gray-500 text-sm mb-6">Você abriu o Baú Misterioso</p>

            <div className="bg-yellow-50/50 rounded-2xl p-6 shadow-inner mb-8 border border-yellow-100">
                {reward.type === 'money' ? (
                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-black text-green-500 tracking-tighter drop-shadow-sm">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(reward.value)}
                        </span>
                        <span className="text-xs text-gray-400 uppercase font-bold mt-2 tracking-widest">Adicionado ao Caixa</span>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4 text-left">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-lg transform rotate-3 ${
                            reward.player.position === 'GOL' ? 'bg-yellow-500' : 
                            reward.player.position === 'DEF' ? 'bg-blue-500' : 
                            reward.player.position === 'MEI' ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                            {reward.player.position}
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase font-bold">Novo Jogador</p>
                            <p className="font-black text-xl text-gray-800 leading-none mb-1">{reward.player.name}</p>
                            <div className="inline-block bg-white border border-gray-200 rounded px-2 py-0.5">
                                <p className="text-xs font-bold text-gray-600">OVR <span className="text-blue-600">{reward.player.skill}</span></p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <button 
                onClick={onClose}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 transform transition-all active:scale-95 uppercase tracking-wider text-sm"
            >
                Resgatar Prêmio
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChestRewardModal;
        