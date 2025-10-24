export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  status: 'online' | 'coding' | 'idle';
  statusMessage?: string;
  currentActivity: {
    language: string;
    project: string;
    ide: string;
    startTime?: number;
  } | null;
  stats: {
    totalTime: number;
    todayTime: number;
    weekTime: number;
    monthTime: number;
    streak: number;
    longestStreak: number;
    languages: { [key: string]: number };
    projects: { [key: string]: number };
  };
  isFriend?: boolean;
  isOnline?: boolean;
  lastSeen?: number;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  type: 'coding' | 'achievement' | 'friend' | 'milestone';
  language?: string;
  project?: string;
  duration?: number;
  timestamp: number;
  message: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  timeSpent: number;
  lastActive: number;
  linesOfCode?: number;
}

export interface FriendRequest {
  id: string;
  fromUser: User;
  timestamp: number;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface LeaderboardEntry {
  user: User;
  rank: number;
  timeThisWeek: number;
  timeThisMonth: number;
  change: number;
}

export type TimeFilter = 'week' | 'month' | 'all';
export type LeaderboardFilter = 'global' | 'friends';
