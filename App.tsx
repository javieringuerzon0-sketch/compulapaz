
import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { Services } from './components/Services.tsx';
import { Testimonials } from './components/Testimonials.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { CircuitBackground } from './components/CircuitBackground.tsx';
import { AIDiagnostic } from './components/AIDiagnostic.tsx';
import { ScrollToTop } from './components/ScrollToTop.tsx';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      <CircuitBackground />
      <Navbar isScrolled={isScrolled} />
      <main>
        <Hero />
        <section id="ai-help" className="py-20 scroll-mt-24">
          <AIDiagnostic />
        </section>
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default App;
