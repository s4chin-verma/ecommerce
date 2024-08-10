import {
  ProductCarouselWrapper,
  ProductGrid,
  CommonHeading,
  ProductCard,
} from './ui';
import { dummyProducts } from '@/data/data';

const Categories_1 = () => {
  return (
    <section className="max-w-5xl mx-auto py-10">
      <CommonHeading>Exquisite Gems Collection</CommonHeading>
      <div className="px-2 mt-10">
        <ProductCarouselWrapper autoplayDelay={2000} slidesToShow={4}>
          {dummyProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </ProductCarouselWrapper>
      </div>
    </section>
  );
};

export default Categories_1;
