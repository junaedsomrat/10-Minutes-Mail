import { useEffect, useState } from 'react';

interface CircularTimerProps {
  totalSeconds: number;
  remainingSeconds: number;
  onExpired: () => void;
}

export default function CircularTimer({ totalSeconds, remainingSeconds, onExpired }: CircularTimerProps) {
  const [pulse, setPulse] = useState(false);
  
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = remainingSeconds / totalSeconds;
  const offset = circumference * (1 - progress);
  
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  
  const isUrgent = remainingSeconds <= 60;
  const isWarning = remainingSeconds <= 180 && !isUrgent;

  useEffect(() => {
    if (remainingSeconds <= 0) {
      onExpired();
    }
  }, [remainingSeconds, onExpired]);

  useEffect(() => {
    if (isUrgent) {
      const interval = setInterval(() => {
        setPulse(p => !p);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isUrgent]);

  const getColor = () => {
    if (isUrgent) return { stroke: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', text: 'text-red-500' };
    if (isWarning) return { stroke: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', text: 'text-amber-500' };
    return { stroke: '#6366f1', bg: 'rgba(99, 102, 241, 0.1)', text: 'text-indigo-500' };
  };

  const colors = getColor();

  return (
    <div className="relative flex flex-col items-center">
      <div className={`relative ${isUrgent && pulse ? 'scale-105' : 'scale-100'} transition-transform duration-300`}>
        <svg width="136" height="136" viewBox="0 0 120 120" className="-rotate-90">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="rgba(148, 163, 184, 0.15)"
            strokeWidth="8"
          />
          {/* Glow effect */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            opacity="0.2"
            className="timer-circle"
            style={{ filter: 'blur(4px)' }}
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="timer-circle"
          />
          {/* End dot */}
          {remainingSeconds > 0 && (
            <circle
              cx={60 + radius * Math.cos(2 * Math.PI * progress - Math.PI / 2)}
              cy={60 + radius * Math.sin(2 * Math.PI * progress - Math.PI / 2)}
              r="4"
              fill={colors.stroke}
              className="animate-pulse-ring"
            />
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold tabular-nums tracking-tight ${colors.text}`}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-xs text-slate-400 mt-1 font-medium uppercase tracking-wider">remaining</span>
        </div>
      </div>
    </div>
  );
}
