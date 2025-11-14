import React from 'react';
import { Page } from '../../types';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="py-20 text-center">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <h3 className="text-3xl font-bold text-white">Have Questions?</h3>
                    <p className="text-gray-400 mt-2">Feel free to reach out to us for any inquiries or support.</p>
                    <a href="mailto:support@aozoradesu.com" className="text-white font-semibold mt-4 inline-block hover:underline">
                        support@aozoradesu.com
                    </a>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} AozoraAi. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 sm:mt-0">
                        <button className="hover:text-white transition-colors">Terms</button>
                        <button className="hover:text-white transition-colors">Privacy</button>
                        <button onClick={() => onNavigate(Page.CONTACT)} className="hover:text-white transition-colors">Contact</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
