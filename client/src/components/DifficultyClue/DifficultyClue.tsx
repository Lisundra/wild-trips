import { styled } from '@chakra-ui/react';
import React, { useState } from 'react';

const DifficultyClue = ({ difficulty }) => {
  let tooltipText = '';
  let tooltipColor = '';
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  switch (difficulty) {
    case 'Низкая':
      tooltipText = 'Низкая: Подходит неподготовленным людям';
      tooltipColor = 'bg-gray-300';
      break;
    case 'Средняя':
      tooltipText = 'Средняя: Нужен инструктаж';
      tooltipColor = 'bg-gray-300';
      break;
    case 'Высокая':
      tooltipText = 'Высокая: Экипировка и спецподготовка';
      tooltipColor = 'bg-gray-300';
      break;
    default:
      tooltipText = 'Неизвестная сложность';
      tooltipColor = 'bg-gray-300';
  }

  return (
    <div className="relative flex items-center justify-center">
      <svg
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        className="w-6 h-6 text-gray-600 cursor-pointer"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 20 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div   style={{
        visibility: isHovered ? 'visible' : 'hidden',
        opacity: isHovered ? '1' : '0',
        transition: 'opacity 800ms, visibility 300ms',
      }}
  className={`absolute bottom-full mb-2 px-2 py-1 text-base text-slate-950 text-xs rounded ${tooltipColor}`}>
        {tooltipText}
      </div>
    </div>
  );
};

export default DifficultyClue;