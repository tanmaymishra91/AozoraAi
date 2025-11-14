import React from 'react';
import { Page } from '../../types';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface CtaProps {
    onNavigate: (page: Page) => void;
}

const Cta: React.FC<CtaProps> = ({ onNavigate }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });
    return (
        <section
            ref={ref}
            className={`py-20 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
            <div className="container mx-auto px-6">
                <div className="bg-[#1B1B1B] rounded-2xl p-12 text-center max-w-4xl mx-auto border border-white/10">
                    <h2 className="text-4xl font-bold text-white">Ready to Create?</h2>
                    <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                        Join thousands of creators and professionals. Get your 25 free credits and start generating stunning visuals today.
                    </p>
                    <div className="mt-8">
                        <button onClick={() => onNavigate(Page.LOGIN)} className="bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-gray-200 transition-transform hover:scale-105 transform inline-flex items-center gap-2">
                            Get Started for Free
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cta;
