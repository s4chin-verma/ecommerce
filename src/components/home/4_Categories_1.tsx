'use client';

import { CategoryLink } from './ui/CategoryLink';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Autoplay from 'embla-carousel-autoplay';

const Categories_1 = () => {
  return (
    <section className="max-w-5xl mx-auto py-10">
      <div className="flex justify-between">
        <h1 className="text-gray-900 font-bold text-4xl">
          Gems from Earth's Treasure Chest
        </h1>
        <CategoryLink href="" />
      </div>
      <div className="px-14 mt-10">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            slidesToScroll: 1,
          }}
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full"
        >
          <CarouselContent className="-ml-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/4 "
              >
                <Card className="rounded-2xl">
                  <CardHeader>
                    <p className="text-center text-xs">Generic</p>
                    <h5>cuff Bracelet</h5>
                  </CardHeader>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <Image
                      src="/banner1.webp"
                      width={150}
                      height={150}
                      alt=""
                    />
                  </CardContent>
                  <CardFooter>
                    <p className="text-gray-600">Product Name</p>
                    <p className="text-gray-400">Rs. 999.99</p>
                    <Button className="mt-4">Add to Cart</Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Categories_1;
