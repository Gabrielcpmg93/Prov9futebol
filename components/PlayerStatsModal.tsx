
import React, { useState, useEffect } from 'react';
import type { Player, PlayerActionModalProps } from '../types';
import { getFictionalClubs } from '../data/fictionalClubs';

const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const positionColors = {
  GOL: 'bg-yellow-500', DEF: 'bg-blue-500', MEI: 'bg-green-500', ATA: 'bg-red-500',
};

const StatItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="flex justify-between items-baseline py-3 border-b border-gray-200">
        <span className="text-sm text-gray-500 uppercase tracking-wider">{label}</span>
        <span className="font-bold text-gray-800">{value}</span>
    </div>
);

const StatsView: React.FC<{ player: Player, onSetView: (view: 'sell' | 'loan' | 'renew') => void }> = ({ player, onSetView }) => (
    <>
        <header className="text-center mb-6">
            <div className={`mx-auto w-16 h-16 rounded-full ${positionColors[player.position]} flex items-center justify-center font-bold text-white text-2xl mb-3 border-4 border-white shadow-md`}>
                {player.position}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{player.name}</h2>
            <p className="text-md text-gray-500">{player.age} anos</p>
        </header>
        <main className="space-y-1">
            <StatItem label="Habilidade" value={player.skill} />
            <StatItem label="Valor de Mercado" value={formatCurrency(player.value)} />
            <StatItem label="Salário Semanal" value={formatCurrency(player.salary || 0)} />
            <StatItem label="Contrato (Semanas)" value={player.contractWeeks || 0} />
        </main>
        <footer className="mt-8 grid grid-cols-3 gap-2">
            <button onClick={() => onSetView('sell')} className="bg-red-500 text-white font-bold py-3 rounded-lg text-sm hover:bg-red-600 transition-colors">Vender</button>
            <button onClick={() => onSetView('loan')} className="bg-blue-500 text-white font-bold py-3 rounded-lg text-sm hover:bg-blue-600 transition-colors">Emprestar</button>
            <button onClick={() => onSetView('renew')} className="bg-green-500 text-white font-bold py-3 rounded-lg text-sm hover:bg-green-600 transition-colors">Renovar</button>
        </footer>
    </>
);

const TransactionView: React.FC<{ title: string, player: Player, clubs: string[], actionLabel: string, onConfirm: (value: number) => void, onBack: () => void, valueLabel: string }> = ({ title, player, clubs, actionLabel, onConfirm, onBack, valueLabel }) => {
    const [price, setPrice] = useState(player.value);
    const minPrice = Math.round(player.value * 0.5);
    const maxPrice = Math.round(player.value * 2);

    return (
        <>
            <header className="flex items-center mb-6">
                <button onClick={onBack} className="mr-4 text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg></button>
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            </header>
            <main>
                <p className="text-sm text-gray-600 mb-4">Clubes interessados em <span className="font-bold">{player.name}</span>:</p>
                <div className="space-y-2 mb-6">
                    {clubs.map(club => <div key={club} className="bg-gray-100 p-2 rounded-md text-sm text-gray-700 font-semibold">{club}</div>)}
                </div>
                <div>
                    <div className="flex justify-between items-baseline mb-2">
                        <label className="font-semibold text-gray-700">{valueLabel}</label>
                        <span className="font-bold text-green-600 text-lg">{formatCurrency(price)}</span>
                    </div>
                    <input type="range" min={minPrice} max={maxPrice} step={1000} value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
                </div>
            </main>
            <footer className="mt-8">
                <button onClick={() => onConfirm(price)} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors">{actionLabel}</button>
            </footer>
        </>
    );
};

const RenewContractView: React.FC<{ player: Player, onBack: () => void, onRenew: (salary: number, weeks: number) => void }> = ({ player, onBack, onRenew }) => {
    const suggestedSalary = Math.round(((player.salary || player.value / 100)) / 50) * 50;
    const [salary, setSalary] = useState(suggestedSalary);
    const [contractWeeks, setContractWeeks] = useState(player.contractWeeks || 52);
    
    return (
        <>
            <header className="flex items-center mb-6">
                <button onClick={onBack} className="mr-4 text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg></button>
                <h2 className="text-xl font-bold text-gray-800">Renovar Contrato</h2>
            </header>
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between items-baseline mb-2">
                        <label className="font-semibold text-gray-700">Salário Semanal</label>
                        <span className="font-bold text-green-600 text-lg">{formatCurrency(salary)}</span>
                    </div>
                    <input type="range" min={suggestedSalary * 0.8} max={suggestedSalary * 1.5} step={50} value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600" />
                </div>
                <div>
                    <div className="flex justify-between items-baseline mb-2">
                        <label className="font-semibold text-gray-700">Duração (Semanas)</label>
                        <span className="font-bold text-gray-800 text-lg">{contractWeeks}</span>
                    </div>
                    <input type="range" min="12" max="208" step="1" value={contractWeeks} onChange={(e) => setContractWeeks(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                </div>
            </div>
            <footer className="mt-8">
                <button onClick={() => onRenew(salary, contractWeeks)} className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors">Confirmar Renovação</button>
            </footer>
        </>
    )
};


const PlayerActionModal: React.FC<PlayerActionModalProps> = ({ player, onClose, onSell, onLoan, onRenew }) => {
  const [view, setView] = useState<'stats' | 'sell' | 'loan' | 'renew'>('stats');
  const [interestedClubs, setInterestedClubs] = useState<string[]>([]);
  
  useEffect(() => {
    if (view === 'sell' || view === 'loan') {
      setInterestedClubs(getFictionalClubs(view === 'sell' ? 3 : 2));
    }
  }, [view]);

  const handleSell = (price: number) => {
    onSell(player.id, price);
    onClose();
  };

  const handleLoan = (fee: number) => {
    onLoan(player.id, fee);
    onClose();
  };

  const handleRenew = (salary: number, weeks: number) => {
    onRenew(player, salary, weeks);
    onClose();
  };

  const renderView = () => {
    switch (view) {
      case 'sell': return <TransactionView title="Vender Jogador" player={player} clubs={interestedClubs} actionLabel="Confirmar Venda" onConfirm={handleSell} onBack={() => setView('stats')} valueLabel="Valor de Venda" />;
      case 'loan': return <TransactionView title="Emprestar Jogador" player={player} clubs={interestedClubs} actionLabel="Confirmar Empréstimo" onConfirm={handleLoan} onBack={() => setView('stats')} valueLabel="Taxa de Empréstimo" />;
      case 'renew': return <RenewContractView player={player} onBack={() => setView('stats')} onRenew={handleRenew} />;
      default: return <StatsView player={player} onSetView={setView} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-50 rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all" onClick={(e) => e.stopPropagation()}>
        {renderView()}
      </div>
    </div>
  );
};

export default PlayerActionModal;
