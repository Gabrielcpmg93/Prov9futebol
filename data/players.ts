
import type { Player } from '../types';

const firstNames = ['Lucas', 'Gabriel', 'Arthur', 'Davi', 'Pedro', 'Bernardo', 'Heitor', 'Rafael', 'Enzo', 'Nicolas', 'João', 'Felipe', 'Thiago', 'Vinicius', 'Eduardo'];
const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Ribeiro', 'Martins', 'Carvalho', 'Costa', 'Almeida'];
const positions: Player['position'][] = ['GOL', 'DEF', 'MEI', 'ATA'];

const generateRandomPlayer = (id: number, isSquadPlayer: boolean = false): Player => {
  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  const age = Math.floor(Math.random() * 14) + 18; // 18-31
  const position = positions[Math.floor(Math.random() * positions.length)];
  const skill = Math.floor(Math.random() * 50) + 50; // 50-99
  const value = (skill * 10000) + (Math.floor(Math.random() * 5000));
  
  const player: Player = {
    id: `player-${id}-${Date.now()}`,
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
