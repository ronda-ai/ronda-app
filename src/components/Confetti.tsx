'use client';

import { useConfettiStore } from '@/hooks/use-confetti';
import React from 'react';

const CONFETTI_COLORS = ['#7B68EE', '#98FB98', '#FFD700', '#FF69B4', '#1E90FF'];
const CONFETTI_COUNT = 50;

const Confetti: React.FC = () => {
  const { isVisible } = useConfettiStore();
  const [confetti, setConfetti] = React.useState<React.ReactNode[]>([]);

  React.useEffect(() => {
    if (isVisible) {
      const newConfetti = Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const left = `${Math.random() * 100}vw`;
        const animationDelay = `${Math.random() * 2}s`;
        const animationDuration = `${2 + Math.random() * 2}s`;
        return (
          <div
            key={i}
            className="confetti"
            style={{
              // @ts-ignore
              '--color': color,
              left,
              animationDelay,
              animationDuration,
            }}
          />
        );
      });
      setConfetti(newConfetti);
    } else {
      const timer = setTimeout(() => setConfetti([]), 4000); // clear confetti after animation ends
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible && confetti.length === 0) return null;

  return <div className="fixed inset-0 w-screen h-screen pointer-events-none z-[200]">{confetti}</div>;
};

export default Confetti;
