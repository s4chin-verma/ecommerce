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

interface ProductCardProps {
  brand: string;
  name: string;
  imageSrc: string;
  rating: number;
  productName: string;
  price: number;
  originalPrice: number;
  color: string[];
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  brand,
  name,
  imageSrc,
  rating,
  productName,
  price,
  originalPrice = 10000,
  className,
}) => {
  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.round(rating));
  };

  const calculateDiscount = (original: number, current: number) => {
    const discount = ((original - current) / original) * 100;
    return Math.round(discount);
  };

  const discountPercentage = calculateDiscount(originalPrice, price);

  return (
    <Card
      className={cn('rounded-2xl border-x border-gray-400 mx-3', className)}
    >
      <CardHeader>
        <p className="text-center text-xs">{brand}</p>
        <h5 className="text-center">{name}</h5>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <Image
          src={imageSrc}
          className="h-32"
          width={150}
          height={100}
          alt={productName}
        />
      </CardContent>
      <CardFooter className="flex flex-col p-1 px-3 pb-4">
        <p>{renderStars(rating)}</p>
        <p className="text-gray-600 text-center w-full">{productName}</p>
        <p className="text-gray-700 text-center w-full text-base">
          Rs. {price.toFixed(2)}
        </p>

        <p className="text-gray-400 text-center w-full line-through text-sm">
          Rs. {originalPrice.toFixed(2)}
        </p>
        <p className="text-green-600 text-center w-full text-sm">
          {discountPercentage}% off
        </p>
        <AddToCartButton className="mt-2" />
      </CardFooter>
    </Card>
  );
};

interface ProductGridProps {
  products: ProductCardProps[];
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
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

ProductCard.displayName = 'ProductCard';
ProductGrid.displayName = 'ProductGrid';

export { ProductCard, ProductGrid };
