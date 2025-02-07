'use client';

import { usePathname } from 'next/navigation';
import { MobileNav } from '@/components/Layouts/ui/MobileNav';
import { DesktopNav } from '@/components/Layouts/ui/DesktopNav';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

const NavBar = () => {
  const pathname = usePathname();
  const windowWidth = useWindowWidth();

  // Hide navbar on any route that starts with `/shop/checkouts/`
  if (pathname.startsWith('/shop/checkouts')) {
    return null;
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      {windowWidth !== undefined && windowWidth > 768 ? (
        <DesktopNav />
      ) : (
        <MobileNav />
      )}
    </header>
  );
};

export { NavBar };
