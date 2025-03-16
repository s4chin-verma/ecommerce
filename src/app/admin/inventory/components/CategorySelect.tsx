'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@urql/next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  GetCategoriesQuery,
  GetCategoriesQueryVariables,
  GetCategoriesDocument,
  Category,
} from '@/graphql/generated';
import { Skeleton } from '@/components/ui/skeleton';

interface CategorySelectProps {
  onValueChange: (value: string) => void;
  value?: string;
  isFormSubmitted?: boolean;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  onValueChange,
  value = '',
  isFormSubmitted = false,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(value);
  const [prevFormSubmitted, setPrevFormSubmitted] = useState(false);

  const [{ data, fetching, error }, executeQuery] = useQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >({
    query: GetCategoriesDocument,
    pause: false,
  });

  useEffect(() => {
    if (isFormSubmitted && !prevFormSubmitted) setSelectedValue('');

    setPrevFormSubmitted(isFormSubmitted);
  }, [isFormSubmitted, prevFormSubmitted]);

  useEffect(() => {
    if (value !== selectedValue) setSelectedValue(value);
  }, [value, selectedValue]);

  const handleValueChange = useCallback(
    (val: string) => {
      setSelectedValue(val);
      onValueChange(val);
    },
    [onValueChange]
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open && !data && !fetching) {
        executeQuery();
      }
    },
    [data, fetching, executeQuery]
  );

  return (
    <Select
      value={selectedValue}
      onValueChange={handleValueChange}
      onOpenChange={handleOpenChange}
    >
      <SelectTrigger className="w-[180px] cursor-pointer">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {fetching ? (
          <>
            {[...Array(4)].map((_, index) => (
              <Skeleton
                key={`loading-${index}`}
                className="w-[170px] h-[30px] my-2"
              />
            ))}
          </>
        ) : error ? (
          <SelectItem value="error">Error loading categories</SelectItem>
        ) : (
          data?.getCategories?.map((category: Category) => (
            <SelectItem
              key={category.id}
              value={category.id || ''}
              className="capitalize cursor-pointer"
            >
              {category.title}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export { CategorySelect };
