import React, { useState } from 'react';
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, Medal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { leaderboard } from '../data/mockData';
import { LeaderboardFilter, TimeFilter } from '../types';
import { StatusIndicator } from '../components/StatusIndicator';

export const Leaderboard: React.FC = () => {
  const [filter, setFilter] = useState<LeaderboardFilter>('global');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');

  const formatHours = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h`;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return <Crown className="w-6 h-6 text-yellow-400" />;
    }
    if (rank === 2) {
      return <Medal className="w-6 h-6 text-slate-400" />;
    }
    if (rank === 3) {
      return <Medal className="w-6 h-6 text-amber-600" />;
    }
    return <span className="text-lg font-bold text-slate-400">#{rank}</span>;
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-emerald-400" />;
    }
    if (change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-400" />;
    }
    return <Minus className="w-4 h-4 text-slate-400" />;
  };

  const filteredLeaderboard = leaderboard.filter((entry) =>
    filter === 'friends' ? entry.user.isFriend : true
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-3 rounded-xl">
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Leaderboard</h1>
            <p className="text-slate-400">Top coders this week</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex gap-2 bg-slate-800/50 p-1 rounded-lg border border-slate-700/50">
            <button
              onClick={() => setFilter('global')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'global'
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Global
            </button>
            <button
              onClick={() => setFilter('friends')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'friends'
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Friends
            </button>
          </div>

          <div className="flex gap-2 bg-slate-800/50 p-1 rounded-lg border border-slate-700/50">
            <button
              onClick={() => setTimeFilter('week')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeFilter === 'week'
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeFilter('month')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeFilter === 'month'
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                timeFilter === 'all'
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Time
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {filteredLeaderboard.map((entry, index) => {
          const isTopThree = entry.rank <= 3;
          const timeValue =
            timeFilter === 'week'
              ? entry.timeThisWeek
              : timeFilter === 'month'
              ? entry.timeThisMonth
              : entry.user.stats.totalTime;

          return (
            <Link
              key={entry.user.id}
              to={`/profile/${entry.user.id}`}
              className={`block bg-slate-800/50 rounded-xl p-6 border transition-all hover:scale-[1.02] ${
                isTopThree
                  ? 'border-yellow-500/30 bg-gradient-to-r from-yellow-500/5 to-transparent'
                  : 'border-slate-700/50 hover:border-slate-600/50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 flex justify-center">
                  {getRankIcon(entry.rank)}
                </div>

                <div className="relative">
                  <img
                    src={entry.user.avatar}
                    alt={entry.user.name}
                    className={`w-16 h-16 rounded-full ${
                      isTopThree ? 'ring-4 ring-yellow-500/30' : 'ring-2 ring-slate-700'
                    }`}
                  />
                  <div className="absolute -bottom-1 -right-1">
                    <StatusIndicator status={entry.user.status} size="sm" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-slate-100">
                      {entry.user.name}
                    </h3>
                    {entry.user.isFriend && (
                      <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                        Friend
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400">
                    @{entry.user.username}
                  </p>
                  {entry.user.currentActivity && (
                    <p className="text-xs text-slate-500 mt-1">
                      Currently coding in {entry.user.currentActivity.language}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <span className="text-2xl font-bold text-slate-100">
                      {formatHours(timeValue)}
                    </span>
                    {getTrendIcon(entry.change)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{entry.user.stats.streak} day streak</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
