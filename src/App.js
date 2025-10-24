"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Navbar_1 = require("./components/Navbar");
const Dashboard_1 = require("./pages/Dashboard");
const Leaderboard_1 = require("./pages/Leaderboard");
const Friends_1 = require("./pages/Friends");
const Profile_1 = require("./pages/Profile");
const Settings_1 = require("./pages/Settings");
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Navbar_1.Navbar />
        <react_router_dom_1.Routes>
          <react_router_dom_1.Route path="/" element={<Dashboard_1.Dashboard />}/>
          <react_router_dom_1.Route path="/leaderboard" element={<Leaderboard_1.Leaderboard />}/>
          <react_router_dom_1.Route path="/friends" element={<Friends_1.Friends />}/>
          <react_router_dom_1.Route path="/profile/:id" element={<Profile_1.Profile />}/>
          <react_router_dom_1.Route path="/settings" element={<Settings_1.Settings />}/>
        </react_router_dom_1.Routes>
      </div>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
//# sourceMappingURL=App.js.map