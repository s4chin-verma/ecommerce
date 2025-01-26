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
import { useSession } from 'next-auth/react';
import { LogoutDialog } from '@/components/LogoutDialog';

const UserMenu: FC = () => {
  const windowWidth = useWindowWidth();
  const { data: session, status } = useSession();

  const userLinks =
    status === 'authenticated'
      ? [
          { title: 'Profile', href: `/shop/user/${session?.user?.id}` },
          { title: 'Wishlist', href: '/shop/wishlist' },
        ]
      : [
          { title: 'Login', href: '/shop/auth/login' },
          { title: 'Register', href: '/shop/auth/register' },
        ];

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
        {status === 'authenticated' && (
          <DropdownMenuItem onSelect={e => e.preventDefault()}>
            <LogoutDialog>
              <span className="text-sm cursor-pointer">Log Out</span>
            </LogoutDialog>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { UserMenu };
