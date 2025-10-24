"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friends = void 0;
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const react_router_dom_1 = require("react-router-dom");
const mockData_1 = require("../data/mockData");
const StatusIndicator_1 = require("../components/StatusIndicator");
const LanguageBadge_1 = require("../components/LanguageBadge");
const ActivityFeed_1 = require("../components/ActivityFeed");
const mockData_2 = require("../data/mockData");
const Friends = () => {
    const [showAddFriend, setShowAddFriend] = (0, react_1.useState)(false);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const [requests, setRequests] = (0, react_1.useState)(mockData_1.friendRequests);
    const friends = mockData_1.users.filter((user) => user.isFriend);
    const friendActivities = mockData_2.activities.filter((activity) => friends.some((friend) => friend.id === activity.userId));
    const handleAcceptRequest = (requestId) => {
        setRequests(requests.filter((req) => req.id !== requestId));
    };
    const handleRejectRequest = (requestId) => {
        setRequests(requests.filter((req) => req.id !== requestId));
    };
    const formatTimeAgo = (timestamp) => {
        const seconds = Math.floor((Date.now() - timestamp) / 1000);
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60)
            return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24)
            return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-3 rounded-xl">
              <lucide_react_1.Users className="w-8 h-8 text-emerald-400"/>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-100">Friends</h1>
              <p className="text-slate-400">
                {friends.length} friend{friends.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button onClick={() => setShowAddFriend(!showAddFriend)} className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg border border-indigo-500/30 hover:bg-indigo-500/30 transition-all">
            <lucide_react_1.UserPlus className="w-5 h-5"/>
            <span className="font-medium">Add Friend</span>
          </button>
        </div>

        {showAddFriend && (<div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">
              Add a Friend
            </h3>
            <div className="flex gap-2">
              <input type="text" placeholder="Enter username or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
              <button className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium">
                Send Request
              </button>
            </div>
          </div>)}

        {requests.length > 0 && (<div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 mb-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">
              Friend Requests ({requests.length})
            </h3>
            <div className="space-y-3">
              {requests.map((request) => (<div key={request.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700/30">
                  <div className="flex items-center gap-3">
                    <img src={request.fromUser.avatar} alt={request.fromUser.name} className="w-12 h-12 rounded-full ring-2 ring-slate-700"/>
                    <div>
                      <p className="font-medium text-slate-200">
                        {request.fromUser.name}
                      </p>
                      <p className="text-sm text-slate-400">
                        @{request.fromUser.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleAcceptRequest(request.id)} className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-all">
                      <lucide_react_1.Check className="w-5 h-5"/>
                    </button>
                    <button onClick={() => handleRejectRequest(request.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all">
                      <lucide_react_1.X className="w-5 h-5"/>
                    </button>
                  </div>
                </div>))}
            </div>
          </div>)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {friends.map((friend) => (<react_router_dom_1.Link key={friend.id} to={`/profile/${friend.id}`} className="block bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img src={friend.avatar} alt={friend.name} className="w-16 h-16 rounded-full ring-2 ring-slate-700"/>
                  <div className="absolute -bottom-1 -right-1">
                    <StatusIndicator_1.StatusIndicator status={friend.status} size="md"/>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-100">
                        {friend.name}
                      </h3>
                      <p className="text-sm text-slate-400">
                        @{friend.username}
                      </p>
                    </div>
                    {!friend.isOnline && friend.lastSeen && (<div className="flex items-center gap-1 text-xs text-slate-500">
                        <lucide_react_1.Clock className="w-3 h-3"/>
                        <span>{formatTimeAgo(friend.lastSeen)}</span>
                      </div>)}
                  </div>

                  {friend.statusMessage && (<p className="text-sm text-slate-400 mb-3">
                      {friend.statusMessage}
                    </p>)}

                  {friend.currentActivity ? (<div className="flex flex-wrap items-center gap-3">
                      <LanguageBadge_1.LanguageBadge language={friend.currentActivity.language} size="sm"/>
                      <span className="text-sm text-slate-400">
                        Working on {friend.currentActivity.project}
                      </span>
                    </div>) : (<div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{friend.stats.streak} day streak</span>
                      <span>
                        {Math.floor(friend.stats.weekTime / 3600)}h this week
                      </span>
                    </div>)}
                </div>
              </div>
            </react_router_dom_1.Link>))}
        </div>

        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-semibold text-slate-100 mb-4">
            Friends Activity
          </h2>
          <ActivityFeed_1.ActivityFeed activities={friendActivities} maxItems={5}/>
        </div>
      </div>
    </div>);
};
exports.Friends = Friends;
//# sourceMappingURL=Friends.js.map