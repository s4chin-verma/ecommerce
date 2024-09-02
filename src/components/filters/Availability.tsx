'use client';

import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '../ui/label';

interface Filters {
  inStock: boolean;
  outOfStock: boolean;
}

interface AvailabilityFilterProps {
  onFilterChange: (filters: Filters) => void;
}

const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({
  onFilterChange,
}) => {
  const [filters, setFilters] = useState<Filters>({
    inStock: false,
    outOfStock: false,
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
      inStock: false,
      outOfStock: false,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const selectedCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="border-b border-gray-500 pt-4 pr-4 pb-4">
      <div>
        <h1 className="uppercase font-semibold">Availability</h1>
      </div>
      <div className="flex justify-between my-2">
        <p>{selectedCount} Selected</p>
        <button onClick={resetFilters} className="hover:underline">
          Reset
        </button>
      </div>
      <div>
        <div className="flex items-center space-x-2 gap-2">
          <Checkbox
            checked={filters.inStock}
            onCheckedChange={() => handleFilterChange('inStock')}
          />
          <Label htmlFor="terms">In Stock</Label>
        </div>
        <div className="flex items-center space-x-2 gap-2 mt-2">
          <Checkbox
            checked={filters.outOfStock}
            onCheckedChange={() => handleFilterChange('outOfStock')}
          />
          <Label htmlFor="terms">Out of Stock</Label>
        </div>
      </div>
    </div>
  );
};

export { AvailabilityFilter };
