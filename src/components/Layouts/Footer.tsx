import Link from 'next/link';
import { Youtube, Twitter, Facebook, Instagram } from 'lucide-react';

interface NavItemProps {
  href: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, label }) => (
  <li className="relative">
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
    <h6 className="uppercase font-semibold mb-4">{title}</h6>
    <ul className="space-y-2 text-sm">
      {items.map((item, index) => (
        <NavItem key={index} href={item.href} label={item.label} />
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const navigationItems: IItems[] = [
    { href: '#', label: 'Search' },
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '#', label: 'Delivery Page' },
    { href: '/term-conditions', label: 'Terms & Conditions' },
  ];

  const aboutUsItems: IItems[] = [
    { href: '/about-us', label: 'About us' },
    { href: '/contact-us', label: 'Contact us' },
    { href: '/faqs', label: "Faq's" },
    { href: '#', label: 'Collection Page' },
    { href: '#', label: 'Blog Page' },
    { href: '#', label: 'Article Page' },
  ];

  const jewelryItems: IItems[] = [
    { href: '#', label: 'Earrings' },
    { href: '#', label: 'Necklace' },
    { href: '#', label: 'Rings' },
    { href: '#', label: 'Bracelet' },
  ];

  const otherAboutUsItems: IItems[] = [
    { href: '#', label: 'Home' },
    { href: '#', label: 'Catalog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-gray-100 pt-20 pb-8">
      <div className="max-w-6xl px-3 mx-auto flex flex-wrap gap-8">
        <div className="max-w-64">
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
        <Section title="About us:" items={aboutUsItems} />
        <Section title="Navigation:" items={jewelryItems} />
        <Section title="About us:" items={otherAboutUsItems} />
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
export { Footer };
