
import React, { useState } from 'react';
import type { CalendarScreenProps } from '../types';

const CalendarScreen: React.FC<CalendarScreenProps> = ({ onBack, onSchedule }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  const endDate = new Date(endOfMonth);
  endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dates: Date[] = [];
  let date = new Date(startDate);
  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  const isDateInPast = (date: Date) => date < today;

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSchedule = () => {
    if (selectedDate) {
      onSchedule();
    }
  };

  const isButtonDisabled = !selectedDate || isDateInPast(selectedDate);

  const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <div className="flex flex-col h-full p-4 bg-white">
      <header className="flex items-center justify-between mb-6">
         <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800">
                {monthNames[currentDate.getMonth()].toUpperCase().slice(0, 3)}.
            </h1>
            <p className="text-sm text-gray-500">{currentDate.getFullYear()}</p>
        </div>
        <div className="flex items-center space-x-2">
            <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                className="p-1 rounded-full hover:bg-gray-100"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                className="p-1 rounded-full hover:bg-gray-100"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
      </header>
      <main className="flex-grow">
        <div className="grid grid-cols-7 gap-y-2 text-center text-sm font-semibold text-gray-500 mb-4">
          {weekDays.map((day, i) => (
            <div key={i} className={day === 'D' ? 'text-red-500' : ''}>{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-4">
          {dates.map((d) => {
            const isCurrentMonth = d.getMonth() === currentDate.getMonth();
            const isToday = d.getTime() === today.getTime();
            const isSelected = selectedDate && d.getTime() === selectedDate.getTime();

            let dayClass = 'w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer ';
            if (isCurrentMonth) {
              if (isSelected) {
                dayClass += 'bg-green-500 text-white font-bold';
              } else if (isToday) {
                dayClass += 'bg-gray-800 text-white font-bold';
              } else {
                 dayClass += 'text-gray-800 hover:bg-gray-100';
              }
              if (d.getDay() === 0) dayClass += !isSelected && !isToday ? ' text-red-500' : '';
            } else {
              dayClass += 'text-gray-300';
            }

            return (
              <div key={d.toString()} className="flex justify-center">
                <button onClick={() => handleSelectDate(d)} className={dayClass}>
                  {d.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </main>
      <footer className="mt-6">
        <button
          onClick={handleSchedule}
          disabled={isButtonDisabled}
          className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-green-600 transition-colors shadow-md disabled:bg-gray-400 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          Agendar Amistoso
        </button>
        {isButtonDisabled && selectedDate && isDateInPast(selectedDate) && (
            <p className="text-xs text-red-500 mt-2 text-center">
                Não é possível agendar jogos em datas passadas.
            </p>
        )}
      </footer>
    </div>
  );
};

export default CalendarScreen;
