/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { X, Maximize2, RotateCcw, Info } from 'lucide-react';

export function GamePlayer({ game, onClose }) {
  const resetGame = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe) iframe.src = game.iframeUrl;
  };

  const toggleFullscreen = () => {
    const container = document.getElementById('game-container');
    if (container?.requestFullscreen) {
      container.requestFullscreen();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-surface-900 flex flex-col"
    >
      <header className="h-14 px-4 border-b border-surface-800 flex items-center justify-between bg-surface-950 z-50">
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-surface-800 rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <h2 className="font-display font-bold text-sm text-white hidden sm:block tracking-tight">
              <span className="text-brand-primary mr-1.5">●</span>
              {game.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={resetGame}
            className="p-2 hover:bg-surface-800 rounded-lg transition-colors text-slate-400 hover:text-white"
            title="Restart Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button 
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-3 py-1.5 bg-brand-primary hover:bg-brand-primary/90 rounded-lg transition-all text-xs font-bold text-white shadow-[0_0_15px_rgba(138,43,226,0.3)] active:scale-95"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fullscreen</span>
          </button>
        </div>
      </header>

      <main className="flex-1 bg-black relative flex flex-col overflow-hidden">
        <div 
          id="game-container" 
          className="flex-1 w-full h-full relative"
        >
          <iframe
            id="game-iframe"
            src={game.iframeUrl}
            className="w-full h-full border-none"
            allow="autoplay; fullscreen; pointer-lock"
            title={game.title}
          />
        </div>
      </main>
    </motion.div>
  );
}
