import React from 'react';
import { Icon } from '../Icon';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const FeatureCard: React.FC<{ icon: 'lightning' | 'shield-check'; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-[#1B1B1B] p-8 rounded-2xl border border-white/10 transition-transform duration-300 ease-in-out hover:-translate-y-2">
        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
            <Icon name={icon} className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 mt-2">{children}</p>
    </div>
);

const Features: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
    return (
        <section
            ref={ref}
            className={`py-20 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <FeatureCard icon="lightning" title="Fast Generation">
                        Get your images in seconds. No waiting, just creating.
                    </FeatureCard>
                    <FeatureCard icon="shield-check" title="Secure & Private">
                        We don't store your prompts or images. Your creativity is yours alone.
                    </FeatureCard>
                </div>
            </div>
        </section>
    );
};

export default Features;