
import type { Team } from '../types';
import { teams as brazilianTeams } from './teams';

// Fictional South American Teams
const internationalTeams: Team[] = [
  { id: 'boc', name: 'Gigantes de La Boca', logo: '' }, // Argentina
  { id: 'riv', name: 'Millonarios de Nuñez', logo: '' }, // Argentina
  { id: 'ind', name: 'Diabos de Avellaneda', logo: '' }, // Argentina
  { id: 'pen', name: 'Carboneros de Montevideo', logo: '' }, // Uruguay
  { id: 'nac', name: 'Bolsilludos de Montevideo', logo: '' }, // Uruguay
  { id: 'oli', name: 'Decanos de Asunción', logo: '' }, // Paraguay
  { id: 'cer', name: 'Ciclón de Barrio Obrero', logo: '' }, // Paraguay
  { id: 'col', name: 'Caciques de Santiago', logo: '' }, // Chile
  { id: 'uni', name: 'Chunchos de Santiago', logo: '' }, // Chile
  { id: 'atl', name: 'Verdolagas de Medellín', logo: '' }, // Colombia
  { id: 'mil', name: 'Embajadores de Bogotá', logo: '' }, // Colombia
  { id: 'ldu', name: 'Albos de Quito', logo: '' }, // Ecuador
  { id: 'bar', name: 'Ídolos del Astillero', logo: '' }, // Ecuador
];

// Shuffle array utility
const shuffle = <T>(array: T[]): T[] => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

export const getCopaTeams = (userTeam: Team): Team[] => {
  // Exclude the user's team from the pool of Brazilian teams to avoid duplicates
  const otherBrazilianTeams = brazilianTeams.filter(t => t.id !== userTeam.id);
  
  // Combine all teams
  const allTeams = [userTeam, ...otherBrazilianTeams, ...internationalTeams];
  
  // Shuffle and take the first 25 to ensure variety in each tournament
  const shuffledTeams = shuffle(allTeams);
  
  // Ensure the user's team is always in the final list
  const finalTeams = shuffledTeams.slice(0, 24);
  if (!finalTeams.find(t => t.id === userTeam.id)) {
    finalTeams.pop(); // remove one to make space
    finalTeams.push(userTeam);
  }

  return shuffle(finalTeams.slice(0,25)); // Final shuffle before returning 25 teams
};
