'use client';

import {
  Hero,
  BrandCarousal,
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
import { Footer } from '@/components/Layouts/Footer';
import { NavBar } from '@/components/Layouts/NavBar';

const Home = () => {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <TopCategories />
        <BrandCarousal />
        {/* <Categories_1 /> */}
        <Categories_2 />
        {/* <Categories_3 /> */}
        {/* <Categories_4 /> */}
        {/* <Categories_5 /> */}
        {/* <Categories_6 /> */}
        {/* <Categories_7 /> */}
        {/* <Categories_8 /> */}
      </main>
      <Footer />
    </>
  );
};

export default Home;
