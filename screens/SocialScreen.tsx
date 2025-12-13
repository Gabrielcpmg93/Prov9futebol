
import React, { useState } from 'react';
import type { SocialScreenProps } from '../types';
import TwittaFeed from '../components/social/TwittaFeed';

const SocialScreen: React.FC<SocialScreenProps> = ({ feed, onReply }) => {
  const [activeApp, setActiveApp] = useState('Twitta');

  const apps = [
    { name: 'Twitta', icon: '🐦' },
    { name: 'FutGram', icon: '📸' },
    { name: 'Sky Esportes', icon: '📰' },
    { name: 'Direct', icon: '💬' },
    { name: 'Fórum', icon: '🗣️' },
  ];

  const renderActiveApp = () => {
    switch (activeApp) {
      case 'Twitta':
        return <TwittaFeed feed={feed} onReply={onReply} />;
      default:
        return (
          <div className="flex-grow flex flex-col items-center justify-center text-center text-gray-500 p-8">
            <span className="text-6xl mb-4">{apps.find(a => a.name === activeApp)?.icon}</span>
            <h2 className="text-2xl font-bold text-gray-700">{activeApp}</h2>
            <p className="mt-2">Este aplicativo estará disponível em uma futura atualização.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-200">
      {/* Phone-like header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm z-10">
        <div className="flex justify-around items-center border-b border-gray-200">
          {apps.map(app => (
            <button
              key={app.name}
              onClick={() => setActiveApp(app.name)}
              className={`flex-1 py-3 text-center font-bold transition-all duration-200 border-b-4 ${
                activeApp === app.name
                  ? 'text-blue-500 border-blue-500'
                  : 'text-gray-500 border-transparent hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{app.icon}</span>
              {app.name}
            </button>
          ))}
        </div>
      </header>
      <main className="flex-grow overflow-y-auto">
        {renderActiveApp()}
      </main>
    </div>
  );
};

export default SocialScreen;
