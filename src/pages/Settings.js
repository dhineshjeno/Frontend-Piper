"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const mockData_1 = require("../data/mockData");
const Settings = () => {
    const [notifications, setNotifications] = (0, react_1.useState)({
        friendActivity: true,
        achievements: true,
        weeklyReport: true,
        leaderboardUpdates: false,
    });
    const [privacy, setPrivacy] = (0, react_1.useState)({
        showProfile: true,
        showActivity: true,
        showStats: false,
    });
    return (<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-slate-500/20 to-slate-600/20 p-3 rounded-xl">
            <lucide_react_1.Settings className="w-8 h-8 text-slate-400"/>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Settings</h1>
            <p className="text-slate-400">Manage your account and preferences</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-6">
            <lucide_react_1.User className="w-5 h-5 text-indigo-400"/>
            <h2 className="text-xl font-semibold text-slate-100">Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Display Name
              </label>
              <input type="text" defaultValue={mockData_1.currentUser.name} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <input type="text" defaultValue={mockData_1.currentUser.username} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Status Message
              </label>
              <input type="text" defaultValue={mockData_1.currentUser.statusMessage} placeholder="What are you working on?" className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>

            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium">
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-6">
            <lucide_react_1.Code2 className="w-5 h-5 text-indigo-400"/>
            <h2 className="text-xl font-semibold text-slate-100">VS Code Extension</h2>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/30 mb-4">
            <p className="text-sm text-slate-300 mb-3">
              Install the PiperCode extension to automatically track your coding activity.
            </p>
            <div className="bg-slate-800/50 rounded p-3 mb-3">
              <code className="text-sm text-emerald-400">
                ext install pipercode.activity-tracker
              </code>
            </div>
            <div className="flex items-start gap-2 text-sm text-slate-400">
              <lucide_react_1.Download className="w-4 h-4 mt-0.5 flex-shrink-0"/>
              <p>
                After installation, the extension will automatically start tracking your coding
                sessions, languages, and projects.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
              <span className="text-sm text-slate-300">Extension Status</span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium">
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
              <span className="text-sm text-slate-300">Last Sync</span>
              <span className="text-sm text-slate-400">2 minutes ago</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-6">
            <lucide_react_1.Bell className="w-5 h-5 text-indigo-400"/>
            <h2 className="text-xl font-semibold text-slate-100">Notifications</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (<div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    {key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())}
                  </p>
                  <p className="text-xs text-slate-500">
                    {key === 'friendActivity' &&
                'Get notified when friends start coding'}
                    {key === 'achievements' && 'Celebrate your coding milestones'}
                    {key === 'weeklyReport' && 'Receive weekly activity summary'}
                    {key === 'leaderboardUpdates' &&
                'Get updates on your leaderboard position'}
                  </p>
                </div>
                <button onClick={() => setNotifications({ ...notifications, [key]: !value })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`}/>
                </button>
              </div>))}
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-6">
            <lucide_react_1.Lock className="w-5 h-5 text-indigo-400"/>
            <h2 className="text-xl font-semibold text-slate-100">Privacy</h2>
          </div>

          <div className="space-y-4">
            {Object.entries(privacy).map(([key, value]) => (<div key={key} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    {key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase())}
                  </p>
                  <p className="text-xs text-slate-500">
                    {key === 'showProfile' && 'Allow others to view your profile'}
                    {key === 'showActivity' && 'Display your activity in friend feeds'}
                    {key === 'showStats' && 'Make your statistics publicly visible'}
                  </p>
                </div>
                <button onClick={() => setPrivacy({ ...privacy, [key]: !value })} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`}/>
                </button>
              </div>))}
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-red-500/20">
          <h2 className="text-xl font-semibold text-red-400 mb-4">Danger Zone</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors font-medium">
              Reset All Statistics
            </button>
            <button className="w-full px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors font-medium">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>);
};
exports.Settings = Settings;
//# sourceMappingURL=Settings.js.map