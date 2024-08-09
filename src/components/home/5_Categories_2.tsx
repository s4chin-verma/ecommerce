import { CommonHeading, CategoryLink } from './ui';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardContent,
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
    <Card className="relative overflow-hidden h-52 w-56 rounded-2xl flex flex-col">
      <Image
        src={imageUrl}
        alt=""
        fill
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="flex-grow"></div>{' '}
      {/* This will push the footer to the bottom */}
      <CardFooter className="relative z-10 p-4 flex-col">
        <CardDescription className="uppercase text-white">
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
  console.log('Categories');
  return (
    <section className="max-w-5xl mx-auto py-10">
      <CommonHeading>Gems from Earth's Treasure Chest</CommonHeading>
      <div className="px-6 mt-10 flex flex-row items-center justify-between w-full">
        {Categories.map((category, index) => (
          <Template key={index} imageUrl={`/cb4.png`}>
            {category}
          </Template>
        ))}
      </div>
    </section>
  );
};

export default Categories_2;
