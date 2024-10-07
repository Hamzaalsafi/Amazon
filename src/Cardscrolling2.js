import React, { useRef } from 'react';
import './cardscrolling.css';
import { Link } from 'react-router-dom';
function Cardscrolling2(props) {
  const imgContainerRef = useRef(null);

  const smoothScroll = (scrollAmount) => {
    const start = imgContainerRef.current.scrollLeft; 
    const end = start + scrollAmount; 
    const distance = end - start;
    const duration = 500; 
    let startTime = null;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); 

      // Apply easing function (easeInOut)
      const easing = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      imgContainerRef.current.scrollLeft = start + distance * easing(progress);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const scrollRight = () => {
    const containerWidth = imgContainerRef.current.offsetWidth; 
    const scrollAmount = containerWidth - (containerWidth * 0.1);
    smoothScroll(scrollAmount);
  };

  const scrollLeft = () => {
    const containerWidth = imgContainerRef.current.offsetWidth; 
    const scrollAmount = containerWidth - (containerWidth * 0.1);
    smoothScroll(-scrollAmount);
  };

  return (
    <div className='contianer'> {/* Preserved spelling */}
      <h2>{props.title}</h2>
      <button id="button1Cardscrolling" onClick={scrollLeft}>❮</button>
      <div className="imgcontianer" ref={imgContainerRef}> {/* Preserved spelling */}
        {Array.from({ length: 19 }, (_, index) => (
          <img key={index} src={props[`img${index + 1}`]} alt={`img-${index + 1}`} />
        ))}
      </div>
      <button id="button2Cardscrolling" onClick={scrollRight}>❯</button>
    </div>
  );
}

export default Cardscrolling2;
