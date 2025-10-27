import React, { useEffect, useState } from 'react';
import { X, Music, Code2, Clock, Calendar, Flame, Headphones, ExternalLink } from 'lucide-react';
import { users } from '../data/mockData';
import { getSpotifyStatus } from '../utils/spotify';

interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  isPlaying: boolean;
  progress: number;
  duration: number;
  url: string;
}

interface UserProfileModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ userId, isOpen, onClose }) => {
  const [spotifyData, setSpotifyData] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  
  const user = users.find(u => u.id === userId);

  useEffect(() => {
    if (!isOpen || !user) return;

    // Fetch Spotify currently playing
    const fetchSpotifyStatus = async () => {
      try {
        const track = await getSpotifyStatus();
        setSpotifyData(track);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch Spotify data:', error);
        setLoading(false);
      }
    };

    fetchSpotifyStatus();
    const interval = setInterval(fetchSpotifyStatus, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isOpen, userId, user]);

  useEffect(() => {
    // Update progress bar smoothly
    if (!spotifyData?.isPlaying) return;

    const progressInterval = setInterval(() => {
      setSpotifyData(prev => {
        if (!prev || !prev.isPlaying) return prev;
        const newProgress = prev.progress + 1000; // Add 1 second
        if (newProgress >= prev.duration) return prev;
        return { ...prev, progress: newProgress };
      });
    }, 1000);

    return () => clearInterval(progressInterval);
  }, [spotifyData?.isPlaying]);

  if (!isOpen || !user) return null;

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatHours = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h`;
  };

  const formatCodingTime = (startTime: number) => {
    const elapsed = Date.now() - startTime;
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    return `${hours}h ${minutes}m elapsed`;
  };

  const progressPercentage = spotifyData
    ? (spotifyData.progress / spotifyData.duration) * 100
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700/50 w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors z-10"
        >
          <X className="w-5 h-5 text-slate-300" />
        </button>

        {/* Header Banner */}
        <div className="h-24 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30" />

        {/* Profile Section */}
        <div className="px-6 pb-6 -mt-12">
          <div className="relative w-20 h-20 mb-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full rounded-full ring-4 ring-slate-900 object-cover"
            />
            <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full ring-4 ring-slate-900 ${
              user.status === 'coding' ? 'bg-indigo-500 animate-pulse' :
              user.status === 'online' ? 'bg-emerald-500' : 'bg-slate-400'
            }`} />
          </div>

          <h2 className="text-2xl font-bold text-slate-100 mb-1">{user.name}</h2>
          <p className="text-slate-400 mb-4">@{user.username}</p>

          {user.statusMessage && (
            <p className="text-slate-300 mb-4 text-sm italic">"{user.statusMessage}"</p>
          )}

          {/* Current Activity */}
          {user.currentActivity && (
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4 border border-slate-700/50">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-500/20 p-2 rounded-lg">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                    Currently Coding
                  </p>
                  <p className="font-semibold text-slate-100 mb-1">
                    {user.currentActivity.project}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">
                      {user.currentActivity.language}
                    </span>
                    <span className="text-slate-500">in {user.currentActivity.ide}</span>
                  </div>
                  {user.currentActivity.startTime && (
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-2">
                      <Clock className="w-3 h-3" />
                      <span>{formatCodingTime(user.currentActivity.startTime)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Spotify Status */}
          {!loading && spotifyData && (
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg p-4 mb-4 border border-green-500/20">
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <img
                    src={spotifyData.albumArt}
                    alt={spotifyData.album}
                    className="w-14 h-14 rounded-lg"
                  />
                  {spotifyData.isPlaying && (
                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                      <Music className="w-3 h-3 text-white animate-pulse" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Headphones className="w-4 h-4 text-green-400" />
                    <p className="text-xs text-green-400 uppercase tracking-wide">
                      {spotifyData.isPlaying ? 'Listening to Spotify' : 'Paused on Spotify'}
                    </p>
                  </div>
                  <p className="font-semibold text-slate-100 truncate">
                    {spotifyData.name}
                  </p>
                  <p className="text-sm text-slate-400 truncate">
                    by {spotifyData.artist}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mt-2">
                    <div className="w-full bg-slate-700/50 rounded-full h-1">
                      <div
                        className={`bg-green-500 h-1 rounded-full transition-all ${
                          spotifyData.isPlaying ? 'duration-1000' : 'duration-0'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500 mt-1">
                      <span>{formatTime(spotifyData.progress)}</span>
                      <a
                        href={spotifyData.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 flex items-center gap-1"
                      >
                        <span>Open in Spotify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <span>{formatTime(spotifyData.duration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                <Clock className="w-3 h-3" />
              </div>
              <p className="text-lg font-bold text-slate-100">{formatHours(user.stats.totalTime)}</p>
              <p className="text-xs text-slate-500">Total Time</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                <Flame className="w-3 h-3" />
              </div>
              <p className="text-lg font-bold text-slate-100">{user.stats.streak}</p>
              <p className="text-xs text-slate-500">Day Streak</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-400 mb-1">
                <Calendar className="w-3 h-3" />
              </div>
              <p className="text-lg font-bold text-slate-100">{formatHours(user.stats.weekTime)}</p>
              <p className="text-xs text-slate-500">This Week</p>
            </div>
          </div>

          {/* View Profile Button */}
          <button 
            onClick={() => {
              window.location.href = `/profile/${user.id}`;
            }}
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors"
          >
            View Full Profile
          </button>
        </div>
      </div>
    </div>
  );
};