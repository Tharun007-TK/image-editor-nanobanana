
import React from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, isLoading, disabled, ...props }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300"
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
      )}
      {children}
    </button>
  );
};

export default Button;
