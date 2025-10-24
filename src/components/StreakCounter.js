"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreakCounter = void 0;
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const StreakCounter = ({ currentStreak, longestStreak, size = 'md', }) => {
    const sizeConfig = {
        sm: {
            icon: 'w-4 h-4',
            text: 'text-xl',
            label: 'text-xs',
            container: 'p-3',
        },
        md: {
            icon: 'w-6 h-6',
            text: 'text-3xl',
            label: 'text-sm',
            container: 'p-4',
        },
        lg: {
            icon: 'w-8 h-8',
            text: 'text-4xl',
            label: 'text-base',
            container: 'p-6',
        },
    };
    const config = sizeConfig[size];
    return (<div className={`bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl ${config.container} border border-orange-500/20`}>
      <div className="flex items-start gap-4">
        <div className="relative">
          <lucide_react_1.Flame className={`${config.icon} text-orange-500 animate-pulse`}/>
          <div className="absolute inset-0 blur-lg bg-orange-500/30 rounded-full"/>
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className={`${config.text} font-bold text-orange-400`}>
              {currentStreak}
            </span>
            <span className={`${config.label} text-slate-400`}>day streak</span>
          </div>
          <div className={`${config.label} text-slate-500 mt-1`}>
            Longest: {longestStreak} days
          </div>
        </div>
      </div>

      {currentStreak > 0 && (<div className="mt-3 pt-3 border-t border-orange-500/10">
          <div className={`${config.label} text-slate-400`}>
            {currentStreak < 7 && "Keep going! You're building momentum!"}
            {currentStreak >= 7 && currentStreak < 14 && "Amazing! One week down!"}
            {currentStreak >= 14 && currentStreak < 30 && "Incredible! You're on fire!"}
            {currentStreak >= 30 && "Unstoppable! You're a coding legend!"}
          </div>
        </div>)}
    </div>);
};
exports.StreakCounter = StreakCounter;
//# sourceMappingURL=StreakCounter.js.map