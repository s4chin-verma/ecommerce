import React from 'react';
import CategoryLink from './CategoryLink';
import { cn } from '@/lib/utils';

export interface CommonHeadingProps {
  children: React.ReactNode;
  categoryHref?: string;
  className?: string;
}

const CommonHeading: React.FC<CommonHeadingProps> = ({
  children,
  categoryHref = '',
  className,
}) => {
  return (
    <div className="mb-6 px-3">
      <div className="flex justify-between items-center">
        <h1 className={cn('text-gray-900 font-bold text-4xl', className)}>
          {children}
        </h1>
        <CategoryLink href={categoryHref} />
      </div>
    </div>
  );
};

CommonHeading.displayName = 'CommonHeading';

export { CommonHeading };