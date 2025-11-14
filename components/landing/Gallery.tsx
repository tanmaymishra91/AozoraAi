import React from 'react';
import { motion } from 'framer-motion';

const images = [
    "https://picsum.photos/seed/20/600/600?grayscale",
    "https://picsum.photos/seed/22/600/600?grayscale",
    "https://picsum.photos/seed/24/600/600?grayscale",
    "https://picsum.photos/seed/21/600/600?grayscale",
    "https://picsum.photos/seed/23/600/600?grayscale",
    "https://picsum.photos/seed/25/600/600?grayscale",
];

const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    },
};

const Gallery: React.FC = () => {
    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="py-20"
        >
            <div className="container mx-auto px-6">
                <motion.h2 
                    variants={itemVariants}
                    className="text-4xl font-bold text-white text-center mb-12"
                >
                    Inspiration Gallery
                </motion.h2>
                <motion.div 
                    variants={sectionVariants}
                    className="columns-1 sm:columns-2 md:columns-3 gap-4"
                >
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, zIndex: 1, transition: { duration: 0.2 } }}
                            className="break-inside-avoid-column mb-4"
                        >
                            <img
                                src={src}
                                alt={`Inspiration image ${index + 1}`}
                                className="w-full aspect-square object-cover rounded-lg grayscale"
                                loading="lazy"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Gallery;