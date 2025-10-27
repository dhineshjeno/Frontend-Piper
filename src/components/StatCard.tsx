import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'primary',
}) => {
  const colorClasses = {
    primary: 'from-primary-500/10 to-emerald-500/10 border-primary-500/20 text-primary-400',
    emerald: 'from-emerald-500/10 to-green-500/10 border-emerald-500/20 text-emerald-400',
    blue: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-400',
    amber: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-400',
  };

  return (
    <div className={`card bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary}`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`p-3 rounded-lg bg-dark-800/50`}>
          <Icon className={`w-6 h-6 ${colorClasses[color as keyof typeof colorClasses]?.split(' ').pop()}`} />
        </div>
        {trend && (
          <div
            className={`text-xs font-medium px-2 py-1 rounded ${
              trend.isPositive
                ? 'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}
          >
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-slate-400 mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-100">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};