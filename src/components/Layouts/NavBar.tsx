import Link from 'next/link';
import { Dropdown1, Dropdown2 } from '@/components/Layouts/ui/DropDown';
import { SearchBar } from '@/components/Layouts/ui/SearchBar';
import { UserMenu } from '@/components/Layouts/ui/UserMenu';
import { IIcon } from '@/components/IIcon';
import { HeaderStrip } from '@/components/Layouts/ui/HeaderStrip';

const pagesLink = [
  { title: 'About us', href: '/about-us' },
  { title: 'Contact us', href: '/contact-us' },
  { title: "Faq's", href: '/faqs' },
  { title: 'Collection Page', href: '#' },
  { title: 'Blog Page', href: '#' },
  { title: 'Article Page', href: '#' },
];

const userLinks = [
  { title: 'Profile', href: '#' },
  { title: 'Login', href: '/account/login' },
  { title: 'Register', href: '/account/register' },
  { title: 'wishlist', href: '#' },
];

const products = [
  { title: 'Diamond Hoop Earrings', href: '' },
  { title: 'Garnet Hoop Earrings', href: '' },
  { title: 'Round Rope Bracelet', href: '' },
  { title: 'Solitaire Pendant Necklace', href: '' },
  { title: 'Topaz Round Rope Bracelet', href: '' },
];

const Collection = [
  { title: 'Earings', href: '' },
  { title: 'Neckless', href: '' },
  { title: 'Rings', href: '' },
  { title: 'Bracelet', href: '' },
];

const NavBar = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <HeaderStrip />
      <nav className="max-w-6xl mx-auto px-3 flex items-center">
        <Link href="/" className="text-4xl font-bold mr-12 cursor-pointer">
          Gems
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
            <UserMenu userLinks={userLinks} />
            <div className="flex items-center border border-gray-600 rounded-full">
              <span className="mx-3">Cart 1:items</span>
              <div className="rounded-full bg-gray-800 p-2 cursor-pointer">
                <IIcon icon="mdi:cart" className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export { NavBar };
