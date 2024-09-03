'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DropdownWithValueProps {
  items: string[];
  onChange?: (value: string) => void;
}

const DropdownWithValue: React.FC<DropdownWithValueProps> = ({
  items,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState(items[0]);

  const handleSelect = (item: string) => {
    setSelectedValue(item);
    if (onChange) {
      onChange(item);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between w-[80%] px-3 py-2 text-sm capitalize border rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <span>{selectedValue}</span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onSelect={() => handleSelect(item)}
            className="cursor-pointer"
          >
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { DropdownWithValue };
