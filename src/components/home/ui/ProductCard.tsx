import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import AddToCartButton from './AddToCartButton';
import { cn } from '@/lib/utils';
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

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ className, product }) => {
  const renderStars = (rating: number | null) => {
    return rating ? '⭐'.repeat(Math.round(rating)) : '';
  };

  const calculateDiscount = (original: number, current: number) => {
    const discount = ((original - current) / original) * 100;
    return Math.round(discount);
  };

  const discountPercentage = product.sellingPrice
    ? calculateDiscount(product.price, product.sellingPrice)
    : 0;

  return (
    <Link
      href={`/shop/collections/${product.category.title.toLocaleLowerCase()}/${
        product?.id
      }`}
    >
      <Card
        className={cn('rounded-2xl border-x border-gray-400 mx-3', className)}
      >
        <CardHeader>
          <h5 className="text-center">{product.category.title}</h5>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center pb-0">
          {product.images.length > 0 && (
            <div className="h-40 w-48 flex items-center justify-center overflow-hidden">
              <Image
                src={product.images[0]}
                className="w-full h-full object-contain"
                width={150}
                height={100}
                alt={product.name}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col p-1 px-3 pb-4">
          <p>{renderStars(product.ratings) || 'No Ratings'}</p>
          <p className="text-gray-600 font-semibold text-center w-full text-xl">
            {product.name.length > 15
              ? product.name.slice(0, 15).concat('...')
              : product.name}
          </p>
          <p className="text-gray-700 text-center w-full text-base">
            Rs.{' '}
            {product.sellingPrice
              ? product.sellingPrice.toFixed(2)
              : product.price.toFixed(2)}
          </p>
          {product.sellingPrice && (
            <>
              <p className="text-gray-400 text-center w-full line-through text-sm">
                Rs. {product.price.toFixed(2)}
              </p>
              <p className="text-green-600 text-center w-full text-sm">
                {discountPercentage}% off
              </p>
            </>
          )}
          <AddToCartButton className="mt-2" />
        </CardFooter>
      </Card>
    </Link>
  );
};

interface ProductGridProps {
  products: Product[];
  className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-5',
        className
      )}
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const ProductCardSkelton = () => (
  <Card className="mx-3 rounded-2xl">
    <Skeleton className="h-96 w-15 rounded-2xl" />
  </Card>
);

ProductCardSkelton.displayName = 'ProductCardSkelton';
ProductCard.displayName = 'ProductCard';
ProductGrid.displayName = 'ProductGrid';

export { ProductCard, ProductGrid, ProductCardSkelton };
