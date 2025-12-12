
import React from 'react';
import type { CareerOfferScreenProps, Team } from '../types';

const CareerOfferScreen: React.FC<CareerOfferScreenProps> = ({ offers, onSelectTeam }) => {
  return (
    <div className="p-4 h-full flex flex-col bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 text-center mt-6 mb-2">Propostas Recebidas</h1>
      <p className="text-center text-gray-600 mb-8">Sua atuação na peneira chamou a atenção destes clubes!</p>

      <div className="flex-grow space-y-4 overflow-y-auto px-2">
        {offers.map((team, index) => (
          <div key={team.id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-l-yellow-400 transform transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
               <img src={team.logo} alt={team.name} className="w-16 h-16 rounded-full bg-gray-50 p-1" />
               <div>
                   <h2 className="text-xl font-bold text-gray-800">{team.name}</h2>
                   <p className="text-sm text-green-600 font-semibold">Contrato: 1 Temporada</p>
               </div>
            </div>
            <p className="text-gray-500 text-sm mb-4">
                "Vimos grande potencial no seu futebol. Queremos você vestindo a nossa camisa nesta temporada."
            </p>
            <button
              onClick={() => onSelectTeam(team)}
              className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Assinar Contrato
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerOfferScreen;
