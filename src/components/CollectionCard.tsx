import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';

interface CollectionCardProps {
  imgSrc: string;
  title: string;
  href: string;
  quantity: number;
}

const CollectionCard: FC<CollectionCardProps> = ({
  imgSrc,
  title,
  href,
  quantity,
}) => {
  return (
    <Link href={href}>
      <Card className="h-full rounded-xl overflow-hidden border border-gray-500 group">
        <CardContent className="p-0 overflow-hidden">
          <div className="overflow-hidden">
            <Image
              src={imgSrc}
              alt={title}
              width={400}
              height={300}
              className="w-full h-64 object-cover transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:blur-sm"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col pb-3 pt-4">
          <CardTitle className="">{title}</CardTitle>
          <CardDescription className="mt-2">{quantity} items</CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
};

interface CollectionGridProps {
  collections: CollectionCardProps[];
}

const CollectionGrid: FC<CollectionGridProps> = ({ collections }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {collections.map((collection, index) => (
        <CollectionCard key={index} {...collection} />
      ))}
    </div>
  );
};

export { CollectionCard, CollectionGrid };
