
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
import SquadScreen from './screens/SquadScreen';
import CareerCreationScreen from './screens/CareerCreationScreen';
import CareerOfferScreen from './screens/CareerOfferScreen';
import CareerMenuScreen from './screens/CareerMenuScreen';
import {
  CalendarIcon,
  MicIcon,
  GraduationCapIcon,
  ListIcon,
  NewspaperIcon,
  BellIcon,
  StarIcon,
} from './components/icons';
import type { ActionListItemData, QuickActionCardData, Team, NewsArticle, TableEntry, Player, LastMatchContext, CareerPlayer } from './types';
import { teams } from './data/teams';
import { getMarketPlayers, getInitialSquad } from './data/players';

const App: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [activeScreen, setActiveScreen] = useState('Início');
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [matchDay, setMatchDay] = useState(1);
  const [leagueTable, setLeagueTable] = useState<TableEntry[]>([]);
  const [friendlyMatchScheduled, setFriendlyMatchScheduled] = useState(false);
  const [marketPlayers, setMarketPlayers] = useState<Player[]>([]);
  const [lastMatchContext, setLastMatchContext] = useState<LastMatchContext | null>(null);
  const [squad, setSquad] = useState<Player[]>([]);
  
  // Career Mode State
  const [careerPlayer, setCareerPlayer] = useState<CareerPlayer | null>(null);

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
      setSquad(getInitialSquad());
    }
  }, [selectedTeam]);

  const mainActions: Omit<ActionListItemData, 'onClick'>[] = [
    {
      icon: <StarIcon />,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      title: 'Rumo ao Estrelato',
      subtitle: 'Crie seu jogador e viva o sonho',
      action: { type: 'arrow' },
    },
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
    
    setLastMatchContext({
        userScore,
        opponentScore,
        opponentName: opponentTeamName,
        isFriendly
    });

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
      setLastMatchContext(null); 
      setActiveScreen('Coletiva');
    } else if (title === 'Rumo ao Estrelato') {
        if (careerPlayer) {
             setActiveScreen('CareerMenu');
        } else {
             setActiveScreen('CareerCreation');
        }
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

  const handleHirePlayer = (player: Player, salary: number, contractWeeks: number) => {
    const newPlayer = { ...player, salary, contractWeeks };
    setSquad(prevSquad => [...prevSquad, newPlayer].sort((a, b) => (b.skill || 0) - (a.skill || 0)));
    setMarketPlayers(prevMarket => prevMarket.filter(p => p.id !== player.id));
  };

  // Career Mode Handlers
  const handleCreateCareerPlayer = (name: string, position: CareerPlayer['position']) => {
    setCareerPlayer({
        name,
        position,
        teamId: null,
        teamName: null,
        goals: 0,
        assists: 0,
        matchesPlayed: 0,
        totalSeasonMatches: 89
    });
    // Start Amateur Match
    setActiveScreen('CareerAmateurGame');
  };

  const handleCareerAmateurMatchEnd = () => {
    // Navigate to offers
    setActiveScreen('CareerOffers');
  };

  const handleSelectCareerTeam = (team: Team) => {
      setCareerPlayer(prev => prev ? ({...prev, teamId: team.id, teamName: team.name}) : null);
      setActiveScreen('CareerMenu');
  };

  const handlePlayCareerMatch = () => {
      setActiveScreen('CareerGame');
  };

  const handleCareerMatchEnd = (userScore: number, opponentScore: number) => {
      // Simulate player stats based on result (simple random logic)
      if (careerPlayer) {
          let newGoals = careerPlayer.goals;
          let newAssists = careerPlayer.assists;

          // If user team scored, chance for player to participate
          for (let i = 0; i < userScore; i++) {
              const dice = Math.random();
              if (dice > 0.6) newGoals++;
              else if (dice > 0.4) newAssists++;
          }

          setCareerPlayer({
              ...careerPlayer,
              goals: newGoals,
              assists: newAssists,
              matchesPlayed: careerPlayer.matchesPlayed + 1
          });
      }
      setActiveScreen('CareerMenu');
  };


  if (!selectedTeam) {
    return <TeamSelectionScreen teams={teams} onSelectTeam={setSelectedTeam} />;
  }

  // Helper to generate random offers
  const getCareerOffers = () => {
      const raposa = teams.find(t => t.id === 'cru') || teams[0];
      const otherTeams = teams.filter(t => t.id !== 'cru').sort(() => 0.5 - Math.random()).slice(0, 2);
      return [raposa, ...otherTeams];
  };

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
      case 'Elenco':
        return <SquadScreen squad={squad} onBack={() => setActiveScreen('Início')} />;
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
      
      // Career Mode Screens
      case 'CareerCreation':
          return <CareerCreationScreen onBack={() => setActiveScreen('Início')} onCreate={handleCreateCareerPlayer} />;
      case 'CareerAmateurGame':
          return <GameScreen 
                    userTeam={{id: 'amateur', name: 'Time da Peneira', logo: ''}}
                    opponentTeam={{id: 'amateur_opp', name: 'Adversário', logo: ''}}
                    onBack={() => setActiveScreen('Início')} // Should probably disable back here
                    onMatchEnd={handleCareerAmateurMatchEnd}
                    isFriendly={true} // Reusing friendly logic for simplicity (no table update)
                 />;
      case 'CareerOffers':
          return <CareerOfferScreen offers={getCareerOffers()} onSelectTeam={handleSelectCareerTeam} />;
      case 'CareerMenu':
          return careerPlayer ? (
            <CareerMenuScreen 
                player={careerPlayer} 
                onPlayMatch={handlePlayCareerMatch} 
                onExit={() => setActiveScreen('Início')} 
            />
          ) : <div>Erro ao carregar carreira</div>;
      case 'CareerGame':
          const currentCareerTeam = teams.find(t => t.id === careerPlayer?.teamId) || teams[0];
          const randomOpponent = teams.filter(t => t.id !== currentCareerTeam.id)[Math.floor(Math.random() * (teams.length - 1))];
          return <GameScreen 
                    userTeam={currentCareerTeam}
                    opponentTeam={randomOpponent}
                    onBack={() => setActiveScreen('CareerMenu')}
                    onMatchEnd={handleCareerMatchEnd}
                    isFriendly={true} // Using friendly to not affect main league table
                    isCareerMode={true}
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
