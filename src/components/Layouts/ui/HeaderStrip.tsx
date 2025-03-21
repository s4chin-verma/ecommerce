'use client';

import { FC, useEffect, useState } from 'react';
import { ChevronDown, Phone, Send } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const HeaderStrip: FC = () => {
  const pathname = usePathname();
  const [isRootPath, setIsRootPath] = useState(false);

  useEffect(() => {
    setIsRootPath(pathname === '/');
  }, [pathname]);

  const textColorClass = isRootPath ? 'text-white' : 'text-black';

  return (
    <div
      className={cn('max-w-6xl mx-auto px-3 pt-3 pb-2', `${textColorClass}`)}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Send className="h-4 w-4" />
          <h6 className="text-sm">
            <b>7 days a week</b> from 9:00 am to 7:00 pm
          </h6>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  'px-1.5 pl-3 py-0.5 border rounded-full flex items-center text-sm',
                  `${isRootPath ? 'border-white' : 'border-gray-800'} `
                )}
              >
                INR
                <ChevronDown />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>USD</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>INR</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href={'/shop/contact-us'}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Phone className="h-4 w-4" />
            <h5 className="text-sm">Contact</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { HeaderStrip };
