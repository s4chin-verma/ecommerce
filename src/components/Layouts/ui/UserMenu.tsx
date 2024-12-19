'use client';

import { User } from 'lucide-react';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';
import { FC } from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

const userLinks = [
  { title: 'Profile', href: '/shop/profile' },
  { title: 'Login', href: '/shop/auth/login' },
  { title: 'Register', href: '/shop/auth/register' },
  { title: 'Wishlist', href: '/shop/wishlist' },
];

const UserMenu: FC = () => {
  const windowWidth = useWindowWidth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        {windowWidth !== undefined && windowWidth > 768 ? (
          <div className="rounded-full bg-gray-800 p-2 cursor-pointer">
            <User className="h-2 w-2 md:h-6 md:w-6 text-white" />
          </div>
        ) : (
          <User />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {userLinks.map((link, index) => (
          <DropdownMenuItem key={index}>
            <Link href={link.href}>{link.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserMenu };
