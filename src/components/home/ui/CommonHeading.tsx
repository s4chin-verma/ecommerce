import React from 'react';
import CategoryLink from './CategoryLink';

interface CommonHeadingProps {
  children: React.ReactNode;
  categoryHref?: string;
}

export const CommonHeading: React.FC<CommonHeadingProps> = ({
  children,
  categoryHref = '',
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-gray-900 font-bold text-4xl">{children}</h1>
        <CategoryLink href={categoryHref} />
      </div>
    </div>
  );
};

export default CommonHeading;
