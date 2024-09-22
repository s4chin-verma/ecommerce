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
  Categories_6,
  Categories_7,
  Categories_8,
} from '@/components/home';
import prisma from '@/lib/prisma';

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
        <Categories_6 />
        <Categories_7 />
        <Categories_8 />
      </main>
    </>
  );
};

export default Home;
