
import React from 'react';
import type { NewsArticle } from '../types';

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
                
                <div className="my-6 p-6 bg-white border-y-4 border-double border-gray-300 shadow-sm">
                    <div className="text-center w-full">
                      <div className="grid grid-cols-3 items-center gap-2">
                        <p className="text-xl font-bold text-right truncate text-gray-800">{mainArticle.userTeamName}</p>
                        <div className="flex flex-col items-center">
                            <p className="text-5xl font-black font-sans my-1 tracking-tighter">{mainArticle.userScore} x {mainArticle.opponentScore}</p>
                            <span className="text-xs font-sans text-gray-500 uppercase">Placar Final</span>
                        </div>
                        <p className="text-xl font-bold text-left truncate text-gray-800">{mainArticle.opponentTeamName}</p>
                      </div>
                    </div>
                </div>

                <div className="columns-1 md:columns-2 gap-6 space-y-4">
                    <p className="font-sans text-gray-800 leading-relaxed text-justify first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-[-6px]">
                    Em uma partida que certamente ficará na memória dos torcedores, as equipes protagonizaram um duelo tático intenso. O resultado final, selado em <span className="font-bold">{mainArticle.userScore} a {mainArticle.opponentScore}</span>, reflete os momentos de domínio territorial e as oportunidades criadas ao longo dos 90 minutos.
                    </p>
                    <p className="font-sans text-gray-800 leading-relaxed text-justify">
                    A torcida, que compareceu em peso, viu um espetáculo de entrega física. Especialistas apontam que as substituições feitas no segundo tempo foram cruciais para a dinâmica final do confronto. Agora, os olhares se voltam para a tabela de classificação e os preparativos para a próxima rodada do campeonato.
                    </p>
                </div>
              </section>
            )}

            {olderArticles.length > 0 && (
              <hr className="border-t-2 border-gray-900 my-8" />
            )}

            {olderArticles.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4 uppercase tracking-wide">Arquivo de Partidas</h3>
                <div className="grid grid-cols-1 gap-4">
                  {olderArticles.map(article => (
                    <div key={article.matchDay} className="p-3 border-l-4 border-gray-400 bg-white shadow-sm hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-bold text-md text-gray-900">{article.headline}</h4>
                          <span className="text-xs text-gray-500 font-sans font-bold bg-gray-200 px-2 py-0.5 rounded">Jornada {article.matchDay}</span>
                      </div>
                      <p className="font-sans font-medium text-gray-700">
                        {article.userTeamName} <span className="text-black font-bold mx-1">{article.userScore} - {article.opponentScore}</span> {article.opponentTeamName}
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
