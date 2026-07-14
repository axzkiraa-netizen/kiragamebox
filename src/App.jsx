/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Gamepad2, TrendingUp, Sparkles, Filter, History } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { GameCard } from './components/GameCard';
import { GamePlayer } from './components/GamePlayer';
import gamesData from './data/games.json';

const RECENT_GAMES_KEY = 'kira_game_recent_played';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [recentGames, setRecentGames] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(RECENT_GAMES_KEY);
    if (saved) {
      try {
        setRecentGames(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent games', e);
      }
    }
  }, []);

  const addToRecent = (game) => {
    setRecentGames(prev => {
      const filtered = prev.filter(g => g.id !== game.id);
      const updated = [game, ...filtered].slice(0, 10);
      localStorage.setItem(RECENT_GAMES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    addToRecent(game);
  };

  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           game.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="flex min-h-screen bg-surface-950 text-slate-100 selection:bg-brand-primary/30">
      <Sidebar 
        activeCategory={activeCategory} 
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 px-6 lg:px-8 border-b border-surface-800 flex items-center justify-between sticky top-0 bg-surface-950/80 backdrop-blur-xl z-30">
          <div className="flex-1 max-w-2xl relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search for games..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-900 border border-transparent focus:bg-surface-800 focus:border-brand-primary/30 rounded-xl py-2 pl-10 pr-4 transition-all outline-none text-slate-200 placeholder:text-slate-600 text-sm"
            />
          </div>

          <div className="hidden sm:flex items-center gap-1.5 ml-4">
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-surface-800 rounded-lg transition-colors text-slate-400 font-bold text-[11px] uppercase tracking-wider hover:text-slate-200">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trending</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-surface-800 rounded-lg transition-colors text-slate-400 font-bold text-[11px] uppercase tracking-wider hover:text-slate-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>New</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Recently Played */}
              {activeCategory === 'All' && !searchQuery && recentGames.length > 0 && (
                <section className="mb-10">
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
                      <History className="w-4 h-4" />
                    </div>
                    <h2 className="text-lg font-display font-bold">Recently Played</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {recentGames.slice(0, 8).map((game) => (
                      <GameCard 
                        key={`recent-${game.id}`} 
                        game={game} 
                        onClick={handleGameSelect}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  {activeCategory !== 'All' && (
                    <div className="p-2 bg-brand-primary/10 rounded-lg text-brand-primary">
                      <Filter className="w-4 h-4" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-display font-bold">
                      {searchQuery ? `Results for "${searchQuery}"` : activeCategory === 'All' ? 'All Games' : `${activeCategory} Games`}
                    </h2>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">
                      {filteredGames.length} Games Available
                    </p>
                  </div>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredGames.map((game) => (
                    <GameCard 
                      key={game.id} 
                      game={game} 
                      onClick={handleGameSelect}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {filteredGames.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-14 h-14 bg-surface-900 rounded-2xl flex items-center justify-center mb-4 text-slate-700">
                    <Search className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">No games found</h3>
                  <p className="text-slate-600 text-sm">Try searching for something else.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="p-8 border-t border-surface-800 bg-surface-900/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-display font-bold text-lg text-white">
                  <span className="text-brand-primary mr-1">kira</span>.game
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-medium">
                The ultimate unblocked game portal. Designed for speed, built for fun.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 md:col-span-2">
              <div>
                <h4 className="font-bold mb-4 uppercase tracking-wider text-[10px] text-slate-500">Categories</h4>
                <ul className="space-y-2 text-[11px] text-slate-400">
                  <li className="hover:text-brand-primary cursor-pointer transition-colors">Action</li>
                  <li className="hover:text-brand-primary cursor-pointer transition-colors">Puzzle</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 uppercase tracking-wider text-[10px] text-slate-500">Links</h4>
                <ul className="space-y-2 text-[11px] text-slate-400">
                  <li className="hover:text-brand-primary cursor-pointer transition-colors">Contact</li>
                  <li className="hover:text-brand-primary cursor-pointer transition-colors">Privacy</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-surface-800 text-center text-[10px] text-slate-500">
            © 2026 kira.game. All rights reserved.
          </div>
        </footer>
      </main>

      {/* Overlays */}
      <AnimatePresence>
        {selectedGame && (
          <GamePlayer 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

