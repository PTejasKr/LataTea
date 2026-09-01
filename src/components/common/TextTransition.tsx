import React, { useState, useEffect } from 'react';

interface TextTransitionProps {
  phrases: string[];
  intervalMs?: number;
  className?: string;
  highlightWord?: boolean;
}

export const TextTransition: React.FC<TextTransitionProps> = ({
  phrases,
  intervalMs = 3200,
  className = '',
}) => {
  const [index, setIndex] = useState(0);
  const [animateState, setAnimateState] = useState<'enter' | 'exit'>('enter');

  useEffect(() => {
    if (phrases.length <= 1) return;

    const timer = setInterval(() => {
      setAnimateState('exit');
      setTimeout(() => {
        setIndex(prev => (prev + 1) % phrases.length);
        setAnimateState('enter');
      }, 400); // exit duration
    }, intervalMs);

    return () => clearInterval(timer);
  }, [phrases, intervalMs]);

  return (
    <span className={`inline-block transition-all duration-500 ease-out transform ${
      animateState === 'enter'
        ? 'opacity-100 translate-y-0 filter blur-0'
        : 'opacity-0 -translate-y-4 filter blur-[2px]'
    } ${className}`}>
      {phrases[index]}
    </span>
  );
};
