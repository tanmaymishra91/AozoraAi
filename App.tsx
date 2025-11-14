
import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MainApp from './MainApp';
import Spinner from './components/Spinner';
import AdminPage from './pages/AdminPage';
import ContactPage from './pages/ContactPage';
import LandingPage from './pages/LandingPage';
import BuyCreditsPage from './pages/BuyCreditsPage';
import { Page } from './types';

const App: React.FC = () => {
    const { user, isLoading } = useAuth();
    const [currentPage, setCurrentPage] = useState<Page>(Page.LANDING);

    const navigate = (page: Page) => setCurrentPage(page);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0A0A0A]">
                <Spinner message="Initializing..." />
            </div>
        );
    }

    if (user) {
        // If user is logged in, redirect from public pages to the main app
        if (currentPage === Page.LANDING || currentPage === Page.LOGIN || currentPage === Page.SIGNUP) {
            return <MainApp onNavigate={navigate} />;
        }

        // Logged-in user routes
        switch (currentPage) {
            case Page.ADMIN:
                return user.role === 'admin' ? <AdminPage onNavigate={navigate} /> : <MainApp onNavigate={navigate} />;
            case Page.CONTACT:
                return <ContactPage onNavigate={navigate} />;
            case Page.CREDITS:
                return <BuyCreditsPage onNavigate={navigate} />;
            case Page.MAIN:
            default:
                return <MainApp onNavigate={navigate} />;
        }
    }

    // Public routes for logged-out users
    switch (currentPage) {
        case Page.CONTACT:
             return <ContactPage onNavigate={navigate} />;
        case Page.SIGNUP:
            return <SignUp onNavigateToLogin={() => navigate(Page.LOGIN)} />;
        case Page.LOGIN:
            return <Login onNavigateToSignUp={() => navigate(Page.SIGNUP)} />;
        case Page.LANDING:
        default:
            return <LandingPage onNavigate={navigate} />;
    }
}

export default App;