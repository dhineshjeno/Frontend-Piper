import React from 'react';
import { Clock, Code2, Folder, TrendingUp } from 'lucide-react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { currentUser, activities, projects } from '../data/mockData';
import { StatCard } from '../components/StatCard';
import { StreakCounter } from '../components/StreakCounter';
import { ActivityFeed } from '../components/ActivityFeed';
import { LanguageBadge } from '../components/LanguageBadge';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard: React.FC = () => {
  const formatHours = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h`;
  };

  const languageData = {
    labels: Object.keys(currentUser.stats.languages),
    datasets: [
      {
        data: Object.values(currentUser.stats.languages).map((s) =>
          Math.floor(s / 3600)
        ),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(6, 182, 212, 0.8)',
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(6, 182, 212, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const projectData = {
    labels: Object.keys(currentUser.stats.projects),
    datasets: [
      {
        label: 'Hours',
        data: Object.values(currentUser.stats.projects).map((s) =>
          Math.floor(s / 3600)
        ),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: '#94a3b8',
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
    },
  };

  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">
          Welcome back, {currentUser.name.split(' ')[0]}!
        </h1>
        <p className="text-slate-400">Here's your coding activity overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Today"
          value={formatHours(currentUser.stats.todayTime)}
          subtitle="Keep it up!"
          icon={Clock}
          color="indigo"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="This Week"
          value={formatHours(currentUser.stats.weekTime)}
          subtitle="7 days"
          icon={TrendingUp}
          color="emerald"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Languages"
          value={Object.keys(currentUser.stats.languages).length}
          subtitle="Active languages"
          icon={Code2}
          color="blue"
        />
        <StatCard
          title="Projects"
          value={Object.keys(currentUser.stats.projects).length}
          subtitle="In progress"
          icon={Folder}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">
              Language Distribution
            </h2>
            <div className="h-64">
              <Doughnut data={languageData} options={chartOptions} />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {Object.keys(currentUser.stats.languages).map((lang) => (
                <LanguageBadge key={lang} language={lang} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <StreakCounter
            currentStreak={currentUser.stats.streak}
            longestStreak={currentUser.stats.longestStreak}
            size="md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold text-slate-100 mb-4">
            Project Activity
          </h2>
          <div className="h-64">
            <Bar data={projectData} options={barChartOptions} />
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold text-slate-100 mb-4">
            Active Projects
          </h2>
          <div className="space-y-3">
            {projects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="p-4 bg-slate-900/50 rounded-lg border border-slate-700/30"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-200">
                    {project.name}
                  </h3>
                  <LanguageBadge language={project.language} size="sm" />
                </div>
                <p className="text-sm text-slate-400 mb-2">
                  {project.description}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{formatHours(project.timeSpent)} spent</span>
                  <span>{project.linesOfCode?.toLocaleString()} LOC</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-xl font-semibold text-slate-100 mb-4">
          Recent Activity
        </h2>
        <ActivityFeed activities={activities} maxItems={6} />
      </div>
    </div>
  );
};
