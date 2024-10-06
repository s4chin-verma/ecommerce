'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { IIcon } from '@/components/IIcon';
import Link from 'next/link';
import { User } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface UserMenuProps {
  userLinks: { href: string; title: string }[];
}

const UserMenu: React.FC<UserMenuProps> = ({ userLinks }) => {
  const session = useSession();
  console.log(session);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <div className="rounded-full bg-gray-800 p-2 cursor-pointer">
          <User className="h-6 w-6 text-white" />
        </div>
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
