/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export function GameCard({ game, onClick }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -5 }}
      onClick={() => onClick(game)}
      className="group relative bg-surface-800 rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-brand-primary/40 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_30px_rgba(138,43,226,0.2)]"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-surface-900">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Play className="w-5 h-5 text-white fill-current ml-0.5" />
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <span className="px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded text-[9px] font-bold uppercase tracking-wider text-slate-200 border border-white/5">
            {game.category}
          </span>
        </div>
      </div>
      
      <div className="p-3">
        <h3 className="font-display font-bold text-sm text-slate-100 group-hover:text-brand-primary transition-colors line-clamp-1">
          {game.title}
        </h3>
      </div>
    </motion.div>
  );
}
