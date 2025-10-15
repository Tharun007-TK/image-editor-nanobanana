
import React from 'react';

interface PromptInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // You can add any additional props here if needed
}

const PromptInput: React.FC<PromptInputProps> = (props) => {
  return (
    <textarea
      rows={4}
      className="block w-full text-sm rounded-md shadow-sm bg-gray-900/50 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 text-gray-200 placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      {...props}
    />
  );
};

export default PromptInput;
