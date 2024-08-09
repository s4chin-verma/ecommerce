import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  brand: string;
  name: string;
  imageSrc: string;
  rating: number;
  productName: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  brand,
  name,
  imageSrc,
  rating,
  productName,
  price,
}) => {
  const renderStars = (rating: number) => {
    return '⭐'.repeat(Math.round(rating));
  };

  return (
    <Card className="rounded-2xl border-x border-gray-400 mx-1">
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
      <CardFooter className="flex flex-col p-1 pb-4 gap-1">
        <p>{renderStars(rating)}</p>
        <p className="text-gray-600 text-center w-full">{productName}</p>
        <p className="text-gray-400 text-center w-full">
          Rs. {price.toFixed(2)}
        </p>
        <AddToCartButton />
      </CardFooter>
    </Card>
  );
};

// Component to render multiple product cards
interface ProductGridProps {
  products: ProductCardProps[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export { ProductCard, ProductGrid };
