'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { AlertCircle, Loader2, Search, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { useQuery } from 'urql';
import Image from 'next/image';
import Link from 'next/link';
import {
  SearchProductDocument,
  SearchProductQuery,
  SearchProductQueryVariables,
} from '@/graphql/generated';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface ProductResult {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: { id: string; title: string };
}

const SearchBar: React.FC = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [{ data, fetching, error }] = useQuery<
    SearchProductQuery,
    SearchProductQueryVariables
  >({
    query: SearchProductDocument,
    variables: { query: debouncedSearchTerm },
    pause: !debouncedSearchTerm || debouncedSearchTerm.length < 2,
  });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (showSearch && !typing && !searchTerm) {
      timeout = setTimeout(() => {
        setShowSearch(false);
        setShowResults(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showSearch, typing, searchTerm]);

  // Display error toast when an error occurs
  useEffect(() => {
    if (error) {
      const errorMessage =
        error.graphQLErrors?.[0]?.message ||
        error.message ||
        'An error occurred';
      toast.error(errorMessage);
    }
  }, [error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchTerm(value);
    setTyping(true);
    setShowResults(!!value);
  };

  const handleInputBlur = (): void => {
    setTyping(false);
    if (!searchTerm) {
      setTimeout(() => {
        setShowResults(false);
      }, 200); // Small delay to allow for clicks on results
    }
  };

  const handleInputFocus = (): void => {
    setTyping(true);
    if (searchTerm) {
      setShowResults(true);
    }
  };

  const closeSearch = (): void => {
    setShowSearch(false);
    setShowResults(false);
    setSearchTerm('');
  };

  const products = data?.searchProducts as ProductResult[];

  const renderSearchResults = () => {
    if (fetching) {
      return (
        <div className="p-4 space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-md flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="py-6 px-4 text-sm text-red-500 flex flex-col items-center justify-center">
          <AlertCircle className="h-8 w-8 mb-2" />
          <p className="text-center font-medium">Something went wrong</p>
          <p className="text-center text-xs mt-1 text-gray-500">
            {error.graphQLErrors?.[0]?.message ||
              error.message ||
              'Failed to load search results'}
          </p>
        </div>
      );
    }

    if (!products || products.length === 0) {
      return (
        <div className="py-6 px-4 text-sm text-gray-500 flex flex-col items-center justify-center">
          <ShoppingBag className="h-8 w-8 mb-2 text-gray-400" />
          <p className="text-center font-medium">No products found</p>
          <p className="text-center text-xs mt-1">
            Try a different search term
          </p>
        </div>
      );
    }

    return (
      <div className="py-2">
        {products.map((product: ProductResult) => (
          <Link
            href={`/shop/collections/${product.category.title.toLocaleLowerCase()}/${
              product.id
            }`}
            key={product.id}
            className="flex items-center px-3 py-2 hover:bg-gray-100 transition-colors"
          >
            <div className="w-10 h-10 relative mr-3 flex-shrink-0">
              <Image
                src={product.images[0] || '/placeholder.png'}
                alt={product.name}
                width={40}
                height={40}
                sizes="40px"
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {product.category?.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Desktop view */}
      <div className="hidden md:flex gap-3">
        {showSearch ? (
          <div
            className={`relative flex flex-col transition-all duration-300 ease-in-out ${
              showSearch ? 'w-72' : 'w-0'
            }`}
          >
            <div className="relative">
              <Input
                className="rounded-full pr-10"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                autoFocus
              />
              {fetching ? (
                <Loader2 className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin" />
              ) : (
                <Search className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              )}
            </div>

            {/* Search Results */}
            {showResults && debouncedSearchTerm && (
              <div className="absolute z-50 top-full mt-1 w-full bg-white rounded-md shadow-lg max-h-80 overflow-y-auto border">
                {renderSearchResults()}
              </div>
            )}
          </div>
        ) : (
          <Button
            className="rounded-full bg-gray-800 p-2 cursor-pointer"
            onClick={() => setShowSearch(true)}
          >
            <Search className="h-6 w-6 text-white" />
          </Button>
        )}
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile search overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-white z-50 p-4 md:hidden">
          <div className="relative">
            <Input
              className="rounded-full pr-10"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={closeSearch}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile search results */}
          {showResults && debouncedSearchTerm && (
            <div className="mt-4 max-h-[calc(100vh-120px)] overflow-y-auto">
              {renderSearchResults()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { SearchBar };
