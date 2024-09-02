'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { NextPage } from 'next';
import { Icon } from '@iconify/react';
import { CategoryLink } from './ui';
import { LogOut } from 'lucide-react';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';
import { cn } from '@/lib/utils';
import clsx from 'clsx';
import Image from 'next/image';

const Hero: NextPage = () => {
  const windowWidth = useWindowWidth();
  const images = ['/banner1.webp', '/banner2.webp'];
  const headings = [
    'Sparking Brilliance Gemstone',
    'Trending Jewellery For Womens',
  ];

  const [currentHeading, setCurrentHeading] = useState(headings[0]);
  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % headings.length;
      setCurrentHeading(headings[index]);
      setCurrentImage(images[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, [headings, images]);

  return (
    <section className="relative pt-28 pb-20 md:pt-56">
      {windowWidth !== undefined && windowWidth >= 768 ? (
        <div className="absolute inset-0 -z-10 min-h-[850px]">
          <Image src={currentImage} alt="banner" fill quality={100} priority />
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 bg-theme -mb-36"></div>
      )}

      <div className="max-w-6xl mx-auto px-3 relative">
        <div className="absolute left-9 -bottom-16 rotate-90 md:rotate-0 md:-left-7 md:top-40">
          <div
            className={cn(
              'ring-1 ring-white h-4 w-4 rounded-full mt-3',
              clsx({
                'bg-white': currentHeading === headings[0],
                'bg-transparent': currentHeading === headings[1],
              })
            )}
          ></div>
          <div
            className={cn(
              'ring-1 ring-white h-4 w-4 rounded-full mt-3',
              clsx({
                'bg-transparent': currentHeading === headings[0],
                'bg-white': currentHeading === headings[1],
              })
            )}
          ></div>
        </div>
        <div className="w-full md:max-w-[70%]">
          <h1 className="text-white font-bold text-4xl md:text-7xl mb-4 transition-opacity duration-300">
            {currentHeading}
          </h1>
          <p className="text-white mb-4 text-sm md:text-lg">
            Step into a world of dazzling beauty with our collection of
            Sparkling Gemstones. Each gemstone is carefully selected for its
            exceptional quality.
          </p>
          <div className="flex flex-col md:flex-row my-8 gap-4">
            <CategoryLink href="/collections">Go To Collections</CategoryLink>
            <Button className="bg-white text-black rounded-full max-w-52 gap-2">
              <span>Get BestSellers Now</span>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="text-black text-xs flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
                <Icon
                  icon="solar:cart-check-bold-duotone"
                  className="h-5 w-5 text-white text-center"
                />
              </div>
              <div>
                <p className="font-bold">14 Days</p>
                <p>Return Guarantee</p>
              </div>
            </div>
            <div className="text-black text-xs flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-black flex items-center justify-center">
                <Icon
                  icon="icon-park-outline:go-end"
                  className="h-5 w-5 text-white text-center"
                />
              </div>
              <div>
                <p className="font-bold">Get 35%</p>
                <p>On first Order</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
