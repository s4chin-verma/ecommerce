import { dummyProducts } from '@/data/data';
import { Card, CardDescription, CardTitle } from '../ui/card';
import { CommonHeading, ProductCard, ProductCarouselWrapper } from './ui';

const Categories_3: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto py-10">
      <CommonHeading>A perfect design for perfect women</CommonHeading>
      <div className="mt-10">
        <div className="flex flex-row justify-between gap-10">
          <Card className="w-1/2">
            <CardTitle>Timeless Gems for Every Occasion</CardTitle>
            <CardDescription>
              the mesmerizing world of Radiant Treasures, where gemstone
              delights await. Our collection showcases an array of exquisite
              gemstones.
            </CardDescription>
          </Card>
          <div className="flex flex-row items-center w-1/2">
            <ProductCarouselWrapper slidesToShow={2} autoplayDelay={4000}>
              {dummyProducts.slice(2, 5).map((product, index) => (
                <ProductCard key={index} {...product} />
              ))}
            </ProductCarouselWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories_3;
