import {
  GetProductByCategoryIdDocument,
  GetProductByCategoryIdQuery,
  GetProductByCategoryIdQueryVariables,
} from '@/graphql/generated';
import { toast } from 'sonner';
import { useQuery } from 'urql';
import { ProductCardProps } from '@/lib/interface';
import { useEffect } from 'react';
import { ProductCarouselWrapper, CommonHeading } from '@/components/home/ui';
import { ProductCard, ProductCardSkelton } from '@/components/shop/ProductCard';

const Categories_5: React.FC = () => {
  const [{ data, fetching, error }] = useQuery<
    GetProductByCategoryIdQuery,
    GetProductByCategoryIdQueryVariables
  >({
    query: GetProductByCategoryIdDocument,
    variables: { categoryId: '67020cc2-525a-49a8-bfeb-c4542e7ee984' },
  });

  const products = data?.getProductByCategory;
  useEffect(() => {
    if (error) {
      const errorMessage = error.message.replace('[GraphQL] ', '');
      toast(errorMessage);
    }
  }, [error]);

  return (
    <section>
      <div className="max-w-6xl mx-auto py-10">
        <CommonHeading categoryHref="">
          Bright Diamond for Bright Women
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
    </section>
  );
};

export default Categories_5;
