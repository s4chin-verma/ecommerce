'use client';

import React, { use, useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, Edit2, Scissors, ShoppingCart, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BackButton } from '@/components/BackButton';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Skeleton } from '@/components/ui/skeleton';
import {
  GetProductDocument,
  GetProductQuery,
  GetProductQueryVariables,
} from '@/graphql/generated';
import { useQuery } from 'urql';
import { WishListIcon } from '@/app/shop/collections/components/wishlist';
import Link from 'next/link';

const ProductDetailSkeleton = () => (
  <div className="grid md:grid-cols-2 gap-8 px-3">
    <div>
      <Skeleton className="aspect-square rounded-3xl mb-4" />
      <div className="flex gap-2 justify-center">
        <Skeleton className="w-16 h-16 rounded-lg" />
        <Skeleton className="w-16 h-16 rounded-lg" />
      </div>
    </div>
    <div className="space-y-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-8 w-32" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-40" />
        <div className="flex gap-5 justify-start pt-6">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>
    </div>
  </div>
);

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          className="w-5 h-5 fill-current text-primary"
          viewBox="0 0 20 20"
        >
          <path d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="w-5 h-5 fill-current text-primary" viewBox="0 0 20 20">
          <path
            d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z"
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          className="w-5 h-5 fill-current text-gray-300"
          viewBox="0 0 20 20"
        >
          <path d="M10 15.27L16.18 19L14.54 11.97L20 7.24L12.81 6.63L10 0L7.19 6.63L0 7.24L5.46 11.97L3.82 19L10 15.27Z" />
        </svg>
      ))}
    </div>
  );
};

interface Product {
  id: string;
  name: string | null;
  description: string | null;
  images: string[];
  price: number | null;
  ratings: number | null;
  sellingPrice: number | null;
  stock: number | null;
  category: {
    title: string | null;
  } | null;
}

export default function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const resolvedParams = use(params);
  const productId = resolvedParams.productId;
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const [{ data, fetching, error }] = useQuery<
    GetProductQuery,
    GetProductQueryVariables
  >({
    query: GetProductDocument,
    variables: { getProductId: productId },
  });

  if (fetching)
    return (
      <main className="pt-36">
        <section>
          <div className="min-h-screen bg-[#d4b7a8] p-6">
            <div className="max-w-6xl mx-auto">
              <ProductDetailSkeleton />
            </div>
          </div>
        </section>
      </main>
    );

  if (error) return <div>Error: {error.message}</div>;
  if (!data?.getProduct) return <div>Product not found</div>;

  const product = data.getProduct as Product;
  const description = product.description || '';
  const shouldTruncate = description.length > 50;
  const images = product.images || [];
  const productName = product.name || 'Untitled Product';
  const categoryTitle = product.category?.title || 'category';
  const sellingPrice = product.sellingPrice || 0;
  const originalPrice = product.price || 0;
  const rating = product.ratings || 0;
  const stock = product.stock || 0;

  return (
    <main className="pt-36">
      <section>
        <div className="min-h-screen bg-[#d4b7a8] p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 px-3">
              <div>
                <Card className="relative aspect-square overflow-hidden bg-transparent rounded-3xl mb-4">
                  <Image
                    src={images[currentImage] || '/placeholder.svg'}
                    alt={productName}
                    sizes="50"
                    fill
                    priority
                    className="object-contain p-8"
                  />
                </Card>
                <div className="flex gap-2 justify-center">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-16 h-16 rounded-lg border-2 overflow-hidden ${
                        currentImage === idx
                          ? 'border-primary'
                          : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={img || '/placeholder.svg'}
                        alt={`Product thumbnail ${idx + 1}`}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <BackButton href="/shop/collections">
                    <span>Back to {categoryTitle}</span>
                  </BackButton>
                  <WishListIcon productId={product.id as string} />
                </div>

                <div className="flex items-center gap-2">
                  <RatingStars rating={rating} />
                  <Button variant="ghost" className="text-gray-600 gap-2">
                    <Edit2 className="h-4 w-4" />
                    Write a Review
                  </Button>
                </div>

                <h2 className="text-4xl font-bold text-zinc-900">
                  {productName}
                </h2>

                <Collapsible
                  open={isDescriptionOpen}
                  onOpenChange={setIsDescriptionOpen}
                  className="text-gray-600 mb-5"
                >
                  <CollapsibleContent className="space-y-2">
                    {description}
                  </CollapsibleContent>
                  {shouldTruncate && (
                    <>
                      {!isDescriptionOpen && (
                        <p>{description.slice(0, 50)}...</p>
                      )}
                      <CollapsibleTrigger asChild>
                        <Button variant="link" className="p-0">
                          {isDescriptionOpen ? 'Read Less' : 'Read More'}
                        </Button>
                      </CollapsibleTrigger>
                    </>
                  )}
                </Collapsible>

                <div className="mb-5" role="status">
                  <ins className="text-2xl font-semibold text-gray-900">
                    &#8377;{sellingPrice.toFixed(2)}
                  </ins>
                  {originalPrice > sellingPrice && (
                    <del className="text-xl ml-2">
                      &#8377;{originalPrice.toFixed(2)}
                    </del>
                  )}
                </div>

                <div className="space-y-4">
                  <Button variant="link" className="text-gray-600 gap-2 p-0">
                    <Scissors className="h-4 w-4" />
                    See Sizing Guide
                  </Button>

                  <div className="flex items-center gap-4 mb-10">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-10 w-10"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                        className="h-10 w-10"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-start pt-6 pr-20">
                    <Button className="w-full flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 rounded-3xl border border-gray-300 shadow-sm transition-all">
                      <span>Add To Cart</span>
                      <ShoppingCart className="h-5 w-5" />
                    </Button>

                    {stock > 0 ? (
                      <Link
                        href={`/shop/checkouts/${product.id}?quantity=${quantity}`}
                        className="w-full"
                      >
                        <Button className="w-full flex items-center gap-2 bg-black text-white hover:bg-gray-900 rounded-3xl border border-gray-800 shadow-md transition-all">
                          <span>Buy it now</span>
                          <Zap className="h-5 w-5" />
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        disabled
                        variant="destructive"
                        className="w-full flex items-center gap-2 bg-gray-300 text-gray-600 rounded-3xl border border-gray-400 cursor-not-allowed"
                      >
                        <span>Out of Stock</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
