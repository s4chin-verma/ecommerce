import { CategoryLink } from './ui';

const Categories_4: React.FC = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] bg-[url('/banner2.webp')] bg-cover bg-center bg-gray-700 bg-blend-overlay pt-40 md:pt-56 -mt-40 -z-10">
      <div className="max-w-6xl mx-auto px-3">
        <div className="relative z-10 h-full text-white text-center md:w-5/12">
          <h1 className="text-xl md:text-3xl font-bold mb-4 text-start">
            We Make Jewelry to...
          </h1>
          <p className="text-xs md:text-sm max-w-lg text-start">
            Our gems exude grace and sophistication. Whether you're attending a
            formal event or adding a touch of glamour to your everyday.
          </p>
          <CategoryLink href="" className="mt-5 text-sm text-black  " />
        </div>
      </div>
    </section>
  );
};

export default Categories_4;
