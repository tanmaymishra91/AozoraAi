
import React from 'react';
import { Icon } from './Icon';

interface SpinnerProps {
  message: string;
}

const Spinner: React.FC<SpinnerProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-400">
      <Icon name="spinner" className="h-12 w-12 text-gray-500" />
      <p className="mt-4 text-lg font-medium">{message}</p>
      <p className="text-sm">Please wait a moment...</p>
    </div>
  );
};

export default Spinner;
