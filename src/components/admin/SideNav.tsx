'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Package, ShoppingCart, Users, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { LogoutDialog } from '../LogoutDialog';

const links = [
  { title: 'Overview', href: '/admin', icon: Home },
  { title: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { title: 'Customers', href: '/admin/customers', icon: Users },
  { title: 'Inventory', href: '/admin/inventory', icon: Package },
  { title: 'Settings', href: '/admin/settings', icon: Settings },
];

const SideNav: FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white p-6 shadow-md fixed left-o top-0 bottom-0 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-7">Admin Dashboard</h1>
        <nav className="flex space-y-4 flex-col">
          {links.map((link, i) => {
            const LinkIcon = link.icon;
            return (
              <Link href={link.href} key={i}>
                <Button
                  variant="ghost"
                  className={clsx('w-full justify-start', {
                    'bg-gray-100': pathname === link.href,
                  })}
                >
                  <LinkIcon className="mr-2 h-4 w-4" />
                  {link.title}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
      <LogoutDialog />
    </aside>
  );
};

export { SideNav };
