import React, { useRef } from 'react';
import styles from './index.less';
import bgImg from './data_center_img.svg';
const n = 6;
const Welcome: React.FC = () => {
  const bubblesContainerRef = useRef<HTMLDivElement | null>(null);
  const createBubbles = () => {
    //console.log("产生泡泡");
    const vw = document.documentElement.clientWidth;
    const bubblesContainer = bubblesContainerRef.current;
    if (bubblesContainer) {
      for (let i = 0; i < n; i++) {
        const bubble = document.createElement('div');
        bubble.className = styles.bubble;
        const s = Math.random() * 100 + 50;
        const x = Math.random() * (vw - s - 350);
        const d = Math.random() * 2 + 1;
        bubble.style.setProperty('--s', `${s}px`);
        bubble.style.setProperty('--x', `${x}px`);
        bubble.style.setProperty('--d', `${d}s`);
        bubblesContainer.appendChild(bubble);

        // 移除泡泡
        setTimeout(() => {
          bubblesContainer.removeChild(bubble);
        }, d * 1000);
      }
    }
  };
  React.useEffect(() => {
    const intervalId = setInterval(createBubbles, 1000);
    return () => clearInterval(intervalId);
  }, []);
  createBubbles();
  return (
    <div className={styles.main}>
      <div className={styles.title}>数据中心</div>
      <img className="svg-image" src={bgImg} alt="SVG Image"></img>
      <div className={styles.footer}>
        <div className={styles.bubbles} ref={bubblesContainerRef}>
          <div className={styles.bubble}></div>
        </div>
      </div>
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="blob">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
               1 0 0 0 0
               0 1 0 0 0
               0 0 1 0 0
               0 0 0 20 -10"
            ></feColorMatrix>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Welcome;
