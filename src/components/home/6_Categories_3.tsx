import { dummyProducts } from '@/data/data';
import { Card, CardDescription, CardTitle } from '../ui/card';
import {
  CategoryLink,
  CommonHeading,
  ProductCard,
  ProductCarouselWrapper,
} from './ui';
import Image from 'next/image';

const Categories_3: React.FC = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto py-10">
        <CommonHeading>A perfect design for perfect women</CommonHeading>
        <div className="mt-10 flex flex-col gap-10 px-3">
          <div className="flex flex-row justify-between gap-6">
            <Card className="w-1/2 relative rounded-3xl bg-transparent overflow-hidden p-6 flex flex-col justify-between border-0">
              <Image
                src={'/two-col1.png'}
                className="absolute inset-0 w-full h-full object-cover "
                alt=""
                loading="lazy"
                fill
              />
              <h5 className="text-white uppercase text-xs z-10">CATEGORIES</h5>
              <div className="w-2/3 flex flex-col z-10">
                <CardTitle className="text-3xl text-white text-border">
                  Timeless Gems for Every Occasion
                </CardTitle>
                <CardDescription className="text-white mt-2">
                  The mesmerizing world of Radiant Treasures, where gemstone
                  delights await. Our collection showcases an array of exquisite
                  gemstones.
                </CardDescription>
                <CategoryLink href="" className="mt-4" />
              </div>
            </Card>
            <div className=" w-1/2">
              <ProductCarouselWrapper slidesToShow={2} autoplayDelay={4000}>
                {dummyProducts.slice(2, 5).map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </ProductCarouselWrapper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories_3;
