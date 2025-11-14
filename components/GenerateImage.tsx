
import React, { useState, useCallback } from 'react';
import { generateImage } from '../services/geminiService';
import Spinner from './Spinner';
import { Icon } from './Icon';
import { useAuth } from '../contexts/AuthContext';
import { Page } from '../types'; // Assuming onNavigate is passed down or available via a context

// This component needs a way to navigate. Let's assume it's passed as a prop for now.
// A more robust solution might use a NavigationContext.
interface GenerateImageProps {
  onNavigate: (page: Page) => void;
}

const MAX_PROMPT_LENGTH = 1000;

const GenerateImage: React.FC<GenerateImageProps> = ({ onNavigate }) => {
  const { user, deductCredit } = useAuth();
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const canGenerate = user?.role === 'admin' || (user?.currentCredits ?? 0) >= 5;

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt.');
      return;
    }
    if (!canGenerate) {
      setError('You do not have enough credits to generate an image.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const imageBytes = await generateImage(prompt);
      setGeneratedImage(imageBytes);
      await deductCredit(5);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, canGenerate, deductCredit]);

  const handleDownload = useCallback(() => {
    if (!generatedImage) return;
    const byteCharacters = atob(generatedImage);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);
    link.download = `aozora-generate-${timestamp}.png`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, [generatedImage]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-4 text-black dark:text-white">Generate Image</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">Describe the image you want to create. Your images will have a professional black-and-white theme.</p>
        
        {!canGenerate && !isLoading && (
            <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg text-center mb-4">
                <p className="font-bold">You're out of credits!</p>
                <p className="text-sm">Your credits will reset tomorrow, or you can buy more to increase your daily limit.</p>
                <button 
                    onClick={() => onNavigate(Page.CREDITS)}
                    className="mt-2 bg-yellow-500 text-black font-semibold px-4 py-1 rounded-md hover:bg-yellow-600 transition-colors text-sm"
                >
                    Buy Credits
                </button>
            </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="flex-grow">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A robot holding a red skateboard."
              className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-500 resize-none"
              rows={2}
              disabled={isLoading}
              maxLength={MAX_PROMPT_LENGTH}
            />
            <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1 pr-1">
              {MAX_PROMPT_LENGTH - prompt.length} characters remaining
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim() || !canGenerate}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 shrink-0"
          >
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {error && <p className="text-red-500 dark:text-red-400 text-center mt-2">{error}</p>}
      </div>

      <div className="w-full max-w-2xl mt-8 relative">
        <div className="w-full aspect-square bg-gray-200 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex justify-center items-center">
          {isLoading && <Spinner message="Generating your masterpiece..." />}
          {!isLoading && generatedImage && (
            <img
              src={`data:image/png;base64,${generatedImage}`}
              alt={prompt}
              className="rounded-lg object-contain max-h-full max-w-full"
            />
          )}
          {!isLoading && !generatedImage && (
            <p className="text-gray-500 dark:text-gray-500">Your generated image will appear here</p>
          )}
        </div>
        {!isLoading && generatedImage && (
          <button
            onClick={handleDownload}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/75 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
            aria-label="Download image"
          >
            <Icon name="download" className="h-5 w-5" />
            <span>Download</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default GenerateImage;