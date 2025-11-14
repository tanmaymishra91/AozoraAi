import React, { useState, useCallback, ChangeEvent } from 'react';
import { editImage } from '../services/geminiService';
import Spinner from './Spinner';
import { Icon } from './Icon';

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

const EditImage: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      setEditedImage(null);
      setError(null);
    }
  }, []);
  
  const handleEdit = useCallback(async () => {
    if (!imageFile || !prompt.trim()) {
      setError('Please upload an image and provide an editing prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const base64Image = await fileToBase64(imageFile);
      const editedImageBytes = await editImage(base64Image, imageFile.type, prompt);
      setEditedImage(editedImageBytes);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred during editing.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, prompt]);

  const handleDownload = useCallback(() => {
    if (!editedImage) return;
    const byteCharacters = atob(editedImage);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);
    link.download = `aozora-edited-${timestamp}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, [editedImage]);


  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-4xl text-center">
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">Edit Image</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Upload an image and describe the changes you want to make.</p>
      </div>
      
      <div className="w-full max-w-4xl p-4 bg-gray-200 dark:bg-gray-900 rounded-lg">
          <label htmlFor="image-upload" className="w-full cursor-pointer bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center p-6 hover:bg-gray-300 dark:hover:bg-gray-700 transition">
              <Icon name="upload" className="h-10 w-10 text-gray-500 dark:text-gray-500 mb-2" />
              <span className="text-gray-600 dark:text-gray-400 font-semibold">{imageFile ? imageFile.name : 'Click to upload an image'}</span>
              <span className="text-sm text-gray-500">PNG, JPG, or WEBP</span>
              <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} disabled={isLoading} />
          </label>
        
        {imageUrl && (
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Add a retro filter"
              className="w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black dark:text-white placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              onClick={handleEdit}
              disabled={isLoading || !prompt.trim()}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? 'Editing...' : 'Edit'}
            </button>
          </div>
        )}
        {error && <p className="text-red-500 dark:text-red-400 text-center mt-4">{error}</p>}
      </div>

      <div className="w-full max-w-4xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Original</h3>
          <div className="w-full aspect-square bg-gray-200 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
            {imageUrl ? <img src={imageUrl} alt="Original" className="rounded-lg object-contain max-h-full max-w-full" /> : <p className="text-gray-500">Upload an image</p>}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Edited</h3>
          <div className="relative w-full aspect-square bg-gray-200 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center">
            {isLoading ? <Spinner message="Applying edits..."/> : editedImage ? <img src={`data:image/png;base64,${editedImage}`} alt="Edited by AI" className="rounded-lg object-contain max-h-full max-w-full" /> : <p className="text-gray-500">Your edited image will appear here</p>}
            {!isLoading && editedImage && (
              <button
                onClick={handleDownload}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/75 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
                aria-label="Download edited image"
              >
                <Icon name="download" className="h-5 w-5" />
                <span>Download</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditImage;