import React from 'react';
import { Icon } from '../Icon';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const StarRating: React.FC = () => (
    <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => <Icon key={i} name="star" className="w-5 h-5" />)}
    </div>
);

const TestimonialCard: React.FC<{ name: string; role: string; children: React.ReactNode }> = ({ name, role, children }) => (
    <div className="bg-[#1B1B1B] p-6 rounded-2xl border border-white/10 flex flex-col transition-transform duration-300 ease-in-out hover:-translate-y-2">
        <StarRating />
        <p className="text-gray-300 mt-4 flex-grow">"{children}"</p>
        <div className="mt-4">
            <p className="font-bold text-white">{name}</p>
            <p className="text-gray-400 text-sm">{role}</p>
        </div>
    </div>
);


const Testimonials: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
    return (
        <section
            ref={ref}
            className={`py-20 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Trusted by Creators</h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <TestimonialCard name="Alex Johnson" role="Digital Artist">
                        The speed and quality are unmatched. AozoraAi has become my go-to tool for concept art.
                    </TestimonialCard>
                    <TestimonialCard name="Sarah Chen" role="YouTuber">
                        I create all my thumbnails with this. The privacy-first approach is a huge plus for me.
                    </TestimonialCard>
                    <TestimonialCard name="Michael Lee" role="Student Developer">
                        Incredibly easy to use and the free credits were perfect for my university project. Highly recommend!
                    </TestimonialCard>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;