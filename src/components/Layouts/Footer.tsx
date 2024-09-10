import Link from 'next/link';
import { Youtube, Twitter, Facebook, Instagram } from 'lucide-react';

interface NavItemProps {
  href: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, label }) => (
  <li className="relative mt-1">
    <Link
      href={href}
      className="group hover:text-orange-700 hover:border-b-2 hover:border-orange-700"
    >
      {label}
    </Link>
  </li>
);

interface IItems {
  href: string;
  label: string;
}

interface SectionProps {
  title: string;
  items: IItems[];
}

const Section: React.FC<SectionProps> = ({ title, items }) => (
  <div className="flex-1">
    <h6 className="uppercase font-semibold mb-2 md:mb-4">{title}</h6>
    <ul className="space-y-2 text-sm">
      {items.map((item, index) => (
        <NavItem key={index} href={item.href} label={item.label} />
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const navigationItems: IItems[] = [
    { href: '/shop', label: 'Home' },
    { href: '/shop/privacy-policy', label: 'Privacy Policy' },
    { href: '/shop/delivery', label: 'Delivery Page' },
  ];

  const aboutUsItems: IItems[] = [
    { href: '/shop/about-us', label: 'About us' },
    { href: '/shop/contact-us', label: 'Contact us' },
    { href: '/shop/faqs', label: "Faq's" },
    { href: '/shop/blog', label: 'Blog Page' },
    { href: '/shop/article', label: 'Article Page' },
    { href: '/shop/term-conditions', label: 'Terms & Conditions' },
  ];

  const jewelryItems: IItems[] = [
    { href: '/shop/collections/earrings', label: 'Earrings' },
    { href: '/shop/collections/necklace', label: 'Necklace' },
    { href: '/shop/collections/ring', label: 'Rings' },
    { href: '/shop/collections/bracelet', label: 'Bracelet' },
    { href: '/shop/collections', label: 'Collection Page' },
  ];

  const otherAboutUsItems: IItems[] = [
    { href: '/shop/collections/all', label: 'Catalog' },
    { href: '/shop/contact-us', label: 'Contact' },
    { href: '/admin', label: 'Admin' },
  ];

  return (
    <footer className="bg-gray-100 pt-5 md:pt-20 pb-10">
      <div className="max-w-6xl px-3 mx-auto flex flex-col md:flex-row gap-5 md:gap-8">
        <div className="max-w-64 flex-1">
          <h6 className="text-4xl font-semibold mb-4">Gems</h6>
          <p className="text-sm mb-4">
            The variety and range of gemstones available allowed me to find the
            perfect stone for every occasion and mood.
          </p>
          <div className="flex space-x-3">
            <Link href="#">
              <Twitter />
            </Link>
            <Link href="#">
              <Instagram />
            </Link>
            <Link href="#">
              <Facebook />
            </Link>
            <Link href="#">
              <Youtube />
            </Link>
          </div>
        </div>

        <Section title="Navigation:" items={navigationItems} />
        <Section title="Help:" items={aboutUsItems} />
        <Section title="Navigation:" items={jewelryItems} />
        <Section title="About us:" items={otherAboutUsItems} />
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
export { Footer };
