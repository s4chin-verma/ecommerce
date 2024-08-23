import { NextPage } from 'next';

interface Props {
  params: {
    collectionId: string;
    productId: string;
  };
}

const ProductPage: NextPage<Props> = ({ params }) => {
  const { collectionId, productId } = params;

  return (
    <div>
      <h1>
        Product {productId} in {collectionId} Collection
      </h1>
      {/* Add your product details here */}
    </div>
  );
};

export default ProductPage;
