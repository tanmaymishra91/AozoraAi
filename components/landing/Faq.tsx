import React, { useState } from 'react';
import { Icon } from '../Icon';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
    {
        question: "How many credits do I get when I sign up?",
        answer: "Every new user receives 25 free credits upon signing up, which is enough for 5 image generations."
    },
    {
        question: "Is my data private?",
        answer: "Yes, privacy is our top priority. We do not store your prompts or the images you generate. All processing is done in memory."
    },
    {
        question: "What happens if I run out of credits?",
        answer: "You can purchase more credits from our pricing section. Alternatively, free users receive a fresh batch of 25 credits every 24 hours."
    },
    {
        question: "What model is used for image generation?",
        answer: "We use a fine-tuned version of a state-of-the-art diffusion model to provide high-quality, fast, and secure image generation."
    }
];

const FaqItem: React.FC<{ item: typeof faqData[0]; isOpen: boolean; onClick: () => void; }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-white/10 overflow-hidden">
            <button onClick={onClick} className="w-full flex justify-between items-center py-5 text-left">
                <span className="text-lg font-medium text-white">{item.question}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <Icon name={'plus'} className="w-6 h-6 text-gray-400" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="pb-5 pr-10 text-gray-400">
                            <p>{item.answer}</p>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
}

const Faq: React.FC = () => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <section
            ref={ref}
            className={`py-20 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
            <div className="container mx-auto px-6 max-w-3xl">
                <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
                <div>
                    {faqData.map((item, index) => (
                        <FaqItem 
                            key={index} 
                            item={item}
                            isOpen={expandedIndex === index}
                            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;