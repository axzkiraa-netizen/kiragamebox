/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Home, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Zap, 
  Puzzle, 
  Car, 
  Trophy, 
  Flag, 
  Gamepad2,
  ChevronDown
} from 'lucide-react';

const mainNav = [
  { name: 'All', icon: null, color: 'text-blue-400' },
  { name: 'Action', icon: Zap, color: 'text-orange-400' },
  { name: 'Puzzle', icon: Puzzle, color: 'text-purple-400' },
];

const categories = [
  { name: 'Racing', icon: Car, color: 'text-red-400' },
  { name: 'Sports', icon: Trophy, color: 'text-green-400' },
  { name: 'Strategy', icon: Flag, color: 'text-yellow-400' },
  { name: 'Adventure', icon: Gamepad2, color: 'text-cyan-400' },
];

export function Sidebar({ activeCategory, onSelectCategory }) {
  return (
    <aside className="w-52 border-r border-surface-800 h-screen sticky top-0 hidden lg:flex flex-col bg-surface-900 shadow-2xl z-40">
      <div className="p-4 flex flex-col h-full overflow-y-auto custom-scrollbar">
        <div 
          onClick={() => onSelectCategory('All')}
          className="flex items-center gap-2 mb-6 cursor-pointer group"
        >
          <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-brand-primary transition-colors flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
            kira.game
          </span>
        </div>

        <nav className="space-y-0.5">
          <div className="mb-2 px-2 text-[9px] font-bold text-slate-600 uppercase tracking-widest">Main</div>
          {mainNav.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            
            return (
              <motion.button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                whileHover={{ x: 3, backgroundColor: 'rgba(138, 43, 226, 0.1)' }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-brand-primary/20 text-brand-primary font-bold' 
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-brand-primary/10 rounded-lg border border-brand-primary/20"
                  />
                )}
                {Icon && <Icon className={`w-3 h-3 transition-colors relative z-10 ${isActive ? 'text-brand-primary' : 'group-hover:text-brand-primary'}`} />}
                <span className={`font-semibold text-[11px] relative z-10 ${!Icon ? 'ml-0' : ''}`}>
                  {cat.name === 'All' ? 'Home' : cat.name}
                </span>
              </motion.button>
            );
          })}

          <div className="mt-6 mb-2 px-2 text-[9px] font-bold text-slate-600 uppercase tracking-widest">Categories</div>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            
            return (
              <motion.button
                key={cat.name}
                onClick={() => onSelectCategory(cat.name)}
                whileHover={{ x: 3, backgroundColor: 'rgba(138, 43, 226, 0.1)' }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-brand-primary/20 text-brand-primary font-bold' 
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active-cat"
                    className="absolute inset-0 bg-brand-primary/10 rounded-lg border border-brand-primary/20"
                  />
                )}
                <Icon className={`w-3 h-3 transition-colors relative z-10 ${isActive ? 'text-brand-primary' : 'group-hover:text-brand-primary'}`} />
                <span className="font-semibold text-[11px] relative z-10">{cat.name}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
