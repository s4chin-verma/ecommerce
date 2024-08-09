import { NextPage } from 'next';
import {
  BrandCarousal,
  Hero,
  TopCategories,
  Categories_1,
  Categories_2,
  Categories_3,
  Categories_4,
  Categories_5,
} from '@/components/home';
import prisma from '@/lib/db';

const Home: NextPage = async () => {
  return (
    <>
      <main>
        <Hero />
        <TopCategories />
        <BrandCarousal />
        <Categories_1 />
        <Categories_2 />
        <Categories_3 />
        <Categories_4 />
        <Categories_5 />
      </main>
    </>
  );
};

export default Home;
