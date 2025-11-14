
import React, { useState, useCallback } from 'react';
import { Page } from './types';
import GenerateImage from './components/GenerateImage';
import EditImage from './components/EditImage';
import AnalyzeImage from './components/AnalyzeImage';
import Chat from './components/Chat';
import { Icon } from './components/Icon';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

interface MainAppProps {
  onNavigate: (page: Page) => void;
}

enum FeatureTab {
  IMAGINE = 'Imagine',
  EDIT = 'Edit',
  ANALYZE = 'Analyze',
  CHAT = 'Chat',
}

const MainApp: React.FC<MainAppProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<FeatureTab>(FeatureTab.IMAGINE);

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case FeatureTab.IMAGINE:
        return <GenerateImage onNavigate={onNavigate} />;
      case FeatureTab.EDIT:
        return <EditImage />;
      case FeatureTab.ANALYZE:
        return <AnalyzeImage />;
      case FeatureTab.CHAT:
        return <Chat />;
      default:
        return <GenerateImage onNavigate={onNavigate} />;
    }
  }, [activeTab, onNavigate]);

  const TabButton: React.FC<{ tab: FeatureTab; icon: React.ComponentProps<typeof Icon>['name']; }> = ({ tab, icon }) => {
    const isActive = activeTab === tab;
    return (
      <button
        onClick={() => setActiveTab(tab)}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          isActive
            ? 'bg-gray-700 text-white'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
        }`}
      >
        <Icon name={icon} className="h-5 w-5" />
        {tab}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-100 font-sans">
      <div className="container mx-auto px-4 flex flex-col min-h-screen">
        <AppHeader onNavigate={onNavigate} />

        <main className="flex-grow flex flex-col">
          <div className="flex justify-center mb-8 shrink-0">
            <div className="flex flex-wrap justify-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
              <TabButton tab={FeatureTab.IMAGINE} icon="generate" />
              <TabButton tab={FeatureTab.EDIT} icon="edit" />
              <TabButton tab={FeatureTab.ANALYZE} icon="analyze" />
              <TabButton tab={FeatureTab.CHAT} icon="chat" />
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-2xl p-4 sm:p-8 flex-grow flex justify-center">
            {renderContent()}
          </div>
        </main>
        
        <AppFooter onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default MainApp;