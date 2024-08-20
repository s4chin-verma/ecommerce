'use client';

import { FC, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import Link from 'next/link';

interface DropdownProps {
  title: string;
  links: { href: string; title: string }[];
}

const Dropdown1: FC<DropdownProps> = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          className="rounded-full group focus:outline-none focus:border-none"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {title}
          <ChevronDown
            className={clsx('ml-2 transition-transform duration-300', {
              'rotate-180': isOpen,
              'rotate-0': !isOpen,
            })}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-nav"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {links.map((link, index) => (
          <DropdownMenuItem key={index}>
            <Link href={link.href}>{link.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const Dropdown2: FC<DropdownProps> = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className="mx-4 flex items-center cursor-pointer group focus:outline-none"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {title}
          <ChevronDown
            className={clsx('ml-2 transition-transform duration-300', {
              'rotate-180': isOpen,
              'rotate-0': !isOpen,
            })}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-nav"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {links.map((link, index) => (
          <DropdownMenuItem key={index}>
            <Link href={link.href}>{link.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { Dropdown1, Dropdown2 };
