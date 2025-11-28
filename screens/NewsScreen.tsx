
import React from 'react';
import type { NewsArticle } from '../types';

interface NewsScreenProps {
  articles: NewsArticle[];
  onBack: () => void;
}

const NewsScreen: React.FC<NewsScreenProps> = ({ articles, onBack }) => {
  return (
    <div className="p-4 h-full">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-800">Notícias</h1>
      </div>
      <div className="space-y-4">
        {articles.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <h2 className="text-lg font-semibold">O Jornal está Vazio</h2>
            <p>Jogue uma partida para ver as últimas notícias!</p>
          </div>
        ) : (
          articles.map((article) => (
            <div key={article.matchDay} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="border-b-2 border-gray-200 pb-2 mb-2">
                <p className="text-sm text-gray-500 font-semibold">Partida {article.matchDay}</p>
                <h2 className="font-bold text-lg text-gray-800 font-serif">{article.headline}</h2>
              </div>
              <div className="text-center font-mono bg-gray-100 p-3 rounded-md">
                <p className="text-sm">{article.userTeamName}</p>
                <p className="text-2xl font-bold my-1">{article.userScore} - {article.opponentScore}</p>
                <p className="text-sm">{article.opponentTeamName}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsScreen;
