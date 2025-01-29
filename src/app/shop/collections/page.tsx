import { NextPage } from 'next';
import { CollectionGrid } from '@/components/CollectionCard';
import prisma from '@/lib/prisma';
import { Category } from '@prisma/client';

export type CategoryWithQuantity = Category & { quantity: number };

const Page: NextPage = async () => {
  const getCategories = async (): Promise<CategoryWithQuantity[]> => {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        title: true,
        image: true,
        description: true,
      },
    });

    const categoriesWithCount = await Promise.all(
      categories.map(async category => ({
        ...category,
        quantity: await prisma.product.count({
          where: { categoryId: category.id },
        }),
      }))
    );

    return categoriesWithCount;
  };

  const collections = await getCategories();

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

// Bracelet
// https://petuwmjatwjtvxvcngsm.supabase.co/storage/v1/object/public/luxe/categories/collection_1.png
// Earrings
// https://petuwmjatwjtvxvcngsm.supabase.co/storage/v1/object/public/luxe/categories/collection_2.png
// Necklace
// https://petuwmjatwjtvxvcngsm.supabase.co/storage/v1/object/public/luxe/categories/collection_3.png
// Ring
// https://petuwmjatwjtvxvcngsm.supabase.co/storage/v1/object/public/luxe/categories/collection_4.png
