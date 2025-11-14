
import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useAuth } from '../../contexts/AuthContext';
import { Page } from '../../types';

interface PricingProps {
    onNavigate: (page: Page) => void;
}

const pricingPlans = [
    {
        credits: '50 Credits/day',
        price: 199,
        generations: '250 Generations/day',
    },
    {
        credits: '100 Credits/day',
        price: 299,
        generations: '500 Generations/day',
    },
    {
        credits: '200 Credits/day',
        price: 499,
        generations: '1000 Generations/day',
    },
];

const PricingCard: React.FC<{ plan: typeof pricingPlans[0], onClick: () => void }> = ({ plan, onClick }) => (
    <div className="bg-[#1B1B1B] p-8 rounded-2xl border border-white/10 flex flex-col text-center transition-transform duration-300 ease-in-out hover:-translate-y-2">
        <h3 className="text-2xl font-semibold text-white">{plan.credits}</h3>
        <p className="text-5xl font-bold text-white my-4">
            <span className="text-3xl">₹</span>{plan.price}<span className="text-xl font-medium text-gray-400">/mo</span>
        </p>
        <p className="text-gray-400 mb-6">{plan.generations}</p>
        <button 
            onClick={onClick}
            className="mt-auto bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-colors">
            View Plans
        </button>
    </div>
);

const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
    const { user } = useAuth();
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

    const handleViewPlans = () => {
        if (user) {
            onNavigate(Page.CREDITS);
        } else {
            onNavigate(Page.LOGIN);
        }
    };
    
    return (
        <section
            id="pricing"
            ref={ref}
            className={`py-20 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-white text-center mb-4">Simple, Transparent Pricing</h2>
                <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
                    Choose a plan that works for you. All plans are a monthly subscription with no hidden fees.
                </p>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {pricingPlans.map(plan => <PricingCard key={plan.credits} plan={plan} onClick={handleViewPlans} />)}
                </div>
            </div>
        </section>
    );
};

export default Pricing;