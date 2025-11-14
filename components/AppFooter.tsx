
import React from 'react';
import { Page } from '../types';

interface AppFooterProps {
  onNavigate: (page: Page) => void;
}

const AppFooter: React.FC<AppFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="text-center mt-12 py-8 text-gray-500 dark:text-gray-500 text-sm shrink-0">
      <p>&copy; {new Date().getFullYear()} AozoraAi. All outputs are ephemeral and not stored on our servers.</p>
      <button onClick={() => onNavigate(Page.CONTACT)} className="mt-2 text-blue-500 hover:underline">
        Contact Support
      </button>
    </footer>
  );
};

export default AppFooter;
