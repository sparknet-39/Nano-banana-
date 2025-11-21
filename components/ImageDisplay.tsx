import React from 'react';
import { GeneratedImage } from '../types';
import { Download, Sparkles } from 'lucide-react';

interface ImageDisplayProps {
  image: GeneratedImage | null;
  loading: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ image, loading }) => {
  if (loading) {
    return (
      <div className="w-full aspect-square max-w-xl mx-auto bg-dark-800 rounded-2xl border border-white/5 flex flex-col items-center justify-center animate-pulse shadow-inner">
        <Sparkles className="w-12 h-12 text-banana-500 animate-spin duration-[3s]" />
        <p className="mt-4 text-banana-300 font-mono text-sm animate-pulse">Dreaming up pixels...</p>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="w-full max-w-xl mx-auto p-12 text-center text-gray-600 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
           <Sparkles className="w-8 h-8 text-gray-700" />
        </div>
        <p>Ready to generate. Enter a prompt above!</p>
      </div>
    );
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${image.base64Data}`;
    link.download = `nano-banana-${image.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 animate-in fade-in zoom-in duration-300">
      <div className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-dark-900">
        <img
          src={`data:image/png;base64,${image.base64Data}`}
          alt={image.prompt}
          className="w-full h-auto object-contain max-h-[70vh] mx-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
          <p className="text-white font-medium line-clamp-2 mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{image.prompt}</p>
          <button
            onClick={handleDownload}
            className="self-start flex items-center gap-2 px-4 py-2 bg-banana-500 text-dark-900 hover:bg-banana-400 rounded-lg font-bold transition-colors shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75"
          >
            <Download size={18} />
            Download Image
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-500 font-mono px-2">
        <span className="uppercase tracking-wider">{image.aspectRatio}</span>
        <span>{image.createdAt.toLocaleTimeString()}</span>
      </div>
    </div>
  );
};
