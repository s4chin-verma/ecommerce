'use client';

import React, { useCallback } from 'react';
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
}

const CategorySelect: React.FC<CategorySelectProps> = ({ onValueChange }) => {
  const [{ data, fetching, error }, executeQuery] = useQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >({
    query: GetCategoriesDocument,
    pause: true,
  });

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open && !data && !fetching) {
        executeQuery();
      }
    },
    [data, fetching, executeQuery]
  );

  return (
    <Select onValueChange={onValueChange} onOpenChange={handleOpenChange}>
      <SelectTrigger className="w-[180px]">
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
              className="capitalize"
            >
              {category.title}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
