'use client';

import { useState } from 'react';
import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AvailabilityFilter } from '@/components/filters/Availability';
import { ProductTypeFilter } from '@/components/filters/ProductType';
import { PriceFilter } from '@/components/filters/Price';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ProductGrid } from '@/components/home/ui';
import { useQuery } from 'urql';
import {
  GetProductsQuery,
  GetProductsQueryVariables,
  GetProductsDocument,
} from '@/graphql/generated';

interface Props {
  params: {
    collectionName: string;
  };
}

const CollectionPage: NextPage<Props> = ({ params }) => {
  const [first, setFirst] = useState(10);
  const [after, setAfter] = useState<string | null>(null);

  const [{ data, fetching, error }] = useQuery<
    GetProductsQuery,
    GetProductsQueryVariables
  >({
    query: GetProductsDocument,
    variables: { first, after },
  });

  const products = data?.getProducts?.edges?.map(edge => edge?.node) || [];
  const pageInfo = data?.getProducts?.pageInfo;
  const { collectionName } = params;

  if (!collectionName) notFound();

  const handleNextPage = () => {
    if (pageInfo?.hasNextPage && pageInfo?.endCursor) {
      setAfter(pageInfo.endCursor);
    }
  };

  const handlePreviousPage = () => {
    setAfter(null); // Reset to first page for simplicity
  };

  const handleFilterChange = () => {
    // Implement filter logic here
  };

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="pt-36">
      <section>
        <div className="max-w-6xl mx-auto px-3 flex flex-row justify-stretch">
          <div className="w-[25%] sticky top-36">
            {/* Filters section */}
            <div className="border-b border-gray-500 h-16 flex items-center">
              <h1 className="text-2xl font-bold">Filters</h1>
            </div>
            <ScrollArea className="h-[600px] rounded-md border-0 p-0">
              <AvailabilityFilter onFilterChange={handleFilterChange} />
              <ProductTypeFilter onFilterChange={handleFilterChange} />
              <PriceFilter
                minPrice={999}
                maxPrice={99999}
                onPriceChange={handleFilterChange}
              />
            </ScrollArea>
          </div>
          <div className="w-[75%] border-l border-gray-500">
            {/* Products section */}
            <div className="border-b py-2 px-3 border-gray-500 h-16">
              <div className="flex items-center justify-between">
                <h1>
                  Home / <span className="capitalize">{collectionName}</span>
                </h1>
                <div className="flex gap-4 items-center">
                  <h1 className="font-bold text-lg">Sort By:</h1>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="rounded-full bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ring-1 ring-gray-600">
                        <span>Price</span>
                        <ChevronDown className="ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-nav">
                      <DropdownMenuItem>Low to High</DropdownMenuItem>
                      <DropdownMenuItem>High to Low</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <div className="pt-4 pl-3 pb-10">
              {products ? <ProductGrid products={products} /> : null}
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={handlePreviousPage}
                    disabled={!after}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive={!after}>
                    1
                  </PaginationLink>
                </PaginationItem>
                {after && (
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={handleNextPage}
                    disabled={!pageInfo?.hasNextPage}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CollectionPage;
