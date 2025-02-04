'use client';

import { MobileNav } from '@/components/Layouts/ui/MobileNav';
import { DesktopNav } from '@/components/Layouts/ui/DesktopNav';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

const NavBar = () => {
  const windowWidth = useWindowWidth();

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      {/* {windowWidth !== undefined && windowWidth > 768 ? (
        <DesktopNav />
      ) : (
        <MobileNav />
      )} */}

      <DesktopNav />
    </header>
  );
};

export { NavBar };
