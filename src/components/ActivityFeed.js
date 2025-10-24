"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityFeed = void 0;
const react_1 = require("react");
const LanguageBadge_1 = require("./LanguageBadge");
const lucide_react_1 = require("lucide-react");
const ActivityFeed = ({ activities, maxItems = 10, }) => {
    const getActivityIcon = (type) => {
        switch (type) {
            case 'coding':
                return <lucide_react_1.Clock className="w-4 h-4"/>;
            case 'achievement':
                return <lucide_react_1.Trophy className="w-4 h-4"/>;
            case 'friend':
                return <lucide_react_1.Users className="w-4 h-4"/>;
            case 'milestone':
                return <lucide_react_1.Target className="w-4 h-4"/>;
        }
    };
    const getActivityColor = (type) => {
        switch (type) {
            case 'coding':
                return 'bg-blue-500/10 text-blue-400';
            case 'achievement':
                return 'bg-yellow-500/10 text-yellow-400';
            case 'friend':
                return 'bg-emerald-500/10 text-emerald-400';
            case 'milestone':
                return 'bg-purple-500/10 text-purple-400';
        }
    };
    const formatTimeAgo = (timestamp) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        if (seconds < 60)
            return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60)
            return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24)
            return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };
    return (<div className="space-y-3">
      {activities.slice(0, maxItems).map((activity) => (<div key={activity.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 hover:border-slate-600/50 transition-all">
          <div className="flex items-start gap-3">
            <img src={activity.userAvatar} alt={activity.userName} className="w-10 h-10 rounded-full ring-2 ring-slate-700"/>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-slate-200">
                  {activity.userName}
                </span>
                <div className={`p-1 rounded ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
              </div>
              <p className="text-sm text-slate-400 mb-2">{activity.message}</p>
              {activity.language && (<div className="flex items-center gap-2 mb-2">
                  <LanguageBadge_1.LanguageBadge language={activity.language} size="sm"/>
                  {activity.project && (<span className="text-xs text-slate-500">
                      on {activity.project}
                    </span>)}
                </div>)}
              <span className="text-xs text-slate-500">
                {formatTimeAgo(activity.timestamp)}
              </span>
            </div>
          </div>
        </div>))}
    </div>);
};
exports.ActivityFeed = ActivityFeed;
//# sourceMappingURL=ActivityFeed.js.map