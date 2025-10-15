
import React from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface ImageDisplayProps {
  title: string;
  imageUrl: string | null;
  isLoading?: boolean;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl, isLoading = false }) => {
  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-lg font-semibold text-gray-300 text-center">{title}</h3>
      <div className="relative w-full aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center border border-gray-700 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900/80 flex flex-col items-center justify-center z-10">
            <SpinnerIcon className="w-12 h-12 text-indigo-400 animate-spin" />
            <p className="mt-4 text-gray-300">Generating your image...</p>
          </div>
        )}
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="object-contain w-full h-full" />
        ) : (
          !isLoading && (
            <div className="text-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2 text-sm">{title} image will appear here</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ImageDisplay;
