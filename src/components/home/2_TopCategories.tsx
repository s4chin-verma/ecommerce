import { FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import CategoryLink from './ui/CategoryLink';
import { cn } from '@/lib/utils';

interface TemplateProps {
  imageSrc: string;
  category: string;
  linkHref: string;
  contentPosition?: string;
}

const TopCategories: React.FC = () => {
  const products = [
    {
      imageSrc: '/cat3.png',
      category: 'Bracelet',
      contentPosition: 'bottom',
      linkHref: '/collections/bracelet',
    },
    {
      imageSrc: '/cat2.webp',
      category: 'Ring',
      contentPosition: 'top',
      linkHref: '/collections/ring',
    },
    {
      imageSrc: '/cat1.avif',
      category: 'Earrings',
      contentPosition: 'bottom',
      linkHref: '/collections/earrings',
    },
    {
      imageSrc: '/cat4.png',
      category: 'Necklace',
      contentPosition: 'top',
      linkHref: '/collections/necklace',
    },
  ];

  const Template: FC<TemplateProps> = ({
    imageSrc,
    category,
    linkHref,
    contentPosition = 'bottom',
  }) => {
    const contentClass =
      contentPosition === 'top'
        ? 'top-0 bg-gradient-to-b from-black to-transparent'
        : 'bottom-0 bg-gradient-to-t from-black to-transparent';

    return (
      <Card className="w-full h-72 md:h-96 overflow-hidden border-0 rounded-2xl">
        <div className="relative h-full">
          <Image
            src={imageSrc}
            fill
            alt={category}
            className="z-0 object-cover"
            sizes="(min-width: 1060px) 224px, (min-width: 640px) calc(50vw - 32px), calc(100vw - 32px)"
          />
          <div className="absolute inset-0 bg-[#00000073]"></div>
          <div className={cn('absolute left-0 right-0 p-4 z-10', contentClass)}>
            <CardContent className="p-0 text-white">
              <p className="text-xs uppercase my-2">CATEGORIES</p>
              <h3 className="text-xl sm:text-2xl font-semibold my-2">
                {category}
              </h3>
            </CardContent>
            <CardFooter className="p-0 sm:pt-2">
              <CategoryLink
                href={linkHref}
                className="bg-opacity-80 hover:bg-opacity-100"
              />
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <section>
      <div className="px-3 py-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Template
              key={index}
              imageSrc={product.imageSrc}
              category={product.category}
              contentPosition={product.contentPosition}
              linkHref={product.linkHref}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
