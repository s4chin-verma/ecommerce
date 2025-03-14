import { dummyProducts } from '@/data/data';
import { Card, CardDescription, CardTitle } from '../ui/card';
import { CategoryLink, CommonHeading, ProductCarouselWrapper } from './ui';
import Image from 'next/image';
import { ProductCardProps } from '@/lib/interface';
import { ProductCard, ProductCardSkelton } from '@/components/shop/ProductCard';

const Categories_3: React.FC = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto py-10">
        <CommonHeading>A perfect design for perfect women</CommonHeading>
        <div className="flex flex-col sm:flex-row justify-between px-3">
          <Card className="w-full sm:w-1/2 relative rounded-3xl bg-transparent overflow-hidden p-6 flex flex-col justify-between border-0">
            <Image
              src={'/two-col1.png'}
              className="absolute inset-0 w-full h-full object-cover"
              alt=""
              loading="lazy"
              width={400}
              height={300}
            />
            <div className="absolute inset-0 bg-[#00000073]"></div>
            <h5 className="text-white uppercase text-xs z-10">CATEGORIES</h5>
            <div className="w-full sm:w-2/3 flex flex-col z-10 mt-28">
              <CardTitle className="text-xl md:text-3xl text-white text-border">
                Timeless Gems for Every Occasion
              </CardTitle>
              <CardDescription className="text-sm text-white mt-2">
                The mesmerizing world of Radiant Treasures, where gemstone
                delights await. Our collection showcases an array of exquisite
                gemstones.
              </CardDescription>
              <CategoryLink href="/shop/categories" className="mt-4" />
            </div>
          </Card>
          <div className="w-full sm:w-1/2 mt-5 sm:mt-0">
            <ProductCarouselWrapper slidesToShow={2} autoplayDelay={4000}>
              {dummyProducts.slice(2, 5).map((product, index) => (
                <ProductCard
                  key={index}
                  product={product as ProductCardProps}
                  className="mx-0 sm:mx-3"
                />
              ))}
            </ProductCarouselWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories_3;
