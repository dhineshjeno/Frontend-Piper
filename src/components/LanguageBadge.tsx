import React from 'react';
import { Code2, FileCode, Terminal, Braces } from 'lucide-react';

interface LanguageBadgeProps {
  language: string;
  showIcon?: boolean;
  size?: 'sm' | 'md';
}

export const LanguageBadge: React.FC<LanguageBadgeProps> = ({
  language,
  showIcon = true,
  size = 'md',
}) => {
  const languageConfig: Record<string, { color: string; icon: React.ReactNode }> = {
    TypeScript: {
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: <Code2 className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
    },
    JavaScript: {
      color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      icon: <FileCode className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
    },
    Python: {
      color: 'bg-green-500/10 text-green-400 border-green-500/20',
      icon: <Terminal className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
    },
    Java: {
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      icon: <Braces className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
    },
    Go: {
      color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      icon: <Code2 className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
    },
    Rust: {
      color: 'bg-red-500/10 text-red-400 border-red-500/20',
      icon: <Terminal className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
    },
    Kotlin: {
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      icon: <FileCode className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
    },
    SQL: {
      color: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      icon: <Terminal className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
    },
    R: {
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      icon: <Code2 className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
    },
    CSS: {
      color: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      icon: <FileCode className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
    },
    HTML: {
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      icon: <Code2 className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
    },
    Shell: {
      color: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
      icon: <Terminal className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
    },
    YAML: {
      color: 'bg-red-500/10 text-red-400 border-red-500/20',
      icon: <FileCode className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
    },
  };

  const config = languageConfig[language] || {
    color: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    icon: <Code2 className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />,
  };

  const paddingClass = size === 'sm' ? 'px-2 py-1' : 'px-3 py-1.5';
  const textClass = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${paddingClass} ${textClass} font-medium rounded-full border ${config.color}`}
    >
      {showIcon && config.icon}
      <span>{language}</span>
    </div>
  );
};
