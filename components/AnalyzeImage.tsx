import React, { useState, useCallback, ChangeEvent } from 'react';
import { analyzeImage } from '../services/geminiService';
import Spinner from './Spinner';
import { Icon } from './Icon';
import MarkdownRenderer from './MarkdownRenderer';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

const MAX_PROMPT_LENGTH = 1000;

const AnalyzeImage: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('Describe this image in detail.');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      setAnalysis(null);
      setError(null);
    }
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!imageFile || !prompt.trim()) {
      setError('Please upload an image and provide a question or prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const base64Image = await fileToBase64(imageFile);
      const result = await analyzeImage(base64Image, imageFile.type, prompt);
      setAnalysis(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred during analysis.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, prompt]);
  
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-4xl text-center">
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Analyze Image</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Upload an image and ask a question about it. The AI will provide a detailed analysis.</p>
      </div>

      <div className="w-full max-w-4xl p-4 bg-gray-200 dark:bg-gray-900 rounded-lg">
        <label htmlFor="analyze-image-upload" className="w-full cursor-pointer bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center p-6 hover:bg-gray-300 dark:hover:bg-gray-700 transition">
          <Icon name="upload" className="h-10 w-10 text-gray-500 dark:text-gray-500 mb-2" />
          <span className="text-gray-600 dark:text-gray-400 font-semibold">{imageFile ? imageFile.name : 'Click to upload an image'}</span>
          <span className="text-sm text-gray-500">PNG, JPG, or WEBP</span>
          <input id="analyze-image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isLoading} />
        </label>

        {imageUrl && (
          <div className="mt-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-grow">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Describe this image in detail."
                  className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black dark:text-white placeholder-gray-500 resize-none"
                  rows={2}
                  disabled={isLoading}
                  maxLength={MAX_PROMPT_LENGTH}
                />
                <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1 pr-1">
                  {MAX_PROMPT_LENGTH - prompt.length} characters remaining
                </p>
              </div>
              <button
                onClick={handleAnalyze}
                disabled={isLoading || !prompt.trim()}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
          </div>
        )}
        {error && <p className="text-red-500 dark:text-red-400 text-center mt-4">{error}</p>}
      </div>

      <div className="w-full max-w-4xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Image</h3>
          <div className="w-full aspect-square bg-gray-200 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
            {imageUrl ? <img src={imageUrl} alt="For analysis" className="rounded-lg object-contain max-h-full max-w-full" /> : <p className="text-gray-500">Upload an image to analyze</p>}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2 text-center md:text-left">Analysis</h3>
          <div className="w-full h-full min-h-[200px] bg-gray-200 dark:bg-gray-900 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-y-auto">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <Spinner message="Analyzing image..." />
              </div>
            )}
            {!isLoading && analysis && (
              <div className="text-left text-black dark:text-white">
                <MarkdownRenderer content={analysis} />
              </div>
            )}
            {!isLoading && !analysis && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-center">The AI-powered analysis will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeImage;
