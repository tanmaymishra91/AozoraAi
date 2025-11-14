import React from 'react';
import { Page } from '../../types';
import { Icon } from '../Icon';

interface HeroProps {
    onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
    return (
        <section className="pt-32 pb-20 text-center">
            <div className="container mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                    Create AI Images in Seconds
                </h1>
                <p className="text-lg md:text-xl text-gray-400 mt-6 max-w-3xl mx-auto">
                    Generate stunning AI visuals from text instantly. Powered by AozoraAi for fast, secure, and privacy-first creations.
                </p>
                <div className="mt-10">
                    <button onClick={() => onNavigate(Page.LOGIN)} className="bg-white text-black font-semibold px-8 py-4 rounded-lg hover:bg-gray-200 transition-transform hover:scale-105 transform inline-flex items-center gap-2">
                        <span>Start Generating</span>
                        <Icon name="arrow-right" className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
