
import React from 'react';
import { Page } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Icon } from './Icon';

interface AppHeaderProps {
  onNavigate: (page: Page) => void;
  titleOverride?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onNavigate, titleOverride }) => {
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center py-8 mb-8 pb-4 border-b border-gray-200 dark:border-gray-700 shrink-0">
      <div className="flex items-center gap-3 mb-4 sm:mb-0">
        <button onClick={() => onNavigate(Page.MAIN)}>
            <img src="https://aozoradesu.com/wp-content/uploads/2025/09/Aozoranobg.svg" alt="AozoraAi Logo" className="h-12 w-auto" />
        </button>
        <div>
          <h1 className="text-3xl font-bold tracking-tighter text-black dark:text-white">AozoraAi</h1>
          <p className="text-gray-500 dark:text-gray-400">{titleOverride || 'AI-Powered Image Generation & Analysis'}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => onNavigate(Page.MAIN)} className="px-3 py-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-md transition-colors">Generator</button>
            <button onClick={() => onNavigate(Page.CREDITS)} className="px-3 py-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-md transition-colors">Credits</button>
            <button onClick={() => onNavigate(Page.CONTACT)} className="px-3 py-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-md transition-colors">Contact</button>
        </div>

        <div className="text-right text-sm">
          <span className="text-gray-600 dark:text-gray-400">Welcome, {user?.name?.split(' ')[0]}</span>
          <p className="font-semibold text-black dark:text-white truncate">{user?.email}</p>
        </div>
        
        <button onClick={() => onNavigate(Page.CREDITS)} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" title="View Credits">
          <Icon name="credits" className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
          <span className="font-semibold text-black dark:text-white">
            {user?.role === 'admin' ? 'Unlimited' : `${user?.currentCredits ?? 0}`}
          </span>
        </button>

        {user?.role === 'admin' && (
          <button onClick={() => onNavigate(Page.ADMIN)} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Admin Panel">
            <Icon name="admin" className="h-5 w-5" />
          </button>
        )}
        <button onClick={logout} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Logout">
          <Icon name="logout" className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default AppHeader;