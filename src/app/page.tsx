import { NextPage } from 'next';
import {
  BrandCarousal,
  Hero,
  TopCategories,
  Categories_1,
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
      </main>
    </>
  );
};

export default Home;
