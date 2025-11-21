import React, { useState } from 'react';
import { GeneratorInput } from './components/GeneratorInput';
import { ImageDisplay } from './components/ImageDisplay';
import { Header } from './components/Header';
import { generateImage } from './services/geminiService';
import { GeneratedImage, AspectRatio } from './types';
import { AlertCircle, Clock } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);

  const handleGenerate = async (prompt: string, aspectRatio: AspectRatio) => {
    setLoading(true);
    setError(null);
    try {
      const base64Image = await generateImage(prompt, aspectRatio);
      
      if (!base64Image) {
        throw new Error("No image data received from the model.");
      }

      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt,
        aspectRatio,
        base64Data: base64Image,
        createdAt: new Date(),
      };

      setCurrentImage(newImage);
      setHistory((prev) => [newImage, ...prev]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFromHistory = (image: GeneratedImage) => {
    setCurrentImage(image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-banana-500 selection:text-black">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8 pb-32">
        <GeneratorInput onGenerate={handleGenerate} loading={loading} />
        
        {error && (
          <div className="max-w-3xl mx-auto p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
            <AlertCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        <ImageDisplay image={currentImage} loading={loading} />

        {history.length > 0 && (
          <div className="max-w-3xl mx-auto pt-12 border-t border-white/5">
            <div className="flex items-center gap-2 mb-6 text-gray-400">
              <Clock size={16} />
              <h2 className="text-sm font-semibold uppercase tracking-wider">History</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {history.map((img) => (
                <button
                  key={img.id}
                  onClick={() => handleSelectFromHistory(img)}
                  className={`relative aspect-square group rounded-lg overflow-hidden border border-white/5 hover:border-banana-500/50 transition-all ${currentImage?.id === img.id ? 'ring-2 ring-banana-500' : ''}`}
                >
                  <img
                    src={`data:image/png;base64,${img.base64Data}`}
                    alt={img.prompt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <p className="text-xs text-white truncate w-full text-left">{img.prompt}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
