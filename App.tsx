
import React, { useState, useEffect, useRef } from 'react';
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
import SocialScreen from './screens/SocialScreen';
import YouthAcademyScreen from './screens/YouthAcademyScreen';
import CareerCreationScreen from './screens/CareerCreationScreen';
import CareerOfferScreen from './screens/CareerOfferScreen';
import CareerMenuScreen from './screens/CareerMenuScreen';
import TrophyRoomScreen from './screens/TrophyRoomScreen';
import {
  CalendarIcon,
  MicIcon,
  GraduationCapIcon,
  ListIcon,
  NewspaperIcon,
  BellIcon,
  StarIcon,
  TrophyIcon,
} from './components/icons';
import type { ActionListItemData, QuickActionCardData, Team, NewsArticle, TableEntry, Player, LastMatchContext, CareerPlayer, SocialPost, FutGramPost, ReplyOption, Trophy } from './types';
import { teams } from './data/teams';
import { getMarketPlayers, getInitialSquad, getYouthPlayers, generateRandomPlayer } from './data/players';
import { generateSocialFeed, generateFutGramFeed } from './data/social';

const App: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [activeScreen, setActiveScreen] = useState('Início');
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [matchDay, setMatchDay] = useState(1);
  const [leagueTable, setLeagueTable] = useState<TableEntry[]>([]);
  const [friendlyMatchScheduled, setFriendlyMatchScheduled] = useState(false);
  const [marketPlayers, setMarketPlayers] = useState<Player[]>([]);
  const [youthPlayers, setYouthPlayers] = useState<Player[]>([]);
  const [lastMatchContext, setLastMatchContext] = useState<LastMatchContext | null>(null);
  const [squad, setSquad] = useState<Player[]>([]);
  const [leagueMatchCycleIndex, setLeagueMatchCycleIndex] = useState(0);
  const [budget, setBudget] = useState(10000000); // 10 Million initial budget
  const [trophies, setTrophies] = useState<Trophy[]>([]);
  
  // Chest State
  const [hasOpenedChest, setHasOpenedChest] = useState(false);

  // Social & Team State
  const [socialFeed, setSocialFeed] = useState<SocialPost[]>([]);
  const [futGramFeed, setFutGramFeed] = useState<FutGramPost[]>([]);
  const [fanApproval, setFanApproval] = useState(70);
  const [teamMorale, setTeamMorale] = useState(75);
  
  // Career Mode State
  const [careerPlayer, setCareerPlayer] = useState<CareerPlayer | null>(null);

  // Audio Reference
  const audioRef = useRef<HTMLAudioElement>(null);

  // Super Mudança: Música toca em todas as telas para imersão total
  const isMusicScreen = (screen: string) => {
    return true; 
  };

  // Background Music Logic
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = 0.3; // Default volume fixed
        
        if (isMusicScreen(activeScreen)) {
            // Check if already playing to avoid interruption
            if (audioRef.current.paused) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Autoplay prevented until interaction.");
                    });
                }
            }
        } else {
            audioRef.current.pause();
        }
    }
  }, [activeScreen]);

  // Fix Autoplay on Interaction (Global click listener)
  useEffect(() => {
    const handleInteraction = () => {
        if (audioRef.current && audioRef.current.paused && isMusicScreen(activeScreen)) {
            audioRef.current.play().catch(e => console.log(e));
        }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    return () => {
        window.removeEventListener('click', handleInteraction);
        window.removeEventListener('touchstart', handleInteraction);
    };
  }, [activeScreen]);

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
      setYouthPlayers(getYouthPlayers());
      setSquad(getInitialSquad());
      setSocialFeed(generateSocialFeed(null, selectedTeam.name)); // Initial neutral feed
      setFutGramFeed(generateFutGramFeed());
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
    {
      icon: <TrophyIcon />,
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-600',
      title: 'Sala de Troféus',
      subtitle: 'Suas conquistas gloriosas',
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
  
  const handleMatchEnd = () => {
    if (!selectedTeam) return;

    const isFriendly = activeScreen === 'AssistindoAmistoso';

    let userScore, opponentScore;

    if (isFriendly) {
      userScore = Math.floor(Math.random() * 4);
      opponentScore = Math.floor(Math.random() * 4);
    } else {
      const outcome = leagueMatchCycleIndex;
      if (outcome < 2) { // Win
        userScore = Math.floor(Math.random() * 2) + 2;
        opponentScore = Math.floor(Math.random() * 2);
      } else { // Loss
        userScore = Math.floor(Math.random() * 2);
        opponentScore = Math.floor(Math.random() * 2) + 2;
      }
    }

    const opponentTeam = teams.find(t => t.id !== selectedTeam.id)!;
    const userTeamName = selectedTeam.name;
    const opponentTeamName = opponentTeam.name;

    let headline = '';
    let result: LastMatchContext['result'] = 'draw';
    if (userScore > opponentScore) {
      headline = `${userTeamName} vence ${opponentTeamName} em jogo emocionante!`;
      result = 'win';
    } else if (opponentScore > userScore) {
      headline = `${userTeamName} é derrotado por ${opponentTeamName}.`;
      result = 'loss';
    } else {
      headline = `Empate! ${userTeamName} e ${opponentTeamName} terminam com o placar igual.`;
    }

    const newArticle: NewsArticle = { matchDay, headline, userTeamName, opponentTeamName, userScore, opponentScore };

    if (!isFriendly) {
        let newUserPoints = 0;

        setLeagueTable(prevTable => {
            const updatedTable = prevTable.map(entry => {
                if (entry.teamId === selectedTeam.id) {
                    const newPoints = entry.points + (userScore > opponentScore ? 3 : userScore === opponentScore ? 1 : 0);
                    newUserPoints = newPoints;
                    return {
                    ...entry, played: entry.played + 1, wins: entry.wins + (userScore > opponentScore ? 1 : 0),
                    draws: entry.draws + (userScore === opponentScore ? 1 : 0), losses: entry.losses + (userScore < opponentScore ? 1 : 0),
                    goalsFor: entry.goalsFor + userScore, goalsAgainst: entry.goalsAgainst + opponentScore,
                    goalDifference: entry.goalDifference + (userScore - opponentScore),
                    points: newPoints,
                    };
                }
                if (entry.teamId === opponentTeam.id) {
                    return {
                    ...entry, played: entry.played + 1, wins: entry.wins + (opponentScore > userScore ? 1 : 0),
                    draws: entry.draws + (opponentScore === userScore ? 1 : 0), losses: entry.losses + (opponentScore < userScore ? 1 : 0),
                    goalsFor: entry.goalsFor + opponentScore, goalsAgainst: entry.goalsAgainst + userScore,
                    goalDifference: entry.goalDifference + (opponentScore - userScore),
                    points: entry.points + (opponentScore > userScore ? 3 : opponentScore === userScore ? 1 : 0),
                    };
                }
                return entry;
            });
            return updatedTable.sort((a, b) => {
                if (b.points !== a.points) return b.points - a.points;
                return b.goalDifference - a.goalDifference;
            });
        });
        
        // Check for Championship Condition (89 Points)
        if (newUserPoints >= 89) {
            const hasAlreadyWon = trophies.some(t => t.name === 'Brasileirão Série A' && t.year === 2024);
            if (!hasAlreadyWon) {
                const newTrophy: Trophy = {
                    id: `trophy-${Date.now()}`,
                    name: 'Brasileirão Série A',
                    year: 2024,
                    dateEarned: new Date().toLocaleDateString('pt-BR')
                };
                setTrophies(prev => [...prev, newTrophy]);
                alert(`PARABÉNS! VOCÊ É O CAMPEÃO BRASILEIRO COM ${newUserPoints} PONTOS! 🏆\n\nConfira sua nova conquista na Sala de Troféus.`);
            }
        }

        setMatchDay(prev => prev + 1);
        setLeagueMatchCycleIndex(prev => (prev + 1) % 3);
    }
    
    const newMatchContext: LastMatchContext = { userScore, opponentScore, opponentName: opponentTeamName, isFriendly, result };
    setNewsArticles(prev => [newArticle, ...prev]);
    setLastMatchContext(newMatchContext);
    setSocialFeed(generateSocialFeed(newMatchContext, selectedTeam.name));
    setFutGramFeed(generateFutGramFeed()); // New photos after match
    setActiveScreen('Coletiva');
  };

  const handleSocialReply = (postId: string, option: ReplyOption) => {
      switch(option.consequence.type) {
          case 'fan_approval':
              setFanApproval(prev => Math.max(0, Math.min(100, prev + option.consequence.change)));
              break;
          case 'morale':
              setTeamMorale(prev => Math.max(0, Math.min(100, prev + option.consequence.change)));
              break;
      }
      
      setSocialFeed(prev => prev.map(post => {
          if (post.id === postId) {
              return {
                  ...post,
                  userComment: option.text,
                  authorResponse: option.authorReply,
                  isInteractive: false
              }
          }
          return post;
      }));
  };

  const handleSocialLike = (app: 'Twitta' | 'FutGram', postId: string) => {
      if (app === 'Twitta') {
          setSocialFeed(prev => prev.map(post => 
              post.id === postId ? { ...post, isLiked: !post.isLiked, likes: post.likes + (post.isLiked ? -1 : 1) } : post
          ));
      } else {
          setFutGramFeed(prev => prev.map(post => 
              post.id === postId ? { ...post, isLiked: !post.isLiked, likes: post.likes + (post.isLiked ? -1 : 1) } : post
          ));
      }
  };

  const handleFutGramComment = (postId: string, comment: string) => {
       setFutGramFeed(prev => prev.map(post => 
          post.id === postId ? { ...post, userComment: comment, commentsCount: post.commentsCount + 1 } : post
      ));
  };


  const handleQuickActionClick = (title: string) => {
    if (title === 'Atualizações') setActiveScreen('Atualizações');
    else if (title === 'Notícias') setActiveScreen('Notícias');
    else if (title === 'Tabela') setActiveScreen('Tabela');
    else alert(`${title} clicado!`);
  };

  const handleSkipWeek = () => {
      // Calculate total weekly salary
      const totalSalary = squad.reduce((acc, player) => acc + (player.salary || 0), 0);
      
      // Deduct from budget
      setBudget(prev => prev - totalSalary);
      
      // Reset Chest on skip week (optional, but makes sense to get new chest)
      setHasOpenedChest(false);

      // Decrease contract weeks for all players
      setSquad(prevSquad => prevSquad.map(player => ({
          ...player,
          contractWeeks: Math.max(0, (player.contractWeeks || 0) - 1)
      })));

      const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSalary);
      alert(`Semana pulada!\n\nSalários pagos: ${formattedTotal}\nOs contratos dos jogadores foram reduzidos em 1 semana.\n\nUm novo Baú Misterioso apareceu!`);
  };

  const handleMainActionClick = (title: string) => {
    if (title === 'Calendário') setActiveScreen('Calendário');
    else if (title === 'Imprensa') {
      setLastMatchContext(null); 
      setActiveScreen('Coletiva');
    } else if (title === 'Rumo ao Estrelato') {
      if (careerPlayer) setActiveScreen('CareerMenu');
      else setActiveScreen('CareerCreation');
    } else if (title === 'Categorias de Base') {
      setActiveScreen('CategoriasBase');
    } else if (title === 'Pular Semana') {
      handleSkipWeek();
    } else if (title === 'Sala de Troféus') {
      setActiveScreen('SalaTrofeus');
    } else alert(`${title} clicado!`);
  };

  const handleScheduleFriendlyMatch = () => {
    setFriendlyMatchScheduled(true);
    setActiveScreen('Início');
    alert('Amistoso agendado! Vá para o menu "Jogar" para disputar a partida.');
  };

  const handleUpdateMarket = () => setMarketPlayers(getMarketPlayers());

  const handleHirePlayer = (player: Player, salary: number, contractWeeks: number) => {
    const newPlayer = { ...player, salary, contractWeeks };
    setSquad(prevSquad => [...prevSquad, newPlayer].sort((a, b) => (b.skill || 0) - (a.skill || 0)));
    // Remove from market if it was there
    setMarketPlayers(prevMarket => prevMarket.filter(p => p.id !== player.id));
    // Remove from youth if it was there
    setYouthPlayers(prevYouth => prevYouth.filter(p => p.id !== player.id));
  };

  const handleCreateCareerPlayer = (name: string, position: CareerPlayer['position']) => {
    setCareerPlayer({ name, position, teamId: null, teamName: null, goals: 0, assists: 0, matchesPlayed: 0, totalSeasonMatches: 89 });
    setActiveScreen('CareerAmateurGame');
  };

  const handleCareerAmateurMatchEnd = () => setActiveScreen('CareerOffers');

  const handleSelectCareerTeam = (team: Team) => {
    setCareerPlayer(prev => prev ? ({...prev, teamId: team.id, teamName: team.name}) : null);
    setActiveScreen('CareerMenu');
  };

  const handlePlayCareerMatch = () => setActiveScreen('CareerGame');

  const handleCareerMatchEnd = () => {
    if (!careerPlayer) return;
    setCareerPlayer({
        ...careerPlayer,
        goals: careerPlayer.goals + 2,
        assists: careerPlayer.assists + 1,
        matchesPlayed: careerPlayer.matchesPlayed + 1
    });
    setActiveScreen('CareerMenu');
  };

  // Chest Logic
  const handleOpenChest = () => {
      // 1. Hide chest initially to simulate collection
      setHasOpenedChest(true);
      
      // 2. Determine prize
      const isMoney = Math.random() > 0.5;
      
      if (isMoney) {
          setBudget(prev => prev + 1000);
          alert("🎉 BAÚ DA SORTE 🎉\n\nVocê encontrou R$ 1.000,00 no baú!\nO valor foi adicionado ao caixa do clube.");
      } else {
          // Generate a player with strict parameters: OVR 71
          const basePlayer = generateRandomPlayer('reward', true);
          basePlayer.skill = 71;
          // The name is already fictional from generateRandomPlayer
          
          setSquad(prev => [...prev, basePlayer].sort((a,b) => b.skill - a.skill));
          alert(`🎉 BAÚ DA SORTE 🎉\n\nVocê encontrou um jogador!\n\nNome: ${basePlayer.name}\nPosição: ${basePlayer.position}\nNível (OVR): 71\n\nEle foi adicionado ao seu elenco.`);
      }
      
      // 3. Make chest reappear after a delay (comes back)
      setTimeout(() => {
          setHasOpenedChest(false);
      }, 2000); // 2 seconds delay
  };

  if (!selectedTeam) {
    return <TeamSelectionScreen teams={teams} onSelectTeam={setSelectedTeam} />;
  }

  const getCareerOffers = () => {
    const raposa = teams.find(t => t.id === 'cru') || teams[0];
    const otherTeams = teams.filter(t => t.id !== 'cru').sort(() => 0.5 - Math.random()).slice(0, 2);
    return [raposa, ...otherTeams];
  };

  const renderContent = () => {
    switch (activeScreen) {
      case 'Atualizações': return <UpdatesScreen onBack={() => setActiveScreen('Início')} />;
      case 'Notícias': return <NewsScreen articles={newsArticles} onBack={() => setActiveScreen('Início')} />;
      case 'Tabela': return <TableScreen table={leagueTable} onBack={() => setActiveScreen('Início')} userTeamId={selectedTeam.id} />;
      case 'Calendário': return <CalendarScreen onBack={() => setActiveScreen('Início')} onSchedule={handleScheduleFriendlyMatch} />;
      case 'Elenco': return <SquadScreen squad={squad} onBack={() => setActiveScreen('Início')} />;
      case 'Mercado': return <MarketScreen players={marketPlayers} onBack={() => setActiveScreen('Início')} onUpdate={handleUpdateMarket} onHire={handleHirePlayer} />;
      case 'CategoriasBase': return <YouthAcademyScreen players={youthPlayers} onBack={() => setActiveScreen('Início')} onHire={handleHirePlayer} />;
      case 'SalaTrofeus': return <TrophyRoomScreen trophies={trophies} onBack={() => setActiveScreen('Início')} />;
      case 'Coletiva': return <PressConferenceScreen onBack={() => setActiveScreen('Jogar')} lastMatch={lastMatchContext} />;
      case 'Social': return <SocialScreen feed={socialFeed} futGramFeed={futGramFeed} onReply={handleSocialReply} onLike={handleSocialLike} onFutGramComment={handleFutGramComment} />;
      
      case 'CareerCreation': return <CareerCreationScreen onBack={() => setActiveScreen('Início')} onCreate={handleCreateCareerPlayer} />;
      case 'CareerAmateurGame': return <GameScreen userTeam={{id: 'amateur', name: 'Time da Peneira', logo: ''}} opponentTeam={{id: 'amateur_opp', name: 'Adversário', logo: ''}} onBack={() => setActiveScreen('Início')} onMatchEnd={handleCareerAmateurMatchEnd} isFriendly={true} />;
      case 'CareerOffers': return <CareerOfferScreen offers={getCareerOffers()} onSelectTeam={handleSelectCareerTeam} />;
      case 'CareerMenu': return careerPlayer ? <CareerMenuScreen player={careerPlayer} onPlayMatch={handlePlayCareerMatch} onExit={() => setActiveScreen('Início')} /> : <div>Erro</div>;
      case 'CareerGame':
          const currentCareerTeam = teams.find(t => t.id === careerPlayer?.teamId) || teams[0];
          const randomOpponent = teams.filter(t => t.id !== currentCareerTeam.id)[Math.floor(Math.random() * (teams.length - 1))];
          return <GameScreen userTeam={currentCareerTeam} opponentTeam={randomOpponent} onBack={() => setActiveScreen('CareerMenu')} onMatchEnd={handleCareerMatchEnd} isFriendly={true} isCareerMode={true} />;
      
      case 'Jogar': return <GameMenuScreen onStartMatch={() => setActiveScreen('AssistindoPartida')} isFriendlyMatchAvailable={friendlyMatchScheduled} onStartFriendlyMatch={() => setActiveScreen('AssistindoAmistoso')} />;
      case 'AssistindoPartida': return <GameScreen userTeam={selectedTeam} opponentTeam={teams.find(t => t.id !== selectedTeam.id)!} onBack={() => setActiveScreen('Jogar')} matchDay={matchDay} onMatchEnd={handleMatchEnd} isFriendly={false} />;
      case 'AssistindoAmistoso': return <GameScreen userTeam={selectedTeam} opponentTeam={teams.find(t => t.id !== selectedTeam.id)!} onBack={() => { setActiveScreen('Jogar'); setFriendlyMatchScheduled(false); }} onMatchEnd={handleMatchEnd} isFriendly={true} />;
      
      case 'Início':
      default:
        return (
           <div className="p-4 relative min-h-full overflow-hidden">
             
             {/* Chest Feature - Passa na tela (Floating Animation) */}
             {!hasOpenedChest && (
                 <button 
                    onClick={handleOpenChest}
                    className="absolute top-28 right-4 z-40 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                    title="Abrir Baú Misterioso"
                 >
                     <div className="relative">
                         {/* Golden Glow */}
                         <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                         {/* Chest SVG */}
                         <svg width="60" height="60" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                            <path fill="#FFD700" d="M480 192H32C14.33 192 0 206.33 0 224v240c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32V224c0-17.67-14.33-32-32-32z"/>
                            <path fill="#DAA520" d="M32 192h448v64H32z"/>
                            <path fill="#F0E68C" d="M32 128h448c17.67 0 32 14.33 32 32v32H0v-32c0-17.67 14.33-32 32-32z"/>
                            <path fill="#DAA520" d="M0 160h512v32H0z"/>
                            <path fill="#8B4513" d="M224 224h64v64h-64z"/> 
                            <path fill="#FFFF00" d="M256 160l-32 64h64z" className="animate-pulse"/>
                         </svg>
                         <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white">
                             CLIQUE!
                         </div>
                     </div>
                 </button>
             )}

             {/* Left Christmas Decor */}
             <div className="absolute top-0 left-0 bottom-0 w-8 pointer-events-none z-0 flex flex-col items-center">
                <div className="w-[1px] h-full bg-gray-300 absolute left-1/2 -translate-x-1/2 opacity-50"></div>
                <div className="flex flex-col items-center gap-8 py-4 w-full">
                    {/* Bauble Red */}
                    <div className="relative z-10 animate-bounce" style={{ animationDuration: '3s' }}>
                        <svg className="w-6 h-6 text-red-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c.553 0 1 .448 1 1v1.1c3.71.69 6.6 3.8 6.95 7.6.04.41-.25.79-.65.85-.41.06-.8-.22-.85-.64-.29-3.23-2.83-5.86-6.05-6.19l-.4-.04V15a6 6 0 11-6 0V5.68l-.4.04c-3.22.33-5.76 2.96-6.05 6.19-.05.42-.44.7-.85.64-.4-.06-.69-.44-.65-.85.35-3.8 3.24-6.91 6.95-7.6V3c0-.552.447-1 1-1z" /></svg>
                    </div>
                    {/* Tree Green */}
                    <div className="relative z-10 animate-pulse" style={{ animationDuration: '4s' }}>
                        <svg className="w-6 h-6 text-green-600 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" /></svg>
                    </div>
                     {/* Snowflake Blue */}
                    <div className="relative z-10 animate-spin" style={{ animationDuration: '10s' }}>
                        <svg className="w-5 h-5 text-sky-400 drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M4.929 4.929l14.142 14.142M4.929 19.071L19.071 4.929" /></svg>
                    </div>
                     {/* Bauble Gold */}
                    <div className="relative z-10 animate-bounce" style={{ animationDuration: '3.5s' }}>
                        <svg className="w-5 h-5 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                    </div>
                     {/* Tree Green */}
                    <div className="relative z-10 animate-pulse" style={{ animationDuration: '5s' }}>
                        <svg className="w-6 h-6 text-green-700 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" /></svg>
                    </div>
                </div>
             </div>

             {/* Right Christmas Decor */}
             <div className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none z-0 flex flex-col items-center">
                <div className="w-[1px] h-full bg-gray-300 absolute left-1/2 -translate-x-1/2 opacity-50"></div>
                <div className="flex flex-col items-center gap-8 py-4 w-full">
                    {/* Star Gold */}
                    <div className="relative z-10 animate-spin" style={{ animationDuration: '8s' }}>
                         <svg className="w-6 h-6 text-yellow-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    </div>
                     {/* Bauble Green */}
                    <div className="relative z-10 animate-bounce" style={{ animationDuration: '3.2s' }}>
                        <svg className="w-5 h-5 text-green-600 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                    </div>
                    {/* Snowflake Blue */}
                    <div className="relative z-10 animate-spin" style={{ animationDuration: '12s' }}>
                        <svg className="w-5 h-5 text-sky-400 drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M4.929 4.929l14.142 14.142M4.929 19.071L19.071 4.929" /></svg>
                    </div>
                    {/* Bauble Red */}
                     <div className="relative z-10 animate-bounce" style={{ animationDuration: '2.8s' }}>
                        <svg className="w-6 h-6 text-red-500 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c.553 0 1 .448 1 1v1.1c3.71.69 6.6 3.8 6.95 7.6.04.41-.25.79-.65.85-.41.06-.8-.22-.85-.64-.29-3.23-2.83-5.86-6.05-6.19l-.4-.04V15a6 6 0 11-6 0V5.68l-.4.04c-3.22.33-5.76 2.96-6.05 6.19-.05.42-.44.7-.85.64-.4-.06-.69-.44-.65-.85.35-3.8 3.24-6.91 6.95-7.6V3c0-.552.447-1 1-1z" /></svg>
                    </div>
                     {/* Tree Green */}
                    <div className="relative z-10 animate-pulse" style={{ animationDuration: '4.5s' }}>
                        <svg className="w-6 h-6 text-green-700 drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" /></svg>
                    </div>
                </div>
             </div>

             <div className="relative z-10 px-4">
                 {/* Simple Budget Display */}
                 <div className="mb-4 px-2 flex justify-between items-center text-sm font-semibold text-gray-600 bg-white/80 rounded-lg p-2 backdrop-blur-sm">
                     <span>Caixa do Clube:</span>
                     <span className={budget < 0 ? 'text-red-500' : 'text-green-600'}>
                         {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(budget)}
                     </span>
                 </div>
                <div className="space-y-3">
                  {mainActions.map((action, index) => (<ActionListItem key={index} {...action} onClick={() => handleMainActionClick(action.title)} />))}
                </div>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {quickActions.map((action, index) => (<QuickActionCard key={index} {...action} onClick={() => handleQuickActionClick(action.title)} />))}
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-50 font-sans relative">
      <audio ref={audioRef} src="https://cdn.pixabay.com/audio/2023/04/12/audio_34d1936357.mp3" loop autoPlay />
      
      <main className="flex-grow overflow-y-auto pb-24">{renderContent()}</main>
      <BottomNavBar activeLabel={activeScreen} onNavigate={setActiveScreen} />
    </div>
  );
};

export default App;
