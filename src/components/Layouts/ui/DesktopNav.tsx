'use client';

import Link from 'next/link';
import { Dropdown1, Dropdown2 } from '@/components/Layouts/ui/DropDown';
import { SearchBar } from '@/components/Layouts/ui/SearchBar';
import { UserMenu } from '@/components/Layouts/ui/UserMenu';
import { HeaderStrip } from '@/components/Layouts/ui/HeaderStrip';
import { Cart } from '@/components/shop/Cart';

const pagesLink = [
  { title: 'About us', href: '/shop/about-us' },
  { title: 'Contact us', href: '/shop/contact-us' },
  { title: "Faq's", href: '/shop/faqs' },
  { title: 'Collection Page', href: '/shop/collections' },
  { title: 'Blog Page', href: '/shop/blog' },
  { title: 'Article Page', href: '/shop/article' },
];

const products = [
  { title: 'Diamond Hoop Earrings', href: '' },
  { title: 'Garnet Hoop Earrings', href: '' },
  { title: 'Round Rope Bracelet', href: '' },
  { title: 'Solitaire Pendant Necklace', href: '' },
  { title: 'Topaz Round Rope Bracelet', href: '' },
];

const Collection = [
  { title: 'Earings', href: '/shop/collections/earrings' },
  { title: 'Neckless', href: '/shop/collections/neckless' },
  { title: 'Rings', href: '/shop/rings' },
  { title: 'Bracelet', href: '/shop/bracelet' },
];

const DesktopNav = () => {
  return (
    <div className="invisible md:visible">
      <HeaderStrip />
      <nav className="max-w-6xl mx-auto px-3 flex items-center">
        <Link href="/" className="text-4xl font-bold mr-12 cursor-pointer">
          Luxe
        </Link>
        <div className="bg-nav rounded-full w-full p-3.5 flex justify-between">
          <div className="flex items-center">
            <Dropdown1 title="All Products" links={products} />
            <span className="ml-6 cursor-pointer hover:border-b-2 hover:border-orange-800">
              Ring
            </span>
            <Dropdown2 title="Pages" links={pagesLink} />
            <span className="cursor-pointer hover:border-b-2 hover:border-orange-800">
              Diamond
            </span>
          </div>
          <div className="flex gap-3">
            <SearchBar />
            <UserMenu />
            <Cart />
          </div>
        </div>
      </nav>
    </div>
  );
};

export { DesktopNav };
