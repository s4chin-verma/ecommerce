'use client';

import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  useEffect(() => {
    onPriceChange(localMinPrice, localMaxPrice);
  }, [localMinPrice, localMaxPrice, onPriceChange]);

  const handleMinSliderChange = (value: number[]) => {
    setLocalMinPrice(Math.min(value[0], localMaxPrice));
  };

  const handleMaxSliderChange = (value: number[]) => {
    setLocalMaxPrice(Math.max(value[0], localMinPrice));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'min' | 'max'
  ) => {
    const value = Number(event.target.value);
    if (type === 'min') {
      setLocalMinPrice(Math.min(value, localMaxPrice));
    } else {
      setLocalMaxPrice(Math.max(value, localMinPrice));
    }
  };

  const resetFilters = () => {
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
  };

  return (
    <div className="border-b border-gray-500 py-4 pb-4 pr-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Price Range</h2>
        <button onClick={resetFilters} className="text-sm hover:underline">
          Reset
        </button>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="min-price" className="text-sm font-medium">
              Min Price
            </Label>
            <Input
              id="min-price"
              type="number"
              value={localMinPrice}
              onChange={e => handleInputChange(e, 'min')}
              className="w-24 h-8 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={minPrice}
              max={localMaxPrice}
            />
          </div>
          <Slider
            value={[localMinPrice]}
            min={minPrice}
            max={maxPrice}
            step={1}
            onValueChange={handleMinSliderChange}
            className={cn('w-full')}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="max-price" className="text-sm font-medium">
              Max Price
            </Label>
            <Input
              id="max-price"
              type="number"
              value={localMaxPrice}
              onChange={e => handleInputChange(e, 'max')}
              className="w-24 h-8 text-right [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              min={localMinPrice}
              max={maxPrice}
            />
          </div>
          <Slider
            value={[localMaxPrice]}
            min={minPrice}
            max={maxPrice}
            step={1}
            onValueChange={handleMaxSliderChange}
            className={cn('w-full')}
          />
        </div>
      </div>
    </div>
  );
};

export { PriceFilter };
