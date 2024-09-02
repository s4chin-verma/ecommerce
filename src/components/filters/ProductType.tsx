'use client';

import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface Filters {
  bracelet: boolean;
  earrings: boolean;
  necklace: boolean;
  ring: boolean;
}

interface ProductTypeFilterProps {
  onFilterChange: (filters: Filters) => void;
}

const ProductTypeFilter: React.FC<ProductTypeFilterProps> = ({
  onFilterChange,
}) => {
  const [filters, setFilters] = useState<Filters>({
    bracelet: false,
    earrings: false,
    necklace: false,
    ring: false,
  });

  const handleFilterChange = (filterName: keyof Filters) => {
    setFilters(prevFilters => {
      const newFilters = {
        ...prevFilters,
        [filterName]: !prevFilters[filterName],
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const resetFilters = () => {
    const resetFilters: Filters = {
      bracelet: false,
      earrings: false,
      necklace: false,
      ring: false,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const selectedCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="border-b border-gray-500 pt-4 pr-4 pb-4">
      <div>
        <h1 className="uppercase font-semibold">Product Type</h1>
      </div>
      <div className="flex justify-between my-2">
        <p>{selectedCount} Selected</p>
        <button onClick={resetFilters} className="hover:underline">
          Reset
        </button>
      </div>
      <div>
        {Object.entries(filters).map(([key, value]) => (
          <div key={key} className="flex items-center gap-3 mb-1">
            <Checkbox
              checked={value}
              onCheckedChange={() => handleFilterChange(key as keyof Filters)}
            />
            <p>{key.charAt(0).toUpperCase() + key.slice(1)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ProductTypeFilter };
