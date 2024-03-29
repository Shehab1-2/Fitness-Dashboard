import React, { useEffect, useRef } from 'react';
import { gsap, Power2 } from 'gsap';
import './FitnessAnimation.css'; // Import CSS as a module

const FitnessAnimation = () => {
  const pathRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const start = "M 0 100 V 50 Q 50 0 100 50 V 100 z";
    const end = "M 0 100 V 0 Q 50 0 100 0 V 100 z";

    gsap.timeline({ repeat: -1, repeatDelay: 1 })
      .to(pathRef.current, { duration: 0.8, attr: { d: start }, ease: Power2.easeIn })
      .to(pathRef.current, { duration: 0.4, attr: { d: end }, ease: Power2.easeOut })
      .from(logoRef.current, { duration: 0.8, y: 75 }, '-=0.8');
  }, []);

  return (
    <div className='wrapper'>
      <svg className="transition" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path ref={pathRef} className="path" stroke="#000" strokeWidth="2px" vectorEffect="non-scaling-stroke" d="M 0 100 V 100 Q 50 100 100 100 V 100 z"/>
      </svg>
      <svg ref={logoRef} className="logo" viewBox="0 0 18.31 18.31">
        {/* SVG Path Content Here */}
      </svg>
      {/* Additional content like the definition of fitness can be added here */}
    </div>
  );
};

export default FitnessAnimation;
