'use client';

import { Icon } from '@iconify/react';

interface IIcon {
  icon: string;
  className?: string;
}

export const IIcon: React.FC<IIcon> = ({ icon, className }) => {
  return <Icon icon={icon} className={className} />;
};
