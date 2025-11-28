
import React, { useState, useEffect } from 'react';
import ActionListItem from './components/ActionListItem';
import QuickActionCard from './components/QuickActionCard';
import BottomNavBar from './components/BottomNavBar';
import TeamSelectionScreen from './screens/TeamSelectionScreen';
import UpdatesScreen from './screens/UpdatesScreen';
import GameScreen from './screens/GameScreen';
import GameMenuScreen from './screens/GameMenuScreen';
import NewsScreen from './screens/NewsScreen';
import TableScreen from './screens/TableScreen';
import {
  CalendarIcon,
  SirenIcon,
  SproutIcon,
  MicIcon,
  MapIcon,
  GraduationCapIcon,
  ListIcon,
  NewspaperIcon,
  BellIcon,
} from './components/icons';
import type { ActionListItemData, QuickActionCardData, Team, NewsArticle, TableEntry } from './types';
import { teams } from './data/teams';

const App: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [activeScreen, setActiveScreen] = useState('Início');
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [matchDay, setMatchDay] = useState(1);
  const [leagueTable, setLeagueTable] = useState<TableEntry[]>([]);

  useEffect(() => {
    if (selectedTeam) {
      const initialTable = teams.map(team => ({
        teamId: team.id,
        teamName: team.name,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      }));
      setLeagueTable(initialTable);
    }
  }, [selectedTeam]);

  const mainActions: Omit<ActionListItemData, 'onClick'>[] = [
    {
      icon: <CalendarIcon />,
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-500',
      title: 'Pular Semana',
      subtitle: 'Pagar salários e avançar tempo',
      action: { type: 'badge', value: '+1' },
    },
    {
      icon: <SirenIcon />,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Modo Polícia',
      subtitle: 'Patrulhe as ruas e multe infratores',
      action: { type: 'arrow' },
    },
    {
      icon: <SproutIcon />,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      title: 'Fazenda',
      subtitle: 'Plante, colha e venda frutas',
      action: { type: 'arrow' },
    },
    {
      icon: <MicIcon />,
      bgColor: 'bg-red-100',
      iconColor: 'text-red-500',
      title: 'Imprensa',
      subtitle: 'Coletivas e anúncios oficiais',
      action: { type: 'arrow' },
    },
    {
      icon: <CalendarIcon />,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-500',
      title: 'Calendário',
      subtitle: 'Agendar amistosos e ver datas',
      action: { type: 'arrow' },
    },
    {
      icon: <MapIcon />,
      bgColor: 'bg-sky-100',
      iconColor: 'text-sky-500',
      title: 'Prefeito',
      subtitle: 'Construa ruas, casas e comércios',
      action: { type: 'arrow' },
    },
    {
      icon: <GraduationCapIcon />,
      bgColor: 'bg-teal-100',
      iconColor: 'text-teal-500',
      title: 'Categorias de Base',
      subtitle: 'Treinar e promover promessas (17-29 anos)',
      action: { type: 'arrow' },
    },
  ];

  const quickActions: (Omit<QuickActionCardData, 'onClick' | 'title'> & { title: string })[] = [
    {
      icon: <ListIcon />,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      title: 'Tabela',
    },
    {
      icon: <NewspaperIcon />,
      bgColor: 'bg-gray-200',
      iconColor: 'text-gray-600',
      title: 'Notícias',
    },
    {
      icon: <BellIcon />,
      bgColor: 'bg-fuchsia-100',
      iconColor: 'text-fuchsia-500',
      title: 'Atualizações',
    },
  ];
  
  const handleMatchEnd = (userScore: number, opponentScore: number) => {
    if (!selectedTeam) return;

    const opponentTeam = teams.find(t => t.id !== selectedTeam.id)!;
    const userTeamName = selectedTeam.name;
    const opponentTeamName = opponentTeam.name;
    
    let headline = '';
    if (userScore > opponentScore) {
      headline = `${userTeamName} vence ${opponentTeamName} em jogo emocionante!`;
    } else if (opponentScore > userScore) {
      headline = `${userTeamName} é derrotado por ${opponentTeamName}.`;
    } else {
      headline = `Empate! ${userTeamName} e ${opponentTeamName} terminam com o placar igual.`;
    }

    const newArticle: NewsArticle = {
      matchDay,
      headline,
      userTeamName,
      opponentTeamName,
      userScore,
      opponentScore,
    };

    setLeagueTable(prevTable => prevTable.map(entry => {
      if (entry.teamId === selectedTeam.id) {
        return {
          ...entry,
          played: entry.played + 1,
          wins: entry.wins + (userScore > opponentScore ? 1 : 0),
          draws: entry.draws + (userScore === opponentScore ? 1 : 0),
          losses: entry.losses + (userScore < opponentScore ? 1 : 0),
          goalsFor: entry.goalsFor + userScore,
          goalsAgainst: entry.goalsAgainst + opponentScore,
          goalDifference: entry.goalDifference + (userScore - opponentScore),
          points: entry.points + (userScore > opponentScore ? 3 : userScore === opponentScore ? 1 : 0),
        };
      }
      if (entry.teamId === opponentTeam.id) {
        return {
          ...entry,
          played: entry.played + 1,
          wins: entry.wins + (opponentScore > userScore ? 1 : 0),
          draws: entry.draws + (opponentScore === userScore ? 1 : 0),
          losses: entry.losses + (opponentScore < userScore ? 1 : 0),
          goalsFor: entry.goalsFor + opponentScore,
          goalsAgainst: entry.goalsAgainst + userScore,
          goalDifference: entry.goalDifference + (opponentScore - userScore),
          points: entry.points + (opponentScore > userScore ? 3 : opponentScore === userScore ? 1 : 0),
        };
      }
      return entry;
    }));

    setNewsArticles(prev => [newArticle, ...prev]);
    setMatchDay(prev => prev + 1);
    setActiveScreen('Jogar');
  };

  const handleQuickActionClick = (title: string) => {
    if (title === 'Atualizações') {
      setActiveScreen('Atualizações');
    } else if (title === 'Notícias') {
      setActiveScreen('Notícias');
    } else if (title === 'Tabela') {
      setActiveScreen('Tabela');
    } else {
      alert(`${title} clicado!`);
    }
  };

  if (!selectedTeam) {
    return <TeamSelectionScreen teams={teams} onSelectTeam={setSelectedTeam} />;
  }

  const renderContent = () => {
    switch (activeScreen) {
      case 'Atualizações':
        return <UpdatesScreen onBack={() => setActiveScreen('Início')} />;
      case 'Notícias':
        return <NewsScreen articles={newsArticles} onBack={() => setActiveScreen('Início')} />;
      case 'Tabela':
        return <TableScreen table={leagueTable} onBack={() => setActiveScreen('Início')} />;
      case 'Jogar':
        return <GameMenuScreen onStartMatch={() => setActiveScreen('AssistindoPartida')} />;
      case 'AssistindoPartida':
        return <GameScreen 
                  userTeam={selectedTeam} 
                  opponentTeam={teams.find(t => t.id !== selectedTeam.id)!} 
                  onBack={() => setActiveScreen('Jogar')}
                  matchDay={matchDay}
                  onMatchEnd={handleMatchEnd}
               />;
      case 'Início':
      default:
        return (
           <div className="p-4">
            <div className="space-y-3">
              {mainActions.map((action, index) => (
                <ActionListItem
                  key={index}
                  {...action}
                  onClick={() => alert(`${action.title} clicado!`)}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {quickActions.map((action, index) => (
                <QuickActionCard
                  key={index}
                  {...action}
                  onClick={() => handleQuickActionClick(action.title)}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-50 font-sans">
      <main className="flex-grow overflow-y-auto pb-24">
       {renderContent()}
      </main>
      <BottomNavBar activeLabel={activeScreen} onNavigate={setActiveScreen} />
    </div>
  );
};

export default App;
