import React from 'react';
import { Page } from '../../types';

interface NavbarProps {
    onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
    const scrollTo = (selector: string) => {
        document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-sm border-b border-gray-200 dark:border-white/10">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate(Page.LANDING)}>
                    <img src="https://aozoradesu.com/wp-content/uploads/2025/09/Aozoranobg.svg" alt="AozoraAi Logo" className="h-8 w-auto" />
                    <span className="text-xl font-bold text-black dark:text-white">AozoraAi</span>
                </div>
                <nav className="hidden md:flex items-center gap-6">
                    <button onClick={() => onNavigate(Page.LOGIN)} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Generator</button>
                    <button onClick={() => scrollTo('#pricing')} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Credits</button>
                    <button onClick={() => onNavigate(Page.CONTACT)} className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">Contact</button>
                </nav>
                <div className="flex items-center gap-4">
                    <button onClick={() => onNavigate(Page.LOGIN)} className="bg-black dark:bg-white text-white dark:text-black font-semibold px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                        Login
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;