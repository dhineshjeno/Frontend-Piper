import React from 'react';

interface StatusIndicatorProps {
  status: 'online' | 'coding' | 'idle';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  showLabel = false,
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const statusConfig = {
    online: {
      color: 'bg-emerald-500',
      label: 'Online',
      ring: 'ring-emerald-500/20',
    },
    coding: {
      color: 'bg-indigo-500',
      label: 'Coding',
      ring: 'ring-indigo-500/20',
    },
    idle: {
      color: 'bg-slate-400',
      label: 'Idle',
      ring: 'ring-slate-400/20',
    },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} ${config.color} rounded-full ring-4 ${config.ring} animate-pulse`}
        />
      </div>
      {showLabel && (
        <span className="text-sm text-slate-300">{config.label}</span>
      )}
    </div>
  );
};
