import { CommonHeading, CategoryLink } from './ui';
import Image from 'next/image';
import {
  Card,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

const Categories: string[] = ['Ring', 'Earring', 'Necklace', 'Bracelet'];

interface TemplateProps {
  children: string;
  imageUrl: string;
}

const Template: React.FC<TemplateProps> = ({ children, imageUrl }) => {
  return (
    <Card className="relative overflow-hidden h-64 w-64 rounded-3xl flex flex-col mx-3">
      <Image
        src={imageUrl}
        alt=""
        fill
        loading="lazy"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
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
        <CommonHeading>Exquisite Gems Collection</CommonHeading>
        <div className="mt-10 flex flex-row items-center justify-between w-full">
          {Categories.map((category, index) => (
            <Template key={index} imageUrl={`/cb4.png`}>
              {category}
            </Template>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories_2;
