import React from 'react';
import FloatingShapes from '../components/FloatingShapes';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import WhyChooseUs from '../components/WhyChooseUs';
import DemoPreview from '../components/DemoPreview';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const LandingLayout = () => {
  return (
    <div className="relative min-h-screen">
      <FloatingShapes />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <WhyChooseUs />
        <DemoPreview />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
