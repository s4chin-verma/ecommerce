import { NextPage } from 'next';
import { CollectionGrid } from '@/components/CollectionCard';

const collections = [
  {
    imgSrc: '/collections/collection_1.png',
    title: 'Bracelet',
    href: '/collections/bracelet',
    quantity: 10,
  },
  {
    imgSrc: '/collections/collection_2.png',
    title: 'Earings',
    href: '/collections/earings',
    quantity: 10,
  },
  {
    imgSrc: '/collections/collection_3.png',
    title: 'Neckless',
    href: '/collections/neckless',
    quantity: 10,
  },
  {
    imgSrc: '/collections/collection_4.png',
    title: 'Rings',
    href: '/collections/rings',
    quantity: 10,
  },
];

const Page: NextPage = () => {
  return (
    <main className="pt-36 pb-20">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 mt-2">
          Collections
        </h1>
        <div className="container mx-auto px-3">
          <CollectionGrid collections={collections} />
        </div>
      </section>
    </main>
  );
};

export default Page;
