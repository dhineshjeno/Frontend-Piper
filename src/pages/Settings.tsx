import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Bell, Lock, Music, Link as LinkIcon, Unlink, CheckCircle } from 'lucide-react';
import { getSpotifyAuthUrl, getTokens, clearTokens, getSpotifyStatus } from '../utils/spotify';

export const Settings: React.FC = () => {
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'integrations'>('integrations');

  useEffect(() => {
    // Check if Spotify is connected
    const tokens = getTokens();
    setSpotifyConnected(!!tokens);

    // If connected, fetch current track
    if (tokens) {
      const fetchSpotify = async () => {
        const track = await getSpotifyStatus();
        if (track) {
          setCurrentTrack(`${track.name} by ${track.artist}`);
        }
      };
      fetchSpotify();
    }
  }, []);

  const handleSpotifyConnect = () => {
    window.location.href = getSpotifyAuthUrl();
  };

  const handleSpotifyDisconnect = () => {
    clearTokens();
    setSpotifyConnected(false);
    setCurrentTrack(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-3 rounded-xl">
            <SettingsIcon className="w-8 h-8 text-slate-300" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Settings</h1>
            <p className="text-slate-400">Manage your account and preferences</p>
          </div>
        </div>

        {/* TABS - This is what you're missing! */}
        <div className="flex gap-2 bg-slate-800/50 p-1 rounded-lg border border-slate-700/50 w-fit mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'notifications'
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bell className="w-4 h-4" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'privacy'
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="w-4 h-4" />
            Privacy
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'integrations'
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            Integrations
          </button>
        </div>
      </div>

      {/* INTEGRATIONS TAB CONTENT - This is the Spotify section! */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          {/* Spotify Integration */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-500/20 p-3 rounded-xl">
                  <Music className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-100 mb-1">
                    Spotify Integration
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Show what you're listening to while coding. Your friends can see your current track in real-time!
                  </p>

                  {spotifyConnected ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Connected</span>
                      </div>
                      {currentTrack && (
                        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                          <p className="text-xs text-slate-500 mb-1">Currently Playing</p>
                          <p className="text-sm text-slate-200">{currentTrack}</p>
                        </div>
                      )}
                      <button
                        onClick={handleSpotifyDisconnect}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
                      >
                        <Unlink className="w-4 h-4" />
                        Disconnect Spotify
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleSpotifyConnect}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                    >
                      <Music className="w-4 h-4" />
                      Connect Spotify
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* VS Code Extension */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <SettingsIcon className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-100 mb-1">
                  VS Code Extension
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  Install the PiperCode extension to automatically track your coding activity
                </p>
                <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium border border-blue-500/30">
                  Download Extension
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other tabs remain the same */}
      {activeTab === 'profile' && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Display Name
              </label>
              <input
                type="text"
                defaultValue="Alex Chen"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <input
                type="text"
                defaultValue="alexchen"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Status Message
              </label>
              <input
                type="text"
                defaultValue="Building something cool 🚀"
                className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-200">Friend Requests</p>
                <p className="text-sm text-slate-400">Get notified when someone sends you a friend request</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </label>
            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-200">Activity Updates</p>
                <p className="text-sm text-slate-400">Get notified about friends' coding activities</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </label>
            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-200">Streak Reminders</p>
                <p className="text-sm text-slate-400">Daily reminder to keep your coding streak alive</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </label>
          </div>
        </div>
      )}

      {activeTab === 'privacy' && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-slate-100 mb-4">Privacy Settings</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-200">Show Online Status</p>
                <p className="text-sm text-slate-400">Let others see when you're coding</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </label>
            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-200">Show Spotify Status</p>
                <p className="text-sm text-slate-400">Display what you're listening to</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </label>
            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-200">Profile Visibility</p>
                <p className="text-sm text-slate-400">Make your profile visible to everyone</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 rounded" />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};