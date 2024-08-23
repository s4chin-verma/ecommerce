import { NextPage } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    collectionId: string;
  };
}

const CollectionPage: NextPage<Props> = ({ params }) => {
  const { collectionId } = params;

  if (!collectionId) {
    notFound(); // This will show the 404 page
  }

  // Capitalize the first letter of the collection name
  const formattedCollectionName =
    collectionId.charAt(0).toUpperCase() + collectionId.slice(1);

  // This is where you'd fetch the products for this collection
  const products = [
    { id: '1', name: 'Product 1' },
    { id: '2', name: 'Product 2' },
    { id: '3', name: 'Product 3' },
  ];

  return (
    <main className="mt-36">
      <h1>{formattedCollectionName} Collection</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={`/collections/${collectionId}/${product.id}`}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default CollectionPage;
