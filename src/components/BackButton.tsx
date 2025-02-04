import Link from 'next/link';
import { ArrowLeftToLine } from 'lucide-react';
import React from 'react';

interface BackButtonProps {
  children?: React.ReactNode;
  href?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  children = 'Back to Home',
  href = '/',
}) => {
  return (
    <div className="flex justify-start">
      <Link
        href={href}
        className="flex items-center gap-2 group transition-colors duration-200 ease-in-out"
        aria-label="Go back"
      >
        <div className="p-2 rounded-full ring-1 ring-black transition-all duration-200 ease-in-out group-hover:ring-orange-700 group-focus:ring-orange-700">
          <ArrowLeftToLine className="h-4 w-4 transition-colors duration-200 ease-in-out group-hover:text-orange-700" />
        </div>
        <span className="text-sm transition-colors duration-200 ease-in-out group-hover:text-orange-700">
          {children}
        </span>
      </Link>
    </div>
  );
};

BackButton.displayName = 'BackButton';
export { BackButton };
