
import React from 'react';
import type { NewsArticle } from '../types';
import { CameraIcon } from '../components/icons';

interface NewsScreenProps {
  articles: NewsArticle[];
  onBack: () => void;
}

const NewsScreen: React.FC<NewsScreenProps> = ({ articles, onBack }) => {
  const mainArticle = articles[0];
  const olderArticles = articles.slice(1);

  return (
    <div className="h-full bg-amber-50 font-serif overflow-y-auto">
      <div className="p-4 relative">
        <button onClick={onBack} className="absolute top-4 left-2 text-gray-700 hover:text-black z-10 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <header className="text-center py-4 border-b-8 border-gray-900 mb-6">
          <h1 className="text-5xl font-black text-gray-900 tracking-tighter">DIÁRIO ESPORTIVO</h1>
          <p className="text-sm text-gray-600 mt-1 font-sans">As notícias que movem o esporte nacional</p>
        </header>

        {articles.length === 0 ? (
          <div className="text-center text-gray-600 mt-20 p-4 border border-gray-300 border-dashed">
            <h2 className="text-xl font-bold font-serif">EDIÇÃO FECHADA</h2>
            <p className="font-sans mt-2">Nenhuma partida jogada para reportar. Os rotativos estão parados.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {mainArticle && (
              <section>
                <p className="text-xs text-gray-500 font-sans uppercase tracking-widest">Manchete do Dia - Partida {mainArticle.matchDay}</p>
                <h2 className="text-3xl font-bold text-gray-900 my-2 leading-tight">{mainArticle.headline}</h2>
                
                <div className="flex flex-col md:flex-row gap-4 my-4">
                  <div className="md:w-1/2 w-full h-40 bg-gray-200 border-4 border-white shadow-md flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <CameraIcon className="w-12 h-12 mx-auto" />
                      <p className="text-xs font-sans mt-1">FOTO DO JOGO</p>
                    </div>
                  </div>
                  <div className="flex-grow flex items-center justify-center bg-white p-4 border border-gray-300 shadow-sm">
                    <div className="text-center w-full">
                      <div className="grid grid-cols-3 items-center gap-2">
                        <p className="text-lg font-bold text-right truncate">{mainArticle.userTeamName}</p>
                        <p className="text-4xl font-black font-sans my-1">{mainArticle.userScore} x {mainArticle.opponentScore}</p>
                        <p className="text-lg font-bold text-left truncate">{mainArticle.opponentTeamName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="font-sans text-gray-700 leading-relaxed">
                  Em uma partida memorável, as equipes se enfrentaram em um duelo tático que agitou as arquibancadas. O resultado final, selado em <span className="font-bold">{mainArticle.userScore} a {mainArticle.opponentScore}</span>, reflete os momentos de domínio e as falhas que definiram o confronto. A torcida agora aguarda ansiosamente os desdobramentos na tabela.
                </p>
              </section>
            )}

            {olderArticles.length > 0 && (
              <hr className="border-t-2 border-gray-300 my-4" />
            )}

            {olderArticles.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Outras Partidas</h3>
                <div className="space-y-4">
                  {olderArticles.map(article => (
                    <div key={article.matchDay} className="p-3 border border-gray-200 bg-white/50">
                      <p className="text-xs text-gray-500 font-sans">Partida {article.matchDay}</p>
                      <h4 className="font-bold text-lg text-gray-900">{article.headline}</h4>
                      <p className="font-sans font-semibold text-gray-700 mt-1">
                        {article.userTeamName} {article.userScore} x {article.opponentScore} {article.opponentTeamName}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsScreen;
