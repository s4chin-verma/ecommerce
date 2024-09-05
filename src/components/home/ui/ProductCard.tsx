import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import AddToCartButton from './AddToCartButton';
import { DropdownWithValue } from './DropDownWithValue';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  brand: string;
  name: string;
  imageSrc: string;
  rating: number;
  productName: string;
  price: number;
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
  color,
  className,
}) => {
  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.round(rating));
  };

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
      <CardFooter className="flex flex-col p-1 px-3 pb-4 gap-2">
        <p>{renderStars(rating)}</p>
        <DropdownWithValue items={color} />
        <p className="text-gray-600 text-center w-full">{productName}</p>
        <p className="text-gray-400 text-center w-full">
          Rs. {price.toFixed(2)}
        </p>
        <AddToCartButton />
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
