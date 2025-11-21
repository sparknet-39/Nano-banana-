import React, { useState } from 'react';
import { AspectRatio } from '../types';
import { Send, Square, RectangleHorizontal, RectangleVertical } from 'lucide-react';

interface GeneratorInputProps {
  onGenerate: (prompt: string, aspectRatio: AspectRatio) => void;
  loading: boolean;
}

const ASPECT_RATIOS: { value: AspectRatio; label: string; icon: React.ElementType }[] = [
  { value: '1:1', label: 'Square', icon: Square },
  { value: '16:9', label: 'Landscape', icon: RectangleHorizontal },
  { value: '9:16', label: 'Portrait', icon: RectangleVertical },
  { value: '4:3', label: 'Standard', icon: RectangleHorizontal },
  { value: '3:4', label: 'Tall', icon: RectangleVertical },
];

export const GeneratorInput: React.FC<GeneratorInputProps> = ({ onGenerate, loading }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !loading) {
      onGenerate(prompt, aspectRatio);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 bg-dark-800 p-6 rounded-2xl border border-white/5 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image... (e.g., A cyberpunk banana riding a neon motorcycle)"
            className="w-full bg-dark-900 text-white rounded-xl p-4 pr-14 min-h-[120px] resize-none border border-white/10 focus:border-banana-500 focus:ring-1 focus:ring-banana-500 outline-none transition-all placeholder-gray-600 font-light text-lg"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={!prompt.trim() || loading}
            className="absolute bottom-4 right-4 p-2 bg-banana-500 text-dark-900 rounded-lg hover:bg-banana-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold shadow-lg shadow-banana-500/20"
          >
            {loading ? (
              <div className="animate-spin w-5 h-5 border-2 border-dark-900 border-t-transparent rounded-full" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {ASPECT_RATIOS.map((ratio) => (
            <button
              key={ratio.value}
              type="button"
              onClick={() => setAspectRatio(ratio.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                aspectRatio === ratio.value
                  ? 'bg-banana-500/10 text-banana-400 border border-banana-500/50'
                  : 'bg-dark-900 text-gray-400 border border-transparent hover:bg-white/5 hover:text-gray-200'
              }`}
            >
              <ratio.icon size={16} />
              {ratio.label} <span className="text-xs opacity-50">({ratio.value})</span>
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};
