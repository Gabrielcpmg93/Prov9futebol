
import React from 'react';
import type { CopaGroupStageScreenProps, Team } from '../types';

const GroupCard: React.FC<{ groupName: string, teams: Team[], userTeamId: string }> = ({ groupName, teams, userTeamId }) => (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
        <h3 className="font-bold text-lg text-yellow-400 mb-3 text-center border-b border-white/20 pb-2">Grupo {groupName}</h3>
        <ul className="space-y-2">
            {teams.map(team => (
                <li key={team.id} className={`text-sm ${team.id === userTeamId ? 'font-bold text-white animate-pulse' : 'text-gray-300'}`}>
                    {team.name}
                </li>
            ))}
        </ul>
    </div>
);


const CopaGroupStageScreen: React.FC<CopaGroupStageScreenProps> = ({ groups, userTeam, matchQueue, onPlayNextMatch, onBack }) => {
    const nextOpponent = matchQueue[0];
    const isFinal = matchQueue.length === 1;

    return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gradient-to-b from-blue-900 to-gray-900 font-sans p-4 text-white">
        <header className="flex items-center mb-6 relative">
            <button onClick={onBack} className="absolute left-0 text-white hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <h1 className="text-2xl font-bold text-yellow-400 text-center flex-grow">Fase de Grupos</h1>
        </header>

        <main className="flex-grow overflow-y-auto space-y-4">
            {groups.map(group => (
                <GroupCard key={group.name} groupName={group.name} teams={group.teams} userTeamId={userTeam.id} />
            ))}
        </main>
        
        <footer className="mt-4 pt-4 border-t border-white/20">
            <div className="bg-black/30 p-4 rounded-xl text-center">
                <p className="text-sm uppercase text-gray-400 font-semibold">{isFinal ? "A Grande Final" : "Próxima Partida"}</p>
                <p className="text-xl font-bold my-1">{userTeam.name} vs {nextOpponent.name}</p>
            </div>
            <button 
                onClick={onPlayNextMatch}
                className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-extrabold py-4 rounded-xl text-lg uppercase shadow-lg hover:scale-[1.02] transition-transform"
            >
                {isFinal ? "Jogar a Final" : "Jogar Partida"}
            </button>
        </footer>
    </div>
    );
};

export default CopaGroupStageScreen;
