import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, Flame, Code2, Folder, TrendingUp, Users } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { users, projects, currentUser } from '../data/mockData';
import { StatusIndicator } from '../components/StatusIndicator';
import { LanguageBadge } from '../components/LanguageBadge';
import { StreakCounter } from '../components/StreakCounter';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = users.find((u) => u.id === id) || currentUser;
  const isOwnProfile = user.id === currentUser.id;
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'stats'>('overview');

  const formatHours = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h`;
  };

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });

  const mockWeekData = [3.5, 4.2, 5.1, 4.8, 6.3, 5.5, 4.5];

  const activityChartData = {
    labels: last7Days,
    datasets: [
      {
        label: 'Hours Coded',
        data: mockWeekData,
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#e2e8f0',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
          callback: (value: number) => `${value}h`,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
        },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl border border-slate-700/50 overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20" />

        <div className="px-8 pb-8">
          <div className="flex flex-col md:flex-row gap-6 -mt-16">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-2xl ring-4 ring-slate-900 object-cover"
              />
              <div className="absolute -bottom-2 -right-2">
                <StatusIndicator status={user.status} size="lg" />
              </div>
            </div>

            <div className="flex-1 mt-16 md:mt-0">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-100 mb-1">
                    {user.name}
                  </h1>
                  <p className="text-slate-400">@{user.username}</p>
                </div>
                {!isOwnProfile && (
                  <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {user.isFriend ? 'Remove Friend' : 'Add Friend'}
                  </button>
                )}
              </div>

              {user.statusMessage && (
                <p className="text-slate-300 mb-4">{user.statusMessage}</p>
              )}

              {user.currentActivity && (
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50 mb-4">
                  <p className="text-sm text-slate-400 mb-2">Currently working on</p>
                  <div className="flex items-center gap-3">
                    <Code2 className="w-5 h-5 text-indigo-400" />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-100">
                        {user.currentActivity.project}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <LanguageBadge
                          language={user.currentActivity.language}
                          size="sm"
                        />
                        <span className="text-xs text-slate-500">
                          in {user.currentActivity.ide}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">Total Time</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-100">
                    {formatHours(user.stats.totalTime)}
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Flame className="w-4 h-4" />
                    <span className="text-sm">Streak</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-100">
                    {user.stats.streak}
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Code2 className="w-4 h-4" />
                    <span className="text-sm">Languages</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-100">
                    {Object.keys(user.stats.languages).length}
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30">
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <Folder className="w-4 h-4" />
                    <span className="text-sm">Projects</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-100">
                    {Object.keys(user.stats.projects).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 bg-slate-800/50 p-1 rounded-lg border border-slate-700/50 w-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'overview'
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'projects'
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'stats'
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Statistics
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-6">
              <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                Activity This Week
              </h2>
              <div className="h-64">
                <Line data={activityChartData} options={chartOptions} />
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
              <h2 className="text-xl font-semibold text-slate-100 mb-4">
                Top Languages
              </h2>
              <div className="space-y-3">
                {Object.entries(user.stats.languages)
                  .sort(([, a], [, b]) => b - a)
                  .map(([language, time]) => {
                    const maxTime = Math.max(...Object.values(user.stats.languages));
                    const percentage = (time / maxTime) * 100;
                    return (
                      <div key={language}>
                        <div className="flex items-center justify-between mb-2">
                          <LanguageBadge language={language} size="sm" />
                          <span className="text-sm text-slate-400">
                            {formatHours(time)}
                          </span>
                        </div>
                        <div className="w-full bg-slate-900/50 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div>
            <StreakCounter
              currentStreak={user.stats.streak}
              longestStreak={user.stats.longestStreak}
              size="md"
            />
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-slate-100">
                  {project.name}
                </h3>
                <LanguageBadge language={project.language} size="sm" />
              </div>
              <p className="text-sm text-slate-400 mb-4">
                {project.description}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/30">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Time Spent</p>
                  <p className="text-lg font-semibold text-slate-200">
                    {formatHours(project.timeSpent)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Lines of Code</p>
                  <p className="text-lg font-semibold text-slate-200">
                    {project.linesOfCode?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-indigo-400" />
              <h3 className="text-lg font-semibold text-slate-100">
                This Week
              </h3>
            </div>
            <p className="text-3xl font-bold text-slate-100 mb-2">
              {formatHours(user.stats.weekTime)}
            </p>
            <p className="text-sm text-slate-400">
              Average: {formatHours(user.stats.weekTime / 7)} per day
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-semibold text-slate-100">
                This Month
              </h3>
            </div>
            <p className="text-3xl font-bold text-slate-100 mb-2">
              {formatHours(user.stats.monthTime)}
            </p>
            <p className="text-sm text-slate-400">
              Average: {formatHours(user.stats.monthTime / 30)} per day
            </p>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Flame className="w-6 h-6 text-orange-400" />
              <h3 className="text-lg font-semibold text-slate-100">
                Longest Streak
              </h3>
            </div>
            <p className="text-3xl font-bold text-slate-100 mb-2">
              {user.stats.longestStreak}
            </p>
            <p className="text-sm text-slate-400">
              days of consecutive coding
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
