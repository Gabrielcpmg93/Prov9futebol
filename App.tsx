
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
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
import ChampionModal from './components/ChampionModal';
import CopaTeamSelectionScreen from './screens/CopaTeamSelectionScreen';
import CopaGroupStageScreen from './screens/CopaGroupStageScreen';
import AutoSaveToast from './components/AutoSaveToast';
import GameScreen3DPlaceholder from './screens/GameScreen3DPlaceholder';
import SettingsScreen from './screens/SettingsScreen';
import {
  CalendarIcon,
  MicIcon,
  GraduationCapIcon,
  ListIcon,
  NewspaperIcon,
  BellIcon,
  StarIcon,
  TrophyIcon,
  GlobeIcon,
  SettingsIcon,
} from './components/icons';
import type { ActionListItemData, QuickActionCardData, Team, NewsArticle, TableEntry, Player, LastMatchContext, CareerPlayer, SocialPost, FutGramPost, ReplyOption, Trophy, CopaGroup } from './types';
import { teams } from './data/teams';
import { getCopaTeams } from './data/copaTeams';
import { getMarketPlayers, getInitialSquad, getYouthPlayers, generateRandomPlayer } from './data/players';
import { generateSocialFeed, generateFutGramFeed } from './data/social';

// Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

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
  const [volume, setVolume] = useState(0.3);
  
  const [championModalInfo, setChampionModalInfo] = useState<{ competition: string; team: Team; } | null>(null);

  // Social & Team State
  const [socialFeed, setSocialFeed] = useState<SocialPost[]>([]);
  const [futGramFeed, setFutGramFeed] = useState<FutGramPost[]>([]);
  const [fanApproval, setFanApproval] = useState(70);
  const [teamMorale, setTeamMorale] = useState(75);
  
  // Career Mode State
  const [careerPlayer, setCareerPlayer] = useState<CareerPlayer | null>(null);

  // Copa das Américas State
  const [copaUserTeam, setCopaUserTeam] = useState<Team | null>(null);
  const [copaGroups, setCopaGroups] = useState<CopaGroup[]>([]);
  const [copaMatchQueue, setCopaMatchQueue] = useState<Team[]>([]);
  const [currentCopaOpponent, setCurrentCopaOpponent] = useState<Team | null>(null);

  // AutoSave State
  const [isSaving, setIsSaving] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const saveTimeoutRef = useRef<number | null>(null);

  // Audio Reference
  const audioRef = useRef<HTMLAudioElement>(null);

  const TOTAL_MATCH_DAYS = (teams.length - 1);

  // Load game state from localStorage on initial render
  useEffect(() => {
    try {
        const savedData = localStorage.getItem('footballManagerSaveData');
        if (savedData) {
            const gameState = JSON.parse(savedData);
            if (gameState.selectedTeam) {
                setSelectedTeam(gameState.selectedTeam);
                setNewsArticles(gameState.newsArticles || []);
                setMatchDay(gameState.matchDay || 1);
                setLeagueTable(gameState.leagueTable || []);
                setFriendlyMatchScheduled(gameState.friendlyMatchScheduled || false);
                setMarketPlayers(gameState.marketPlayers || getMarketPlayers());
                setYouthPlayers(gameState.youthPlayers || getYouthPlayers());
                setSquad(gameState.squad || getInitialSquad());
                setLeagueMatchCycleIndex(gameState.leagueMatchCycleIndex || 0);
                setBudget(gameState.budget === undefined ? 10000000 : gameState.budget);
                setTrophies(gameState.trophies || []);
                setSocialFeed(gameState.socialFeed || []);
                setFutGramFeed(gameState.futGramFeed || []);
                setFanApproval(gameState.fanApproval || 70);
                setTeamMorale(gameState.teamMorale || 75);
                setCareerPlayer(gameState.careerPlayer || null);
                setVolume(gameState.volume === undefined ? 0.3 : gameState.volume);
            }
        }
    } catch (error) {
        console.error("Failed to load game state:", error);
        localStorage.removeItem('footballManagerSaveData');
    } finally {
        setIsLoaded(true);
    }
  }, []);

  // Debounced auto-save effect
  useEffect(() => {
    if (!isLoaded || !selectedTeam) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = window.setTimeout(() => {
        setIsSaving(true);
        const gameState = {
            selectedTeam, newsArticles, matchDay, leagueTable, friendlyMatchScheduled, 
            marketPlayers, youthPlayers, squad, leagueMatchCycleIndex, budget, trophies, 
            socialFeed, futGramFeed, fanApproval, teamMorale, careerPlayer, volume,
        };

        try {
            localStorage.setItem('footballManagerSaveData', JSON.stringify(gameState));
        } catch (error) {
            console.error("Failed to save game state:", error);
        }

        setTimeout(() => setIsSaving(false), 1500);
    }, 2000);

    return () => {
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [
      selectedTeam, newsArticles, matchDay, leagueTable, friendlyMatchScheduled, 
      marketPlayers, youthPlayers, squad, leagueMatchCycleIndex, budget, trophies, 
      socialFeed, futGramFeed, fanApproval, teamMorale, careerPlayer, isLoaded, volume
  ]);


  // Super Mudança: Música toca em todas as telas para imersão total
  const isMusicScreen = (screen: string) => {
    return true; 
  };

  // Background Music Logic
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = volume;
        
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
  }, [activeScreen, volume]);

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
    if (selectedTeam && leagueTable.length === 0 && !isLoaded) { // Only run for new games
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
  }, [selectedTeam, isLoaded, leagueTable.length]);

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
      icon: <GlobeIcon />,
      bgColor: 'bg-cyan-100',
      iconColor: 'text-cyan-600',
      title: 'Copa das Américas',
      subtitle: 'Dispute a glória continental',
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
      subtitle: 'Treinar e promover promessas',
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
    {
      icon: <SettingsIcon />,
      bgColor: 'bg-gray-100',
      iconColor: 'text-gray-600',
      title: 'Configurações',
      subtitle: 'Ajustar volume e outras opções',
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
    
    // Add new youth player after every match
    const newYouthPlayer = generateRandomPlayer(`youth-${Date.now()}`, false, 17, 21);
    setYouthPlayers(prev => [newYouthPlayer, ...prev]);

    const isFriendly = activeScreen === 'AssistindoAmistoso';

    let userScore, opponentScore;
    
    // Determine opponent for league matches
    const availableOpponents = teams.filter(t => t.id !== selectedTeam.id);
    const opponentTeam = isFriendly 
        ? availableOpponents[Math.floor(Math.random() * availableOpponents.length)]
        : availableOpponents[(matchDay - 1) % availableOpponents.length];

    if (isFriendly) {
      userScore = Math.floor(Math.random() * 4);
      opponentScore = Math.floor(Math.random() * 4);
    } else {
      // Simple win/loss cycle for league games
      const outcome = leagueMatchCycleIndex;
      if (outcome < 2) { // Win
        userScore = Math.floor(Math.random() * 2) + 2;
        opponentScore = Math.floor(Math.random() * 2);
      } else { // Loss
        userScore = Math.floor(Math.random() * 2);
        opponentScore = Math.floor(Math.random() * 2) + 2;
      }
    }

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
        let finalTable: TableEntry[] = [];
        setLeagueTable(prevTable => {
            const updatedTable = prevTable.map(entry => {
                if (entry.teamId === selectedTeam.id) {
                    return {
                    ...entry, played: entry.played + 1, wins: entry.wins + (userScore > opponentScore ? 1 : 0),
                    draws: entry.draws + (userScore === opponentScore ? 1 : 0), losses: entry.losses + (userScore < opponentScore ? 1 : 0),
                    goalsFor: entry.goalsFor + userScore, goalsAgainst: entry.goalsAgainst + opponentScore,
                    goalDifference: entry.goalDifference + (userScore - opponentScore),
                    points: entry.points + (userScore > opponentScore ? 3 : userScore === opponentScore ? 1 : 0),
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
            finalTable = [...updatedTable].sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference);
            return updatedTable;
        });
        
        // --- Season End Logic ---
        if (matchDay >= TOTAL_MATCH_DAYS) {
            setTimeout(() => { // Delay to allow state to update before checking
                const champion = finalTable[0];
                if (champion && champion.teamId === selectedTeam.id) {
                    const hasAlreadyWon = trophies.some(t => t.name === 'Brasileirão Série A' && t.year === 2024);
                    if (!hasAlreadyWon) {
                        setChampionModalInfo({ competition: 'Brasileirão Série A', team: selectedTeam });
                        const newTrophy: Trophy = {
                            id: `trophy-${Date.now()}`, name: 'Brasileirão Série A', year: 2024,
                            dateEarned: new Date().toLocaleDateString()
                        };
                        setTrophies(prev => [...prev, newTrophy]);
                    }
                }
                alert("Fim da temporada! A tabela será reiniciada.");
                setMatchDay(1);
                setLeagueTable(prev => prev.map(t => ({ ...t, played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0 })));
            }, 500);
        } else {
            setMatchDay(prev => prev + 1);
        }

        setLeagueMatchCycleIndex(prev => (prev + 1) % 3);
    }
    
    // FIX: Correctly pass opponentTeamName to the newMatchContext object.
    const newMatchContext: LastMatchContext = { userScore, opponentScore, opponentName: opponentTeamName, isFriendly, result };
    setNewsArticles(prev => [newArticle, ...prev]);
    setLastMatchContext(newMatchContext);
    setSocialFeed(generateSocialFeed(newMatchContext, selectedTeam.name));
    setFutGramFeed(generateFutGramFeed());
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

  const handleFutGramComment = async (postId: string, comment: string) => {
       setFutGramFeed(prev => prev.map(post => 
          post.id === postId ? { ...post, userComment: comment, commentsCount: post.commentsCount + 1 } : post
      ));

      try {
        const prompt = `Você é um jogador de futebol profissional respondendo a um comentário de um fã em sua postagem no FutGram. Seja breve, casual e realista. O comentário do fã foi: "${comment}". Responda em português.`;
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        
        const playerReply = response.text || "Valeu pelo apoio! Tamo junto!";

        setFutGramFeed(prev => prev.map(post =>
            post.id === postId ? { ...post, authorResponse: playerReply } : post
        ));

      } catch (e) {
          console.error("Gemini API error:", e);
          // Fallback response
          setFutGramFeed(prev => prev.map(post =>
            post.id === postId ? { ...post, authorResponse: "Obrigado pelo carinho!" } : post
          ));
      }
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

      // Decrease contract weeks for all players
      setSquad(prevSquad => prevSquad.map(player => ({
          ...player,
          contractWeeks: Math.max(0, (player.contractWeeks || 0) - 1)
      })));

      const formattedTotal = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalSalary);
      alert(`Semana pulada!\n\nSalários pagos: ${formattedTotal}\nOs contratos dos jogadores foram reduzidos em 1 semana.`);
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
    } else if (title === 'Copa das Américas') {
      setActiveScreen('CopaTeamSelection');
    } else if (title === 'Configurações') {
      setActiveScreen('Configurações');
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

  const handleSellPlayer = (playerId: string, price: number) => {
    setSquad(prev => prev.filter(p => p.id !== playerId));
    setBudget(prev => prev + price);
    alert(`Jogador vendido com sucesso por ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)}!`);
  };

  const handleLoanPlayer = (playerId: string, fee: number) => {
    setSquad(prev => prev.filter(p => p.id !== playerId));
    setBudget(prev => prev + fee); // simplified: one-time fee
    alert(`Jogador emprestado com sucesso! Taxa de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(fee)} recebida.`);
  };

  const handleRenewContract = (playerToRenew: Player, newSalary: number, newContractWeeks: number) => {
    setSquad(prev => prev.map(p => 
      p.id === playerToRenew.id 
        ? { ...p, salary: newSalary, contractWeeks: newContractWeeks } 
        : p
    ));
    alert(`Contrato de ${playerToRenew.name} renovado com sucesso!`);
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
  
  // --- Copa das Américas Logic ---
  const setupCopaTournament = (userTeam: Team) => {
    const allCopaTeams = getCopaTeams(userTeam);
    
    // Create 5 groups of 5
    const groups: CopaGroup[] = [];
    const groupNames = ['A', 'B', 'C', 'D', 'E'];
    for (let i = 0; i < 5; i++) {
        groups.push({
            name: groupNames[i],
            teams: allCopaTeams.slice(i * 5, (i + 1) * 5)
        });
    }
    setCopaGroups(groups);

    // Find user's group and set up match queue
    const userGroup = groups.find(g => g.teams.some(t => t.id === userTeam.id));
    if (userGroup) {
        const opponents = userGroup.teams.filter(t => t.id !== userTeam.id);
        
        // Find a strong opponent for the final from another group
        const otherGroups = groups.filter(g => g.name !== userGroup.name);
        const finalOpponent = otherGroups[0].teams[0]; // Simple selection for demo
        
        setCopaMatchQueue([...opponents, finalOpponent]);
    }
  };

  const handleSelectCopaTeam = (team: Team) => {
    setCopaUserTeam(team);
    setupCopaTournament(team);
    setActiveScreen('CopaGroupStage');
  };

  const handlePlayNextCopaMatch = () => {
    const nextOpponent = copaMatchQueue[0];
    setCurrentCopaOpponent(nextOpponent);
    setActiveScreen('CopaMatch');
  };

  const handleCopaMatchEnd = () => {
    // Force a win for the user in Copa matches for simplicity
    const remainingMatches = copaMatchQueue.slice(1);
    
    const newYouthPlayer = generateRandomPlayer(`youth-${Date.now()}`, false, 17, 21);
    setYouthPlayers(prev => [newYouthPlayer, ...prev]);

    setCopaMatchQueue(remainingMatches);

    if (remainingMatches.length === 0) {
      // Champion!
      setChampionModalInfo({ competition: 'Copa das Américas', team: copaUserTeam! });
      const newTrophy: Trophy = {
          id: `trophy-copa-${Date.now()}`,
          name: 'Copa das Américas',
          year: 2024,
          dateEarned: new Date().toLocaleDateString()
      };
      setTrophies(prev => [...prev, newTrophy]);
    } else {
      // Back to group stage screen
      setActiveScreen('CopaGroupStage');
    }
  };

  const resetCopaState = () => {
      setCopaUserTeam(null);
      setCopaGroups([]);
      setCopaMatchQueue([]);
      setCurrentCopaOpponent(null);
  }

  const handleCloseChampionModal = () => {
      setChampionModalInfo(null);
      if (activeScreen === 'CopaMatch') {
          resetCopaState();
          setActiveScreen('Início');
      }
  };


  if (!isLoaded) {
    // Show a loading screen or null while loading from localStorage
    return <div className="flex items-center justify-center h-screen bg-slate-800 text-white font-bold">CARREGANDO JOGO...</div>;
  }
  
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
      case 'Elenco': return <SquadScreen squad={squad} onBack={() => setActiveScreen('Início')} onSellPlayer={handleSellPlayer} onLoanPlayer={handleLoanPlayer} onRenewContract={handleRenewContract} />;
      case 'Mercado': return <MarketScreen players={marketPlayers} onBack={() => setActiveScreen('Início')} onUpdate={handleUpdateMarket} onHire={handleHirePlayer} />;
      case 'CategoriasBase': return <YouthAcademyScreen players={youthPlayers} onBack={() => setActiveScreen('Início')} onHire={handleHirePlayer} />;
      case 'SalaTrofeus': return <TrophyRoomScreen trophies={trophies} onBack={() => setActiveScreen('Início')} />;
      case 'Coletiva': return <PressConferenceScreen onBack={() => setActiveScreen('Jogar')} lastMatch={lastMatchContext} />;
      case 'Social': return <SocialScreen feed={socialFeed} futGramFeed={futGramFeed} onReply={handleSocialReply} onLike={handleSocialLike} onFutGramComment={handleFutGramComment} />;
      case 'Configurações': return <SettingsScreen onBack={() => setActiveScreen('Início')} volume={volume} onVolumeChange={setVolume} />;
      
      case 'CareerCreation': return <CareerCreationScreen onBack={() => setActiveScreen('Início')} onCreate={handleCreateCareerPlayer} />;
      case 'CareerAmateurGame': return <GameScreen userTeam={{id: 'amateur', name: 'Time da Peneira', logo: ''}} opponentTeam={{id: 'amateur_opp', name: 'Adversário', logo: ''}} onBack={() => setActiveScreen('Início')} onMatchEnd={handleCareerAmateurMatchEnd} isFriendly={true} />;
      case 'CareerOffers': return <CareerOfferScreen offers={getCareerOffers()} onSelectTeam={handleSelectCareerTeam} />;
      case 'CareerMenu': return careerPlayer ? <CareerMenuScreen player={careerPlayer} onPlayMatch={handlePlayCareerMatch} onExit={() => setActiveScreen('Início')} /> : <div>Erro</div>;
      case 'CareerGame':
          const currentCareerTeam = teams.find(t => t.id === careerPlayer?.teamId) || teams[0];
          const randomOpponent = teams.filter(t => t.id !== currentCareerTeam.id)[Math.floor(Math.random() * (teams.length - 1))];
          return <GameScreen userTeam={currentCareerTeam} opponentTeam={randomOpponent} onBack={() => setActiveScreen('CareerMenu')} onMatchEnd={handleCareerMatchEnd} isFriendly={true} isCareerMode={true} />;
      
      case 'Jogar': return <GameMenuScreen onStartMatch={() => setActiveScreen('AssistindoPartida')} isFriendlyMatchAvailable={friendlyMatchScheduled} onStartFriendlyMatch={() => setActiveScreen('AssistindoAmistoso')} onStart3dMatch={() => setActiveScreen('AssistindoPartida3D')} />;
      case 'AssistindoPartida': return <GameScreen userTeam={selectedTeam} opponentTeam={teams.filter(t => t.id !== selectedTeam.id)[(matchDay-1) % (teams.length-1)]} onBack={() => setActiveScreen('Jogar')} matchDay={matchDay} onMatchEnd={handleMatchEnd} isFriendly={false} />;
      case 'AssistindoAmistoso': return <GameScreen userTeam={selectedTeam} opponentTeam={teams.find(t => t.id !== selectedTeam.id)!} onBack={() => { setActiveScreen('Jogar'); setFriendlyMatchScheduled(false); }} onMatchEnd={handleMatchEnd} isFriendly={true} />;
      case 'AssistindoPartida3D': return <GameScreen3DPlaceholder onBack={() => setActiveScreen('Jogar')} />;
      
      // Copa das Américas Screens
      case 'CopaTeamSelection': return <CopaTeamSelectionScreen teams={teams} onSelectTeam={handleSelectCopaTeam} onBack={() => setActiveScreen('Início')} />;
      case 'CopaGroupStage': return copaUserTeam ? <CopaGroupStageScreen groups={copaGroups} userTeam={copaUserTeam} matchQueue={copaMatchQueue} onPlayNextMatch={handlePlayNextCopaMatch} onBack={() => { resetCopaState(); setActiveScreen('Início'); }} /> : null;
      case 'CopaMatch': return (copaUserTeam && currentCopaOpponent) ? <GameScreen userTeam={copaUserTeam} opponentTeam={currentCopaOpponent} onBack={() => setActiveScreen('CopaGroupStage')} onMatchEnd={handleCopaMatchEnd} isFriendly={true} headerText={copaMatchQueue.length === 0 ? "Final da Copa" : "Copa das Américas"} /> : null;

      case 'Início':
      default:
        return (
           <div className="p-4 relative min-h-full overflow-hidden bg-gray-900">
             
            {/* New Year Theme */}
            <div className="absolute inset-0 overflow-hidden z-0">
                {/* Static Stars */}
                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-50"></div>
                <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-white rounded-full opacity-70"></div>
                <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full opacity-60"></div>
                
                {/* Animated Fireworks */}
                <div className="absolute top-[20%] left-[15%] w-1 h-1 bg-yellow-300 rounded-full shadow-[0_0_10px_3px_#fef08a] animate-ping opacity-75" style={{ animationDuration: '3s', animationDelay: '0.5s'}}></div>
                <div className="absolute top-[10%] right-[20%] w-2 h-2 bg-pink-400 rounded-full shadow-[0_0_12px_4px_#f472b6] animate-ping opacity-75" style={{ animationDuration: '2.5s', animationDelay: '1s'}}></div>
                <div className="absolute top-[40%] left-[50%] w-1 h-1 bg-cyan-300 rounded-full shadow-[0_0_15px_3px_#67e8f9] animate-ping" style={{ animationDuration: '4s', animationDelay: '0.2s'}}></div>
            </div>

             <div className="relative z-10 px-4">
                 <div className="text-center my-6">
                     <h1 className="text-4xl font-extrabold text-white">FELIZ</h1>
                     <h2 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-500">2026</h2>
                 </div>
                 {/* Simple Budget Display */}
                 <div className="mb-4 px-2 flex justify-between items-center text-sm font-semibold text-gray-300 bg-black/30 rounded-lg p-2 backdrop-blur-sm border border-white/10">
                     <span>Caixa do Clube:</span>
                     <span className={budget < 0 ? 'text-red-400' : 'text-green-400'}>
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
      
      {championModalInfo && (
          <ChampionModal 
            team={championModalInfo.team} 
            competition={championModalInfo.competition} 
            onClose={handleCloseChampionModal} 
          />
      )}
      <AutoSaveToast isVisible={isSaving} />
    </div>
  );
};

export default App;
