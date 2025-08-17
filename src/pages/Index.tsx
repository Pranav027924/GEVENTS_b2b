import React from 'react';
import Hero from '@/components/Hero';

import Gallery, { ScrollGallery } from '@/components/Gallery';
import Clients from '@/components/Clients';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import InfiniteHorizontalScroll from '@/components/InfiniteHorizontalScroll';
import IntegratedHero from '@/components/integratedHero';
import AboutUs from '@/components/aboutSection';

const Index = () => {
  return (
    <div className="min-h-screen">
      <IntegratedHero />
      <InfiniteHorizontalScroll /> 
      <AboutUs />
      <ScrollGallery />
      <Clients />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
