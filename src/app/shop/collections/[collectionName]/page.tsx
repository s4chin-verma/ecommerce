'use client';

import React, { use, useState } from 'react';
import { useQuery } from 'urql';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
import { notFound } from 'next/navigation';
import { ScrollArea } from '@radix-ui/react-scroll-area';
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
import { ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/home/ui';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sellingPrice: number;
  stock: number;
  images: string[];
  categoryId: string;
  wishlistId: string;
  ratings: number | null;
  category: { title: string };
  createdAt: Date;
  updatedAt: Date;
}
export interface ProductEdge {
  node: Product;
  cursor: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface ProductsResponse {
  getProducts: {
    edges: ProductEdge[];
    pageInfo: PageInfo;
  };
}

const ITEMS_PER_PAGE = 9;

const ProductCardSkelton = () => (
  <Card className="mx-3 rounded-2xl">
    <Skeleton className="h-96 w-15 rounded-2xl" />
  </Card>
);

export default function Page({
  params,
}: {
  params: Promise<{ collectionName: string }>;
}) {
  const resolvedParams = use(params);
  const collectionName = resolvedParams.collectionName;
  if (!collectionName) notFound();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cursor, setCursor] = useState<string | null>(null);
  const [{ data, fetching, error }] = useQuery<
    GetProductsQuery,
    GetProductsQueryVariables
  >({
    query: GetProductsDocument,
    variables: {
      first: ITEMS_PER_PAGE,
      after: cursor,
    },
  });

  if (error)
    return <div className="text-red-500 p-4">Error: {error.message}</div>;

  const products = data?.getProducts?.edges?.map(edge => edge?.node) || [];
  const pageInfo = data?.getProducts?.pageInfo;

  const handlePageChange = (pageNumber: number): void => {
    if (pageNumber < currentPage) {
      // TODO: Implement backward pagination
      return;
    }

    setCurrentPage(pageNumber);
    setCursor(pageInfo?.endCursor || null);
  };

  const totalPages = pageInfo?.hasNextPage ? currentPage + 1 : currentPage;
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
          <div className="flex flex-col w-[75%] h-full border-l border-gray-500">
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

            {fetching ? (
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
                  <h1 className="text-center my-5">No Product Found</h1>
                ) : (
                  <div className="pt-4 pl-3 pb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-5">
                      {products.map(product => (
                        <Link
                          href={`/shop/collections/${collectionName}/${product?.id}`}
                          key={product?.id}
                        >
                          <ProductCard product={product as Product} />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                s
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          currentPage > 1 && handlePageChange(currentPage - 1)
                        }
                        className={
                          currentPage === 1
                            ? 'pointer-events-none opacity-50'
                            : ''
                        }
                      />
                    </PaginationItem>

                    {[...Array(Math.min(totalPages, 5))].map((_, index) => (
                      <PaginationItem key={index + 1}>
                        <PaginationLink
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            handlePageChange(index + 1);
                          }}
                          isActive={currentPage === index + 1}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    {totalPages > 5 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          pageInfo?.hasNextPage &&
                          handlePageChange(currentPage + 1)
                        }
                        className={
                          !pageInfo?.hasNextPage
                            ? 'pointer-events-none opacity-50'
                            : ''
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
