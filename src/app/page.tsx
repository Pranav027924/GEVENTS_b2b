import React from 'react';
import InfiniteHorizontalScroll from './components/InfiniteHorizontalScroll';
import Mask from './components/integratedHero';

import TextSlider from './components/scrollText';
import Home from './components/ScrollGallery';
import VisionInMotion from './components/VisionInMotion';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Mask/>
      <InfiniteHorizontalScroll /> 
      <TextSlider/>
      <Home/>
      <VisionInMotion/>
      

      {/* <Clients />
      <Contact />
      <Footer /> */}
    </div>
  );
};

export default Index;
