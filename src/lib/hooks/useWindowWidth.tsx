'use client';

import { useState, useEffect } from 'react';

function useWindowWidth() {
  // Initialize with undefined to indicate that the width is not yet known
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width
      setWindowWidth(window.innerWidth);
    }

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowWidth;
}

export { useWindowWidth };
