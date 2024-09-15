'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, Package, ShoppingCart, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { title: 'Overview', href: '/admin', icon: Home },
  { title: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { title: 'Products', href: '/admin/products', icon: Package },
  { title: 'Customers', href: '/admin/customers', icon: Users },
  { title: 'Inventory', href: '/admin/inventory', icon: Package },
];

const SideNav: FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white p-6 shadow-md fixed left-o top-0 bottom-0">
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
    </aside>
  );
};

export { SideNav };
