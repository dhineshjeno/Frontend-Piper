"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
const mockData_1 = require("../data/mockData");
const StatusIndicator_1 = require("./StatusIndicator");
const Navbar = () => {
    const location = (0, react_router_dom_1.useLocation)();
    const navItems = [
        { path: '/', icon: lucide_react_1.LayoutDashboard, label: 'Dashboard' },
        { path: '/leaderboard', icon: lucide_react_1.Trophy, label: 'Leaderboard' },
        { path: '/friends', icon: lucide_react_1.Users, label: 'Friends' },
        { path: `/profile/${mockData_1.currentUser.id}`, icon: lucide_react_1.User, label: 'Profile' },
        { path: '/settings', icon: lucide_react_1.Settings, label: 'Settings' },
    ];
    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };
    return (<nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <react_router_dom_1.Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <lucide_react_1.Code2 className="w-6 h-6 text-white"/>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              PiperCode
            </span>
          </react_router_dom_1.Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (<react_router_dom_1.Link key={item.path} to={item.path} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${active
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
                  <Icon className="w-5 h-5"/>
                  <span className="hidden md:inline font-medium">{item.label}</span>
                </react_router_dom_1.Link>);
        })}
          </div>

          <div className="flex items-center gap-3">
            <StatusIndicator_1.StatusIndicator status={mockData_1.currentUser.status} size="sm"/>
            <img src={mockData_1.currentUser.avatar} alt={mockData_1.currentUser.name} className="w-10 h-10 rounded-full ring-2 ring-indigo-500/50"/>
          </div>
        </div>
      </div>
    </nav>);
};
exports.Navbar = Navbar;
//# sourceMappingURL=Navbar.js.map