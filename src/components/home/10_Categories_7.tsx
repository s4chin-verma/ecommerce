import { dummyProducts } from '@/data/data';
import { Card, CardDescription, CardTitle } from '../ui/card';
import {
  CategoryLink,
  CommonHeading,
  ProductCard,
  ProductCarouselWrapper,
} from './ui';

const Categories_7: React.FC = () => {
  return (
    <section className="bg-gray-800">
      <div className="max-w-5xl mx-auto py-10">
        <div className="mt-10 flex flex-col gap-10 px-3">
          <div className="flex flex-row justify-between gap-6">
            <div className="w-1/2 text-orange-100 flex justify-center flex-col">
              <p className="text-xs ">CATEGORIES</p>
              <h1 className="text-3xl text-orange-100 font-bold my-4">
                Jewels That Enchant for Women
              </h1>
              <p className="mb-4 text-sm">
                Let our jewelry empower you to make a statement and radiate
                confidence wherever you go.
              </p>
              <CategoryLink href="" className="text-black text-sm" />
            </div>
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

export default Categories_7;
