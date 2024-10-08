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
import { Product } from '@prisma/client';

interface ProductCardProps extends Product {
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  images,
  description,
  price,
  sellingPrice,
  stock,
  totalSale,
  ratings,
  categoryId,
  className,
  ...rest
}) => {
  const renderStars = (rating: number | null) => {
    return rating ? '⭐'.repeat(Math.round(rating)) : '';
  };

  const calculateDiscount = (original: number, current: number) => {
    const discount = ((original - current) / original) * 100;
    return Math.round(discount);
  };

  const discountPercentage = sellingPrice
    ? calculateDiscount(price, sellingPrice)
    : 0;

  return (
    <Card
      className={cn('rounded-2xl border-x border-gray-400 mx-3', className)}
    >
      <CardHeader>
        <h5 className="text-center">{name}</h5>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        {images.length > 0 && (
          <Image
            src={images[0]}
            className="h-32"
            width={150}
            height={100}
            alt={name}
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-col p-1 px-3 pb-4">
        <p>{renderStars(ratings)}</p>
        <p className="text-gray-600 text-center w-full">{description}</p>
        <p className="text-gray-700 text-center w-full text-base">
          Rs. {sellingPrice ? sellingPrice.toFixed(2) : price.toFixed(2)}
        </p>
        {sellingPrice && (
          <>
            <p className="text-gray-400 text-center w-full line-through text-sm">
              Rs. {price.toFixed(2)}
            </p>
            <p className="text-green-600 text-center w-full text-sm">
              {discountPercentage}% off
            </p>
          </>
        )}
        <AddToCartButton className="mt-2" />
      </CardFooter>
    </Card>
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
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

ProductCard.displayName = 'ProductCard';
ProductGrid.displayName = 'ProductGrid';

export { ProductCard, ProductGrid };
