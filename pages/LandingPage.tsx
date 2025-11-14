import React from 'react';
import { Page } from '../types';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import Faq from '../components/landing/Faq';
import Cta from '../components/landing/Cta';
import Gallery from '../components/landing/Gallery';
import Footer from '../components/landing/Footer';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="dark:bg-[#0A0A0A] bg-white text-black dark:text-white font-sans overflow-x-hidden">
      <Navbar onNavigate={onNavigate} />
      <main>
        <Hero onNavigate={onNavigate} />
        <Features />
        <HowItWorks />
        <Testimonials />
        {/* FIX: Pass the 'onNavigate' prop to the Pricing component. */}
        <Pricing onNavigate={onNavigate} />
        <Faq />
        <Cta onNavigate={onNavigate} />
        <Gallery />
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default LandingPage;