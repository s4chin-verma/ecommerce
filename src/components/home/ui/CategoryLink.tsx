import Link from 'next/link';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryLinkProps {
  href: string;
  className?: string;
}

export const CategoryLink: React.FC<CategoryLinkProps> = ({
  href,
  className = '',
}) => {
  return (
    <Link href={href}>
      <button
        className={cn(
          'flex items-center gap-2 px-4 py-2 bg-orange-50 text-black-600 rounded-2xl transition-all duration-300 hover:bg-orange-100 hover:shadow-lg hover:-translate-y-1 group',
          className
        )}
      >
        <span className="font-medium">Go To Categories</span>
        <Globe className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
      </button>
    </Link>
  );
};