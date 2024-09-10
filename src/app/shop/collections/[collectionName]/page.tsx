'use client';

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
import Link from 'next/link';
import clsx from 'clsx';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
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
import {
  ProductCard,
  ProductCarouselWrapper,
  ProductGrid,
} from '@/components/home/ui';
import { dummyProducts } from '@/data/data';

interface Props {
  params: {
    collectionName: string;
  };
}

const CollectionPage: NextPage<Props> = ({ params }) => {
  const { collectionName } = params;

  if (!collectionName) notFound();

  const handleFilterChange = () => {
    return;
  };

  return (
    <main className="pt-36">
      <section>
        <div className="max-w-6xl mx-auto px-3 flex flex-row justify-stretch">
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
          <div className="w-[75%] border-l border-gray-500">
            <div className="border-b py-2 px-3 border-gray-500 h-16">
              <div className="flex items-center justify-between">
                <h1>
                  Home / <span className="capitalize">{collectionName}</span>
                </h1>
                <div className="flex gap-4 items-center">
                  <h1 className="font-bold text-lg ">Sort By:</h1>
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
              <ProductGrid products={dummyProducts} />
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href={`/collections/${collectionName}`} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
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
