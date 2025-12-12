
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
import CalendarScreen from './screens/CalendarScreen';
import MarketScreen from './screens/MarketScreen';
import PressConferenceScreen from './screens/PressConferenceScreen';
import {
  CalendarIcon,
  MicIcon,
  GraduationCapIcon,
  ListIcon,
  NewspaperIcon,
  BellIcon,
} from './components/icons';
import type { ActionListItemData, QuickActionCardData, Team, NewsArticle, TableEntry, Player, LastMatchContext } from './types';
import { teams } from './data/teams';
import { getMarketPlayers } from './data/players';

const App: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [activeScreen, setActiveScreen] = useState('Início');
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [matchDay, setMatchDay] = useState(1);
  const [leagueTable, setLeagueTable] = useState<TableEntry[]>([]);
  const [friendlyMatchScheduled, setFriendlyMatchScheduled] = useState(false);
  const [marketPlayers, setMarketPlayers] = useState<Player[]>([]);
  const [lastMatchContext, setLastMatchContext] = useState<LastMatchContext | null>(null);

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
      setMarketPlayers(getMarketPlayers());
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
    
    // Determine friendly vs league context based on active screen (roughly) or state
    // For simplicity, we assume if we are in 'AssistindoPartida' it is league, 'AssistindoAmistoso' is friendly
    const isFriendly = activeScreen === 'AssistindoAmistoso';

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

    if (!isFriendly) {
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
        }).sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points;
          return b.goalDifference - a.goalDifference;
        }));
        
        setMatchDay(prev => prev + 1);
    }

    setNewsArticles(prev => [newArticle, ...prev]);
    
    // Save context for press conference
    setLastMatchContext({
        userScore,
        opponentScore,
        opponentName: opponentTeamName,
        isFriendly
    });

    // Navigate to Press Conference instead of just 'Jogar'
    setActiveScreen('Coletiva');
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

  const handleMainActionClick = (title: string) => {
    if (title === 'Calendário') {
      setActiveScreen('Calendário');
    } else if (title === 'Imprensa') {
      // Clear last match context for generic interview
      setLastMatchContext(null); 
      setActiveScreen('Coletiva');
    } else {
      alert(`${title} clicado!`);
    }
  };

  const handleScheduleFriendlyMatch = () => {
    setFriendlyMatchScheduled(true);
    setActiveScreen('Início');
    alert('Amistoso agendado! Vá para o menu "Jogar" para disputar a partida.');
  };

  const handleUpdateMarket = () => {
    setMarketPlayers(getMarketPlayers());
  };

  const handleHirePlayer = (player: Player) => {
    alert(`Contratando ${player.name} por ${player.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}!`);
    // In a real app, you'd add the player to the team and remove from market
    setMarketPlayers(prev => prev.filter(p => p.id !== player.id));
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
        return <TableScreen table={leagueTable} onBack={() => setActiveScreen('Início')} userTeamId={selectedTeam.id} />;
      case 'Calendário':
        return <CalendarScreen onBack={() => setActiveScreen('Início')} onSchedule={handleScheduleFriendlyMatch} />;
      case 'Mercado':
        return <MarketScreen 
                  players={marketPlayers}
                  onBack={() => setActiveScreen('Início')}
                  onUpdate={handleUpdateMarket}
                  onHire={handleHirePlayer}
               />;
      case 'Coletiva':
        return <PressConferenceScreen 
                  onBack={() => setActiveScreen('Jogar')} 
                  lastMatch={lastMatchContext}
               />;
      case 'Jogar':
        return <GameMenuScreen 
                  onStartMatch={() => setActiveScreen('AssistindoPartida')}
                  isFriendlyMatchAvailable={friendlyMatchScheduled}
                  onStartFriendlyMatch={() => setActiveScreen('AssistindoAmistoso')}
               />;
      case 'AssistindoPartida':
        return <GameScreen 
                  userTeam={selectedTeam} 
                  opponentTeam={teams.find(t => t.id !== selectedTeam.id)!} 
                  onBack={() => setActiveScreen('Jogar')}
                  matchDay={matchDay}
                  onMatchEnd={handleMatchEnd}
                  isFriendly={false}
               />;
      case 'AssistindoAmistoso':
         return <GameScreen 
                  userTeam={selectedTeam} 
                  opponentTeam={teams.find(t => t.id !== selectedTeam.id)!} 
                  onBack={() => {
                    setActiveScreen('Jogar');
                    setFriendlyMatchScheduled(false); // Reset after playing
                  }}
                  onMatchEnd={handleMatchEnd}
                  isFriendly={true}
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
                  onClick={() => handleMainActionClick(action.title)}
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
