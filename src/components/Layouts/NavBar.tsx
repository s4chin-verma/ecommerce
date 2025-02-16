'use client';

import { usePathname } from 'next/navigation';
import { MobileNav } from '@/components/Layouts/ui/MobileNav';
import { DesktopNav } from '@/components/Layouts/ui/DesktopNav';

const NavBar = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/shop/checkouts')) {
    return null;
  }

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <DesktopNav />
      <MobileNav />
    </header>
  );
};

export { NavBar };
