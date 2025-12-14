
import React from 'react';
import type { Team } from '../types';

interface ChampionModalProps {
  team: Team;
  competition: string;
  onClose: () => void;
}

const ChampionModal: React.FC<ChampionModalProps> = ({ team, competition, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-800 to-black rounded-3xl p-1 w-full max-w-sm shadow-2xl relative overflow-hidden">
        <div className="bg-gray-900 rounded-[20px] p-8 relative overflow-hidden text-center">
            {/* Background Decoration */}
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-yellow-500/30 to-transparent rounded-full blur-3xl animate-spin" style={{animationDuration: '10s'}}></div>
            <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tl from-green-500/20 to-transparent rounded-full blur-3xl animate-spin" style={{animationDuration: '12s'}}></div>

            <div className="relative z-10">
                <div className="mb-6 flex justify-center transform transition-transform group-hover:scale-110">
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0V5.25m-5.007 0V5.25m0 0h5.007M9.497 5.25V3h5.007v2.25m-6 0h7.125c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-1" />
                        </svg>
                    </div>
                </div>
            
                <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-2 drop-shadow-lg">CAMPEÃO!</h1>
                <p className="text-yellow-400 font-semibold mb-6">{team.name} conquistou a {competition}!</p>
                
                <button 
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-bold py-4 rounded-xl shadow-lg shadow-yellow-500/20 transform transition-all active:scale-95 uppercase tracking-wider text-sm"
                >
                    Comemorar!
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChampionModal;
