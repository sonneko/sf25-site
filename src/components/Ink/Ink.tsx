'use client';
import React, { useState, useEffect } from 'react';
import styles from './Ink.module.scss';

interface InkProps {
  isAnimated: boolean;
}

const Ink: React.FC<InkProps> = ({ isAnimated }) => {
  const greenInkPath =
    'M0 200 C 50 150, 100 250, 150 200 C 200 150, 250 250, 300 200 L 300 300 L 0 300 Z';
  const pinkInkPath =
    'M700 0 C 650 50, 750 100, 700 150 C 650 200, 750 250, 700 300 L 700 0 Z';

  const [greenInkStyle, setGreenInkStyle] = useState({});
  const [pinkInkStyle, setPinkInkStyle] = useState({});

  useEffect(() => {
    if (isAnimated) {
      // Initial state (covering)
      setGreenInkStyle({
        transform: 'translateX(0) translateY(0) rotate(0deg)',
        opacity: 1,
        transition: 'none', // No transition initially
      });
      setPinkInkStyle({
        transform: 'translateX(0) translateY(0) rotate(0deg)',
        opacity: 1,
        transition: 'none', // No transition initially
      });

      // Animate out after a short delay (to allow initial render)
      const animateOutTimer = setTimeout(() => {
        setGreenInkStyle({
          transform: 'translateX(-100%) translateY(-50%) rotate(-180deg)',
          opacity: 0,
          transition: 'transform 1.5s ease-out, opacity 1.5s ease-out',
        });
        setPinkInkStyle({
          transform: 'translateX(100%) translateY(-50%) rotate(180deg)',
          opacity: 0,
          transition: 'transform 1.5s ease-out, opacity 1.5s ease-out',
        });
      }, 50); // Small delay to ensure initial state is rendered

      return () => clearTimeout(animateOutTimer);
    } else {
      // If not animated, set to initial state (hidden)
      setGreenInkStyle({
        transform: 'translateX(-100%) translateY(-50%) rotate(-180deg)',
        opacity: 0,
      });
      setPinkInkStyle({
        transform: 'translateX(100%) translateY(-50%) rotate(180deg)',
        opacity: 0,
      });
    }
  }, [isAnimated]);

  return (
    <div className={styles.inkContainer}>
      <svg className={styles.inkSvg} viewBox='0 0 800 300'>
        <path
          d={greenInkPath}
          fill='#00FF00'
          className={`${styles.inkShape} ${styles.greenInk}`}
          style={greenInkStyle}
        />
        <path
          d={pinkInkPath}
          fill='#FF00FF'
          className={`${styles.inkShape} ${styles.pinkInk}`}
          style={pinkInkStyle}
        />
      </svg>
    </div>
  );
};

export default Ink;
