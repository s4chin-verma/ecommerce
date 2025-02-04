import { CommonHeading, CategoryLink } from './ui';
import Image from 'next/image';
import {
  Card,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

interface CategoriesType {
  tag: string;
  imageUrl: string;
}

const Categories: CategoriesType[] = [
  { tag: 'Ring', imageUrl: '/cat_2/cat_1.png' },
  { tag: 'Earring', imageUrl: '/cat_2/cat_2.png' },
  { tag: 'Necklace', imageUrl: '/cat_2/cat_3.png' },
  { tag: 'Bracelet', imageUrl: '/cat_2/cat_4.png' },
];

interface TemplateProps {
  children: string;
  imageUrl: string;
}

const Template: React.FC<TemplateProps> = ({ children, imageUrl }) => {
  return (
    <Card className="relative overflow-hidden h-72 rounded-3xl flex flex-col">
      <Image
        src={imageUrl}
        alt=""
        fill
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#00000073]"></div>
      <div className="flex-grow"></div>
      <CardFooter className="relative z-10 p-4 flex-col">
        <CardDescription className="uppercase text-white text-xs">
          Categories
        </CardDescription>
        <CardTitle className="capitalize text-white text-xl">
          {children}
        </CardTitle>
        <CategoryLink href="" className="text-xs mt-2" />
      </CardFooter>
    </Card>
  );
};

const Categories_2 = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto py-10">
        <CommonHeading categoryHref="/shop/collections">
          Exquisite Gems Collection
        </CommonHeading>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-3">
          {Categories.map((category, index) => (
            <Template key={index} imageUrl={category.imageUrl}>
              {category.tag}
            </Template>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories_2;
