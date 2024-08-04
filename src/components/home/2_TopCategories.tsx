import ProductCard from './ui/ProductCard';

const TopCategories: React.FC = () => {
  const products = [
    {
      imageSrc: '/cat2.webp',
      category: 'Ring',
      contentPosition: 'top',
      linkHref: '#',
    },
    {
      imageSrc: '/cat3.png',
      category: 'Bracelet',
      contentPosition: 'bottom',
      linkHref: '#',
    },
    {
      imageSrc: '/cat4.png',
      category: 'Necklace',
      contentPosition: 'top',
      linkHref: '#',
    },
    {
      imageSrc: '/cat1.avif',
      category: 'Earrings',
      contentPosition: 'bottom',
      linkHref: '#',
    },
  ];

  return (
    <section className="max-w-5xl mx-auto flex gap-8 flex-row items-center justify-center mt-10">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          imageSrc={product.imageSrc}
          category={product.category}
          contentPosition={product.contentPosition}
          linkHref={product.linkHref}
        />
      ))}
    </section>
  );
};

export default TopCategories;
