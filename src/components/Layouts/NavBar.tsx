'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MobileNav } from '@/components/Layouts/ui/MobileNav';
import { DesktopNav } from '@/components/Layouts/ui/DesktopNav';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Check if at top of page
      setIsAtTop(currentScrollY <= 10);

      // Set hasScrolled state to track if user has scrolled at all
      setHasScrolled(currentScrollY > 10);

      // If scrolled down more than 100px, hide the navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      }
      // If scrolling up, show the navbar
      else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    // Initial check
    controlNavbar();

    // Add scroll event listener
    window.addEventListener('scroll', controlNavbar);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  if (pathname.startsWith('/shop/checkouts')) {
    return null;
  }

  return (
    <header
      className={cn(
        'top-0 left-0 right-0 z-50 transition-all duration-300',
        visible ? 'translate-y-0' : '-translate-y-full',
        !isAtTop ? 'bg-theme shadow-md' : 'bg-transparent',
        hasScrolled ? 'sticky' : 'absolute'
      )}
    >
      <DesktopNav showHeaderStrip={isAtTop} />
      <MobileNav />
    </header>
  );
};

export { NavBar };
