import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const Step: React.FC<{ number: string; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0">
            <div className="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center font-bold text-white text-xl">
                {number}
            </div>
        </div>
        <div className="ml-6 pt-1">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-gray-400 mt-1">{children}</p>
        </div>
    </div>
);

const HowItWorks: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
    return (
        <section
            ref={ref}
            className={`py-20 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-white mb-12">How It Works</h2>
                <div className="relative max-w-sm mx-auto">
                     <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-white/20" aria-hidden="true"></div>
                    <div className="space-y-12">
                        <Step number="1" title="Sign Up">
                            Create your free account to get 25 credits instantly.
                        </Step>
                        <Step number="2" title="Enter Prompt">
                            Describe your imagination in the text box. Be as detailed as you like.
                        </Step>
                        <Step number="3" title="Generate & Download">
                            Generate your image and download it in high resolution.
                        </Step>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
