import React, { useEffect, useState, useRef } from 'react';
import Rive from '@rive-app/react-canvas';

const RiveAnimation = ({ artboard, className, fallbackSrc }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const riveRef = useRef(null);

  // Workaround for Rive animations getting stuck - based on community reports
  useEffect(() => {
    const interval = setInterval(() => {
      if (riveRef.current && !hasError) {
        try {
          // Attempt to restart rendering if stuck
          riveRef.current.startRendering?.();
        } catch (e) {
          console.warn('Error restarting Rive rendering:', e);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [hasError]);

  const handleLoad = (rive) => {
    console.log(`Rive animation loaded successfully for artboard: ${artboard}`);
    riveRef.current = rive;
    setIsLoaded(true);
    setHasError(false);
  };

  const handleLoadError = (e) => {
    console.error(`Rive load error for artboard ${artboard}:`, e);
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <div className={className ? `animation-container ${className}` : 'animation-container'}>
      {!hasError && (
        <Rive
          src="./web_page_current.riv"
          className="rive-animation"
          artboard={artboard}
          animations="Timeline"
          fit="cover"
          autoPlay={true}
          loop={true}
          shouldUseIntersectionObserver={false} // Disable to prevent stuck animations
          onLoad={handleLoad}
          onLoadError={handleLoadError}
        />
      )}
      {hasError && fallbackSrc && (
        <img 
          src={fallbackSrc} 
          alt={`${artboard} animation fallback`} 
          className="rive-animation"
          onLoad={() => console.log(`Fallback image loaded for ${artboard}`)}
          onError={() => console.error(`Fallback image failed to load for ${artboard}`)}
        />
      )}
      {hasError && !fallbackSrc && (
        <div className="animation-fallback">
          Animation failed to load: {artboard}
        </div>
      )}
    </div>
  );
};

export default RiveAnimation;
