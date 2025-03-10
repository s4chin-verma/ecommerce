'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const BrandCarousal: React.FC = () => {
  return (
    <section id="#top_categories">
      <div className="max-w-6xl mx-auto py-6 sm:py-15 md:py-20 px-14">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            slidesToScroll: 1,
          }}
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full"
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                <div className="p-1 w-full">
                  <h6 className="text-3xl font-semibold text-center">Luxe</h6>
                </div>
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

export default BrandCarousal;
