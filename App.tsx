
import React, { useState, useCallback } from 'react';
import { editImage } from './services/geminiService';
import ImageUpload from './components/ImageUpload';
import PromptInput from './components/PromptInput';
import Button from './components/Button';
import ImageDisplay from './components/ImageDisplay';
import type { ImageFile } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File, dataUrl: string) => {
    setOriginalImage({ file, dataUrl });
    setEditedImage(null); // Clear previous edit on new upload
    setError(null);
  }, []);

  const handleGenerateClick = async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const result = await editImage(originalImage.dataUrl, originalImage.file.type, prompt);
      setEditedImage(result);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`An error occurred: ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <header className="py-4 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
            AI Image Editor
          </h1>
          <p className="text-center text-sm text-gray-400 mt-1">Edit images with the power of Gemini</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          {/* Controls Panel */}
          <div className="lg:col-span-4 bg-gray-800/50 rounded-lg p-6 flex flex-col space-y-6 self-start">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">1. Upload Image</label>
              <ImageUpload onImageUpload={handleImageUpload} imagePreviewUrl={originalImage?.dataUrl ?? null} />
            </div>

            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">2. Describe Your Edit</label>
              <PromptInput
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Add a futuristic city in the background', 'Make it a watercolor painting', 'Change the color of the car to red'"
                disabled={isLoading}
              />
            </div>

            <Button
              onClick={handleGenerateClick}
              isLoading={isLoading}
              disabled={!originalImage || !prompt || isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate Image'}
            </Button>

            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-md text-sm" role="alert">
                <p>{error}</p>
              </div>
            )}
          </div>

          {/* Image Display Area */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ImageDisplay
              title="Original"
              imageUrl={originalImage?.dataUrl ?? null}
            />
            <ImageDisplay
              title="Edited"
              imageUrl={editedImage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </main>
      
      <footer className="py-4 text-center text-xs text-gray-500 border-t border-gray-800">
        <p>Powered by Google Gemini. Built by a world-class senior frontend React engineer.</p>
      </footer>
    </div>
  );
};

export default App;
