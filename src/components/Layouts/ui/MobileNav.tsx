import { FC } from 'react';
import Link from 'next/link';
import { TableOfContents } from 'lucide-react';
import { UserMenu } from '@/components/Layouts/ui/UserMenu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Cart } from '@/components/shop/Cart';
import { SearchBar } from '@/components/Layouts/ui/SearchBar';

export const MobileNav: FC = () => {
  return (
    <nav className="block md:hidden">
      <div className="bg-orange-100 px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold mr-12 cursor-pointer">
          Gems
        </Link>
        <div className="flex items-center gap-4">
          <SearchBar />
          <UserMenu />
          <Cart />
          <Sheet>
            <SheetTrigger asChild>
              <TableOfContents />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
