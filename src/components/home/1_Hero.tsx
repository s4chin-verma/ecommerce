'use client';

import { Button } from '@/components/ui/button';
import { NextPage } from 'next';
import { Icon } from '@iconify/react';
import { CategoryLink } from './ui';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

const Hero: NextPage = () => {
  const images = ['/banner1.webp', '/banner2.webp'];

  return (
    <>
      <section className="relative pt-56">
        <Carousel
          className="absolute inset-0 -z-10"
          plugins={[Autoplay({ delay: 2000 })]}
        >
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem
                key={index}
                className="relative min-h-[800px] w-full"
              >
                <Image
                  src={src}
                  alt={`banner ${index + 1}`}
                  fill
                  quality={100}
                  priority
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-[60%]">
              <h1 className="text-white font-bold text-6xl mb-4">
                Sparking Brilliance Gemstone
              </h1>
              <p className="text-white mb-4 text-sm">
                Step into a world of dazzling beauty with our collection of
                Sparkling Gemstones. Each gemstone is carefully selected for its
                exceptional quality.
              </p>
              <div className="flex space-x-4 mb-4 my-8">
                <CategoryLink href="#" />
                <Button className="bg-white text-black rounded-2xl">
                  Get BestSellers Now
                </Button>
              </div>
              <div className="flex flex-row items-center gap-8 mt-8">
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
        </div>
      </section>
    </>
  );
};

export default Hero;
