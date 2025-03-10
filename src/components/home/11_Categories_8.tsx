import {
  GetLimitedProductDocument,
  GetLimitedProductQuery,
  GetLimitedProductQueryVariables,
} from '@/graphql/generated';
import { toast } from 'sonner';
import { useQuery } from 'urql';
import { useEffect } from 'react';
import { ProductCardProps } from '@/lib/interface';
import { ProductCarouselWrapper, CommonHeading } from '@/components/home/ui';
import { ProductCard, ProductCardSkelton } from '@/components/shop/ProductCard';

const Categories_8 = () => {
  const [{ data, fetching, error }] = useQuery<
    GetLimitedProductQuery,
    GetLimitedProductQueryVariables
  >({
    query: GetLimitedProductDocument,
    variables: { limit: 10 },
  });

  const products = data?.getLimitedProduct;
  useEffect(() => {
    if (error) {
      const errorMessage = error.message.replace('[GraphQL] ', '');
      toast(errorMessage);
    }
  }, [error]);
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto py-10">
        <CommonHeading className="text-orange-100">
          Trending jewellery For Everyone
        </CommonHeading>
        <div className="mt-10">
          {fetching ? (
            <ProductCarouselWrapper autoplayDelay={2000} slidesToShow={4}>
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkelton key={i} />
              ))}
            </ProductCarouselWrapper>
          ) : (
            <ProductCarouselWrapper autoplayDelay={2000} slidesToShow={4}>
              {products?.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product as ProductCardProps}
                />
              ))}
            </ProductCarouselWrapper>
          )}
        </div>
      </div>
      <div className="absolute top-0 right-0 left-0 bg-gray-800 h-72 -z-10"></div>
    </section>
  );
};

export default Categories_8;
