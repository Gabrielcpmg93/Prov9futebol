
import React from 'react';
import ActionListItem from './components/ActionListItem';
import QuickActionCard from './components/QuickActionCard';
import BottomNavBar from './components/BottomNavBar';
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
  ArrowRightIcon
} from './components/icons';
import type { ActionListItemData, QuickActionCardData } from './types';

const App: React.FC = () => {
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

  const quickActions: Omit<QuickActionCardData, 'onClick'>[] = [
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

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-slate-50 font-sans">
      <main className="flex-grow overflow-y-auto pb-24">
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
                onClick={() => alert(`${action.title} clicado!`)}
              />
            ))}
          </div>
        </div>
      </main>
      <BottomNavBar />
    </div>
  );
};

export default App;