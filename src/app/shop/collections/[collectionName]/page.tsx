'use client';

import React, { use, useState } from 'react';
import { useQuery } from 'urql';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Card } from '@/components/ui/card';
import {
  GetProductsDocument,
  GetProductsQuery,
  GetProductsQueryVariables,
} from '@/graphql/generated';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AvailabilityFilter } from '@/app/shop/collections/components/Availability';
import { ProductTypeFilter } from '@/app/shop/collections/components/ProductType';
import { PriceFilter } from '@/app/shop/collections/components/Price';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, PackageSearch, AlertCircle } from 'lucide-react';
import { ProductCard } from '@/components/shop/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductCardProps as Product } from '@/lib/interface';
import { cn } from '@/lib/utils';

export interface ProductEdge {
  node: Product;
  cursor: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface ProductsResponse {
  getProducts: {
    edges: ProductEdge[];
    pageInfo: PageInfo;
  };
}

const ITEMS_PER_PAGE = 6;

const ProductCardSkelton = () => (
  <Card className="mx-3 rounded-2xl">
    <Skeleton className="h-96 w-full rounded-2xl" />
  </Card>
);

export default function Page({
  params,
}: {
  params: Promise<{ collectionName: string }>;
}) {
  const resolvedParams = use(params);
  const collectionName = resolvedParams.collectionName;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginationDirection, setPaginationDirection] = useState<
    'forward' | 'backward'
  >('forward');

  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [startCursor, setStartCursor] = useState<string | null>(null);

  const [{ data, fetching, error }] = useQuery<
    GetProductsQuery,
    GetProductsQueryVariables
  >({
    query: GetProductsDocument,
    variables: {
      first: paginationDirection === 'forward' ? ITEMS_PER_PAGE : null,
      after: paginationDirection === 'forward' ? endCursor : null,
      last: paginationDirection === 'backward' ? ITEMS_PER_PAGE : null,
      before: paginationDirection === 'backward' ? startCursor : null,
    },
  });

  const products = data?.getProducts?.edges?.map(edge => edge?.node) || [];
  const pageInfo = data?.getProducts?.pageInfo as PageInfo;

  const handleNextPage = (): void => {
    if (pageInfo?.hasNextPage && pageInfo?.endCursor) {
      setCurrentPage(currentPage + 1);
      setEndCursor(pageInfo.endCursor);
      setPaginationDirection('forward');

      if (pageInfo.startCursor) setStartCursor(pageInfo.startCursor);
    }
  };

  const handlePreviousPage = (): void => {
    if (currentPage > 1 && pageInfo?.hasPreviousPage && pageInfo?.startCursor) {
      setCurrentPage(currentPage - 1);
      setStartCursor(pageInfo.startCursor);
      setPaginationDirection('backward');

      if (pageInfo.endCursor) setEndCursor(pageInfo.endCursor);
    }
  };

  const handleFilterChange = () => {};

  return (
    <main>
      <section className="pt-36">
        <div className="max-w-6xl mx-auto px-3 flex flex-row justify-stretch">
          <div className="w-[25%] sticky top-36 border-r">
            <div className="border-b border-gray-500 h-16 flex items-center">
              <h1 className="text-2xl font-bold">Filters</h1>
            </div>
            <ScrollArea className="h-[600px]">
              <AvailabilityFilter onFilterChange={handleFilterChange} />
              <ProductTypeFilter onFilterChange={handleFilterChange} />
              <PriceFilter
                minPrice={999}
                maxPrice={99999}
                onPriceChange={handleFilterChange}
              />
            </ScrollArea>
          </div>
          <div className="flex flex-col w-[75%] h-full border-l border-gray-500 pb-10">
            <div className="border-b py-2 px-3 border-gray-500 h-16">
              <div className="flex items-center justify-between">
                <h1 className="ml-3">
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

            {error ? (
              <div className="flex flex-col items-center justify-center p-16 text-center">
                <div className="bg-red-50 p-6 rounded-xl border border-red-200 shadow-md max-w-md">
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-red-700 mb-2">
                    Something went wrong
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We couldn't fetch the products at this time.
                  </p>
                  <p className="text-red-600 bg-red-100 p-2 rounded text-sm mb-4">
                    {error.message}
                  </p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : fetching ? (
              <div className="pt-4 pb-10 pl-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-5">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <ProductCardSkelton key={i} />
                  ))}
                </div>
              </div>
            ) : (
              <>
                {!products || products.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-96 text-center px-4">
                    <PackageSearch className="h-24 w-24 text-gray-400 mb-6" />
                    <h1 className="text-2xl font-bold text-gray-700 mb-3">
                      No products found
                    </h1>
                    <p className="text-gray-500 mb-6 max-w-md">
                      We couldn't find any products matching your criteria. Try
                      adjusting your filters or browse other collections.
                    </p>
                    <Button
                      onClick={() => window.location.reload()}
                      className="bg-black text-white hover:bg-gray-800 transition-colors"
                    >
                      Reset Filters
                    </Button>
                  </div>
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

                {products && products.length > 0 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={handlePreviousPage}
                          className={cn(
                            'cursor-pointer',
                            currentPage === 1
                              ? 'pointer-events-none opacity-50 '
                              : 'cursor-pointer'
                          )}
                        />
                      </PaginationItem>

                      {/* Simple page number indicator - not clickable */}
                      <PaginationItem>
                        <PaginationLink
                          isActive={false}
                          className="pointer-events-none"
                        >
                          {currentPage}
                        </PaginationLink>
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationNext
                          onClick={handleNextPage}
                          className={
                            !pageInfo?.hasNextPage
                              ? 'pointer-events-none opacity-50 cursor-pointer'
                              : 'cursor-pointer'
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
