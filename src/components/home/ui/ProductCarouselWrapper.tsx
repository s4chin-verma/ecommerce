// 'use client';

// import React, { useRef, useEffect } from 'react';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';
// import Autoplay from 'embla-carousel-autoplay';
// import { cn } from '@/lib/utils';

// interface ProductCarouselWrapperProps {
//   children: React.ReactNode;
//   autoplayDelay?: number;
//   slidesToShow?: number;
// }

// const ProductCarouselWrapper: React.FC<ProductCarouselWrapperProps> = ({
//   children,
//   autoplayDelay = 2000,
//   slidesToShow = 4,
// }) => {
//   const autoplayRef = useRef(Autoplay({ delay: autoplayDelay }));
//   const carouselRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const carouselNode = carouselRef.current;

//     const handleMouseEnter = () => {
//       autoplayRef.current.stop();
//     };

//     const handleMouseLeave = () => {
//       autoplayRef.current.play();
//     };

//     if (carouselNode) {
//       carouselNode.addEventListener('mouseenter', handleMouseEnter);
//       carouselNode.addEventListener('mouseleave', handleMouseLeave);
//     }

//     return () => {
//       if (carouselNode) {
//         carouselNode.removeEventListener('mouseenter', handleMouseEnter);
//         carouselNode.removeEventListener('mouseleave', handleMouseLeave);
//       }
//     };
//   }, []);
//   if (slidesToShow == 1) {
//     cla;
//   }
//   return (
//     <Carousel
//       opts={{
//         align: 'start',
//         loop: true,
//         slidesToScroll: 1,
//       }}
//       plugins={[autoplayRef.current]}
//       className="w-full"
//       ref={carouselRef}
//     >
//       <CarouselContent className="-ml-1">
//         {React.Children.map(children, (child, index) => (
//           <CarouselItem
//             key={index}
//             className={cn(`pl-1 md:basis-1/1 slides`, slidesToShow)}
//           >
//             {child}
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   );
// };

// export default ProductCarouselWrapper;

'use client';

import React, { useRef, useEffect, useState } from 'react';
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

const getCarouselItemClasses = (slidesToShow: number) => {
  switch (slidesToShow) {
    case 1:
      return 'md:basis-1/2 lg:basis-1/3';
    case 2:
      return 'md:basis-1/1 lg:basis-1/2';
    case 3:
      return 'w-1/3';
    case 4:
      return 'md:basis-1/2 lg:basis-1/4';
    default:
      return 'w-1/4';
  }
};

const ProductCarouselWrapper: React.FC<ProductCarouselWrapperProps> = ({
  children,
  autoplayDelay = 2000,
  slidesToShow = 4,
}) => {
  const autoplayRef = useRef(Autoplay({ delay: autoplayDelay }));
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [buttonShow, setButtonShow] = useState<boolean>(false);
  useEffect(() => {
    const carouselNode = carouselRef.current;

    const handleMouseEnter = () => {
      autoplayRef.current.stop();
      setButtonShow(true);
    };

    const handleMouseLeave = () => {
      autoplayRef.current.play();
      setButtonShow(false);
    };

    if (carouselNode) {
      carouselNode.addEventListener('mouseenter', handleMouseEnter);
      carouselNode.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (carouselNode) {
        carouselNode.removeEventListener('mouseenter', handleMouseEnter);
        carouselNode.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const carouselItemClasses = getCarouselItemClasses(slidesToShow);

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
        slidesToScroll: 1,
      }}
      plugins={[autoplayRef.current]}
      className="w-full"
      ref={carouselRef}
    >
      <CarouselContent className="-ml-1">
        {React.Children.map(children, (child, index) => (
          <CarouselItem key={index} className={cn('pl-1', carouselItemClasses)}>
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      {buttonShow && (
        <React.Fragment>
          <CarouselPrevious className="-left-7" />
          <CarouselNext className="-right-7" />
        </React.Fragment>
      )}
    </Carousel>
  );
};

export default ProductCarouselWrapper;
