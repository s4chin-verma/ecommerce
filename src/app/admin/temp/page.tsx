'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Star,
  Calendar,
  Package,
  ShoppingCart,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const initialProduct = {
  id: '1',
  name: 'Diamond Solitaire Ring',
  images: [
    '/cat_2/cat_1.png',
    '/cat_2/cat_1.png',
    '/cat_2/cat_1.png',
    '/cat_2/cat_1.png',
  ],
  description:
    'A stunning diamond solitaire ring, perfect for that special moment. This exquisite piece features a brilliant-cut diamond set in 18k white gold, symbolizing eternal love and commitment.',
  price: 1999.99,
  sellingPrice: 1799.99,
  stock: 10,
  totalSale: 50,
  ratings: 4.8,
  category: { id: '1', name: 'Rings' },
  createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
  updatedAt: Date.now(),
  material: '18k White Gold',
  weight: '4.2 grams',
  dimensions: '6mm x 6mm x 2.5mm',
};

const FormattedDate = ({
  dateString,
  children,
}: {
  dateString: number;
  children: string;
}) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="flex items-center space-x-2">
      <Calendar className="w-5 h-5 text-muted-foreground" />
      <div>
        <span className="font-semibold text-sm">{children}</span>
        <p className="text-sm text-muted-foreground">{formattedDate}</p>
      </div>
    </div>
  );
};

export default function ProductPage() {
  const [product] = useState(initialProduct);

  return (
    <div className="container mx-auto px-4 py-8 max-w-[90%]">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-lg font-semibold">
                {product.ratings}
              </span>
            </div>
            <Badge variant="secondary">{product.category.name}</Badge>
            <span className="text-muted-foreground">SKU: {product.id}</span>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">
              ${product.sellingPrice.toFixed(2)}
            </div>
            {product.sellingPrice < product.price && (
              <div className="text-lg text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </div>
            )}
          </div>
          <p className="text-lg">{product.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Material</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{product.material}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Weight</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{product.weight}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Dimensions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{product.dimensions}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{product.stock} available</p>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-muted-foreground" />
              <span>Free shipping on orders over $500</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              <span>{product.totalSale} sold</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              <span>Trending product</span>
            </div>
          </div>
          <div className="space-y-2">
            <FormattedDate dateString={product.createdAt}>
              Added to Catalog
            </FormattedDate>
            <FormattedDate dateString={product.updatedAt}>
              Last Updated
            </FormattedDate>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {product.images.map((image, index) => (
            <div
              key={index}
              className="aspect-square relative rounded-lg overflow-hidden"
            >
              <Image
                src={image}
                alt={`${product.name} - Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
