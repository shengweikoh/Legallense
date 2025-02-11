import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Note the .js extension

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollEffect = () => {
  useEffect(() => {
    // Log to verify ScrollTrigger is imported correctly
    console.log('ScrollTrigger:', ScrollTrigger);
    console.log("Registered plugins:", gsap.plugins);

    gsap.fromTo(
      '.description',
      { scaleY: 5 },
      {
        scaleY: 1,
        transformOrigin: 'top',
        ease: 'none',
        scrollTrigger: {
          trigger: '.description',
          start: 'top center',
          end: 'bottom bottom',
          scrub: true,
          markers: true,
        },
      }
    );
  }, []);

  return (
    
      <div className="description"></div>
  );
};

export default ScrollEffect;
