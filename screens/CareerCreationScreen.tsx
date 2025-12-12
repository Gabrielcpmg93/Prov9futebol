
import React, { useState } from 'react';
import type { CareerCreationScreenProps, CareerPlayer } from '../types';

const CareerCreationScreen: React.FC<CareerCreationScreenProps> = ({ onBack, onCreate }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState<CareerPlayer['position']>('ATA');

  const handleSubmit = () => {
    if (name.trim().length > 0) {
      onCreate(name, position);
    }
  };

  const positions: CareerPlayer['position'][] = ['GOL', 'DEF', 'MEI', 'ATA'];

  return (
    <div className="p-6 h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <h1 className="text-3xl font-bold mb-2 text-yellow-400 uppercase tracking-widest">Rumo ao Estrelato</h1>
      <p className="mb-8 text-gray-300 text-center">Crie sua lenda. Comece na várzea e conquiste o mundo.</p>

      <div className="w-full max-w-sm space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Nome do Jogador</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-yellow-400 focus:outline-none text-white placeholder-gray-500"
            placeholder="Ex: Seu Nome"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2 text-gray-300">Posição</label>
          <div className="grid grid-cols-4 gap-2">
            {positions.map((pos) => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                className={`p-3 rounded-lg font-bold transition-all ${
                  position === pos
                    ? 'bg-yellow-400 text-black shadow-lg scale-105'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={name.trim().length === 0}
          className="w-full bg-yellow-500 text-black font-extrabold py-4 rounded-lg text-lg uppercase tracking-wide hover:bg-yellow-400 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-8"
        >
          Iniciar Peneira
        </button>

        <button onClick={onBack} className="w-full text-gray-400 hover:text-white mt-4 text-sm underline">
          Cancelar e Voltar
        </button>
      </div>
    </div>
  );
};

export default CareerCreationScreen;
