import React from 'react';
import { Zap } from 'lucide-react';

export const Header: React.FC = () => (
  <header className="flex items-center p-6 border-b border-white/10 bg-dark-900/50 backdrop-blur-sm sticky top-0 z-50">
    <div className="flex items-center gap-2 text-banana-400">
      <Zap className="w-6 h-6 fill-current" />
      <h1 className="text-xl font-bold tracking-tight text-white">Nano <span className="text-banana-400">Banana</span> Studio</h1>
    </div>
    <div className="ml-auto text-xs text-gray-500 font-mono bg-white/5 px-2 py-1 rounded border border-white/5">
      gemini-2.5-flash-image
    </div>
  </header>
);
