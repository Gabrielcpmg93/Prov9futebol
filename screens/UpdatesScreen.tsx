
import React from 'react';

interface UpdatesScreenProps {
  onBack: () => void;
}

const UpdatesScreen: React.FC<UpdatesScreenProps> = ({ onBack }) => {
  const updates = [
    {
      version: 'v1.5.0',
      date: '30 de Julho, 2024',
      changes: [
        'Novo Modo: Rumo ao Estrelato! Crie seu jogador, jogue a peneira e assine com clubes.',
        'Sistema de Carreira: Jogue uma temporada de 89 jogos e acompanhe suas estatísticas (Gols e Assistências).',
        'Novo menu exclusivo para o gerenciamento da carreira do seu jogador.',
      ],
    },
    {
      version: 'v1.4.0',
      date: '29 de Julho, 2024',
      changes: [
        'Nova Sala de Imprensa: Visual imersivo 3D com patrocinadores e mesa de entrevista, idêntico à foto real.',
        'Sistema de Entrevistas: Responda perguntas dos repórteres após as partidas, com reações dinâmicas baseadas no resultado.',
        'Mercado de Transferências: Nova aba "Mercado" para buscar e contratar jogadores gerados aleatoriamente.',
        'Visual de Jogo Aprimorado: Novo campo vetorial detalhado e cronômetro realista de 90 minutos.',
      ],
    },
    {
      version: 'v1.3.0',
      date: '28 de Julho, 2024',
      changes: [
        'Adicionada a Tabela do Brasileirão com sistema de pontos.',
        'Sistema de Notícias Pós-Partida: Um jornal é gerado após cada jogo.',
        'Seção de Notícias agora exibe o histórico de partidas.',
      ],
    },
    {
      version: 'v1.2.0',
      date: '24 de Julho, 2024',
      changes: [
        'Adicionada tela de Seleção de Times do Brasileirão Série A.',
        'Implementada a tela de Jogo 2D com placar e tempo.',
        'Página de "Atualizações" agora é funcional.',
        'Sistema de navegação principal implementado.',
      ],
    },
     {
      version: 'v1.1.0',
      date: '20 de Julho, 2024',
      changes: [
        'Todos os botões da tela inicial agora são funcionais e exibem alertas.',
        'Melhorias na acessibilidade dos componentes clicáveis.',
      ],
    },
    {
      version: 'v1.0.0',
      date: '15 de Julho, 2024',
      changes: [
        'Lançamento inicial do layout do aplicativo de gerenciamento de futebol.',
        'Interface principal com lista de ações e atalhos rápidos.',
      ],
    },
  ];

  return (
    <div className="p-4 h-full">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="mr-4 text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-800">Atualizações</h1>
      </div>
      <div className="space-y-6">
        {updates.map((update) => (
          <div key={update.version} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-baseline">
                <h2 className="font-bold text-lg text-green-600">{update.version}</h2>
                <p className="text-sm text-gray-500">{update.date}</p>
            </div>
            <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700">
              {update.changes.map((change, index) => (
                <li key={index}>{change}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdatesScreen;
