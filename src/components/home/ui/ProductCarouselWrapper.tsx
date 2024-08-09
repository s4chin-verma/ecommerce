'use client';

import React, { useRef, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

interface ProductCarouselWrapperProps {
  children: React.ReactNode;
  autoplayDelay?: number;
  slidesToShow?: number;
}

const ProductCarouselWrapper: React.FC<ProductCarouselWrapperProps> = ({
  children,
  autoplayDelay = 2000,
  slidesToShow = 4,
}) => {
  const autoplayRef = useRef(Autoplay({ delay: autoplayDelay }));
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const carouselNode = carouselRef.current;

    const handleMouseEnter = () => {
      autoplayRef.current.stop();
    };

    const handleMouseLeave = () => {
      autoplayRef.current.play();
    };

    if (carouselNode) {
      // Pause autoplay on mouse enter
      carouselNode.addEventListener('mouseenter', handleMouseEnter);

      // Resume autoplay on mouse leave
      carouselNode.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (carouselNode) {
        carouselNode.removeEventListener('mouseenter', handleMouseEnter);
        carouselNode.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        slidesToScroll: 1,
      }}
      plugins={[autoplayRef.current]}
      className="w-full"
      ref={carouselRef} // Attach the ref here
    >
      <CarouselContent className="-ml-1">
        {React.Children.map(children, (child, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/1 lg:basis-1/4">
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProductCarouselWrapper;
