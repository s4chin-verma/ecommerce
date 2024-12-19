'use client';

import { FC, useState } from 'react';
import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Divide, Heading1 } from 'lucide-react';
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
import { ProductCard, ProductGrid } from '@/components/home/ui';
import { useQuery } from 'urql';
import {
  GetProductsQuery,
  GetProductsQueryVariables,
  GetProductsDocument,
} from '@/graphql/generated';
import { Product, User } from '@prisma/client';

interface Props {
  params: {
    collectionName: string;
  };
}

const CollectionPage: NextPage<Props> = ({ params }) => {
  const { collectionName } = params;
  if (!collectionName) notFound();

  const [first, setFirst] = useState(9); // Items per page for forward
  const [last, setLast] = useState(9); // Items per page for backward
  const [after, setAfter] = useState<string | null>(null); // Cursor for forward pagination
  const [before, setBefore] = useState<string | null>(null); // Cursor for backward pagination

  const [{ data, fetching, error }] = useQuery<
    GetProductsQuery,
    GetProductsQueryVariables
  >({
    query: GetProductsDocument,
    variables: after ? { first, after } : { last, before }, // Use after or before based on state
  });

  const products = data?.getProducts?.edges?.map(edge => edge?.node) || [];
  const pageInfo = data?.getProducts?.pageInfo;

  // Function to handle going to the next page

  const handleNextPage = () => {
    if (pageInfo?.hasNextPage && pageInfo?.endCursor) {
      setAfter(pageInfo.endCursor); // Set the 'after' cursor for the next page
      setBefore(null); // Reset 'before' to null as we are going forward
    }
  };
  // Function to handle going to the previous page
  const handlePreviousPage = () => {
    if (before) {
      setBefore(pageInfo?.startCursor); // Set 'before' cursor for the previous page
      setAfter(null); // Reset 'after' as we are moving backward
    } else {
      setAfter(null); // If we are on the first page, reset both
      setBefore(null);
    }
  };

  const handleFilterChange = () => {
    // Add logic here to update filters and refetch products
  };

  // Handling loading and error states

  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="pt-36">
      <section>
        <div className="max-w-6xl mx-auto px-3 flex flex-row justify-stretch">
          {/* Filters Section */}
          <div className="w-[25%] sticky top-36">
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

          {/* Products Section */}
          <div className="w-[75%] border-l border-gray-500">
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
            {fetching ? (
              <div>Loading...</div>
            ) : (
              <>
                {!products || products.length === 0 ? (
                  <h1 className="text-center my-5">No Product Found</h1>
                ) : (
                  <div className="pt-4 pl-3 pb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-5">
                      {products.map(product => (
                        <ProductCard
                          key={product?.id}
                          product={product as Product}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={handlePreviousPage} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => {
                      setAfter(null);
                      setBefore(null);
                    }}
                    isActive={!after && !before}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                {after && (
                  <PaginationItem>
                    <PaginationLink isActive>2</PaginationLink>
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={handleNextPage} />
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
