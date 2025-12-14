
import type { Player } from '../types';

const firstNames = ['Lucas', 'Gabriel', 'Arthur', 'Davi', 'Pedro', 'Bernardo', 'Heitor', 'Rafael', 'Enzo', 'Nicolas', 'João', 'Felipe', 'Thiago', 'Vinicius', 'Eduardo', 'Matheus', 'Gustavo'];
const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Ribeiro', 'Martins', 'Carvalho', 'Costa', 'Almeida', 'Nascimento'];
const positions: Player['position'][] = ['GOL', 'DEF', 'MEI', 'ATA'];

export const generateRandomPlayer = (id: number | string, isSquadPlayer: boolean = false, minAge: number = 18, maxAge: number = 31): Player => {
  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  const age = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge; 
  const position = positions[Math.floor(Math.random() * positions.length)];
  const skill = Math.floor(Math.random() * 50) + 50; // 50-99
  const value = (skill * 10000) + (Math.floor(Math.random() * 5000));
  
  const player: Player = {
    id: `player-${id}-${Date.now()}-${Math.random()}`,
    name,
    age,
    position,
    skill,
    value,
  };

  if (isSquadPlayer) {
    player.salary = Math.floor((value / 100) + (Math.random() * 500));
    player.contractWeeks = [26, 52, 104, 156][Math.floor(Math.random() * 4)];
  }

  return player;
};

export const getInitialSquad = (count: number = 10): Player[] => {
    const players: Player[] = [];
    for (let i = 0; i < count; i++) {
        players.push(generateRandomPlayer(i, true));
    }
    return players.sort((a,b) => b.skill - a.skill);
}

export const getMarketPlayers = (count: number = 15): Player[] => {
    const players: Player[] = [];
    for (let i = 0; i < count; i++) {
        players.push(generateRandomPlayer(i));
    }
    return players.sort((a,b) => b.skill - a.skill);
}

export const getYouthPlayers = (count: number = 8): Player[] => {
    const players: Player[] = [];
    for (let i = 0; i < count; i++) {
        // Generates players between 17 and 29 years old
        players.push(generateRandomPlayer(`youth-${i}`, false, 17, 29));
    }
    return players.sort((a,b) => b.skill - a.skill);
}
