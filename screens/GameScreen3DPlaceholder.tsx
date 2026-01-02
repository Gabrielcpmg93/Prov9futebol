
import React from 'react';

interface GameScreen3DPlaceholderProps {
  onBack: () => void;
}

const GameScreen3DPlaceholder: React.FC<GameScreen3DPlaceholderProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-4 items-center justify-center text-center">
      <div className="mb-8">
        <div className="w-32 h-32 border-4 border-dashed border-indigo-400 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '10s' }}>
            <span className="text-4xl font-black text-indigo-300">3D</span>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-indigo-300">EM BREVE</h1>
      <p className="text-gray-400 mt-2 max-w-xs">
        A experiência de partida em 3D está em desenvolvimento para trazer ainda mais realismo à sua carreira de manager!
      </p>
      <button
        onClick={onBack}
        className="mt-10 bg-indigo-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-600 transition-colors"
      >
        Voltar ao Menu
      </button>
    </div>
  );
};

export default GameScreen3DPlaceholder;
