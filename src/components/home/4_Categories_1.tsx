import { ProductCarouselWrapper, CommonHeading, ProductCard } from './ui';
import { dummyProducts } from '@/data/data';

const Categories_1 = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto py-10">
        <CommonHeading>Exquisite Gems Collection</CommonHeading>
        <div className="px-3 mt-10">
          <ProductCarouselWrapper autoplayDelay={2000} slidesToShow={4}>
            {dummyProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </ProductCarouselWrapper>
        </div>
      </div>
    </section>
  );
};

export default Categories_1;
