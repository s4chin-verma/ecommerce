import { Product } from '@prisma/client';
import { ProductCarouselWrapper, CommonHeading, ProductCard } from './ui';
import { dummyProducts } from '@/data/data';

const Categories_8 = () => {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto py-10">
        <CommonHeading className="text-orange-100">
          Trending jewellery For Everyone
        </CommonHeading>
        <div className="mt-10">
          <ProductCarouselWrapper autoplayDelay={2000} slidesToShow={4}>
            {dummyProducts.map((product, index) => (
              <ProductCard key={index} product={product as Product} />
            ))}
          </ProductCarouselWrapper>
        </div>
      </div>
      <div className="absolute top-0 right-0 left-0 bg-gray-800 h-72 -z-10"></div>
    </section>
  );
};

export default Categories_8;
