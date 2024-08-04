import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const CommonProductCard = () => {
  return (
    <Card>
      <CardContent className="flex aspect-square items-center justify-center p-6">
        <Image src="/product1.jpg" width={150} height={150} alt="" />
      </CardContent>
      <CardFooter>
        <p className="text-gray-600">Product Name</p>
        <p className="text-gray-400">Rs. 999.99</p>
        <Button className="mt-4">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};
