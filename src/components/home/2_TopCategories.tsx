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
    <Card className="w-64 h-96 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-0 rounded-2xl ">
      <div className="relative h-full">
        <Image
          src={imageSrc}
          fill
          alt={category}
          className="z-0"
          sizes="(min-width: 1060px) 224px, calc(23.38vw - 19px)"
        />
        <div className={cn('absolute left-0 right-0 p-4 z-10', contentClass)}>
          <CardContent className="p-0 text-white">
            <p className="text-xs uppercase my-2">CATEGORIES</p>
            <h3 className="text-2xl font-semibold my-2">{category}</h3>
          </CardContent>
          <CardFooter className="p-0 pt-2">
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

const TopCategories: React.FC = () => {
  const products = [
    {
      imageSrc: '/cat2.webp',
      category: 'Ring',

      contentPosition: 'top',
      linkHref: '#',
    },
    {
      imageSrc: '/cat3.png',
      category: 'Bracelet',
      contentPosition: 'bottom',
      linkHref: '#',
    },
    {
      imageSrc: '/cat4.png',
      category: 'Necklace',
      contentPosition: 'top',
      linkHref: '#',
    },
    {
      imageSrc: '/cat1.avif',
      category: 'Earrings',
      contentPosition: 'bottom',
      linkHref: '#',
    },
  ];

  return (
    <section>
      <div className="max-w-6xl mx-auto flex gap-8 flex-row items-center justify-center mt-10">
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
    </section>
  );
};

export default TopCategories;
