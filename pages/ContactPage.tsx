
import React from 'react';
import { Page } from '../types';
import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';

interface ContactPageProps {
  onNavigate: (page: Page) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-100 font-sans">
            <div className="container mx-auto px-4 flex flex-col min-h-screen">
                <AppHeader onNavigate={onNavigate} />

                <main className="flex-grow max-w-4xl mx-auto w-full py-12">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-2xl p-8">
                        <h2 className="text-3xl font-bold text-center mb-6 text-black dark:text-white">Contact Support</h2>
                        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                            Have questions or need help? We're here for you.
                        </p>

                        <div className="text-center mb-10">
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">The best way to reach us is by email:</p>
                            <a href="mailto:support@aozoradesu.com" className="text-2xl font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                                support@aozoradesu.com
                            </a>
                            <p className="text-sm text-gray-500 mt-2">We typically respond within 24 hours.</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold text-center mb-4 text-black dark:text-white">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">How do daily credits work?</h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        All users receive 25 free credits every day. These credits reset at midnight (server time) and do not roll over. Each image generation costs 5 credits.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Is my data private?</h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Absolutely. Your prompts and generated images are ephemeral. They are processed in memory and never stored on our servers, ensuring your privacy.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">What happens if I'm banned?</h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        If your account is banned for violating our terms of service, you will be unable to log in or use any of the app's features. If you believe this is an error, please contact us at the email above.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <AppFooter onNavigate={onNavigate} />
            </div>
        </div>
    );
};

export default ContactPage;