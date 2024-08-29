import { Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Categories_6 = () => {
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-3">
        <div className="bg-[url('/cms.webp')] bg-cover bg-center px-4 py-10 rounded-xl text-white h-80">
          <div className="md:w-2/5">
            <p className="uppercase text-sm"> Categories</p>
            <h2 className="text-2xl md:text-4xl font-bold my-2">
              Gemstones Jewels That Enchant
            </h2>
            <p className="text-sm md:text-base">
              the essence of natural beauty. Whether you're seeking a pop of
              color or a harmonious blend, our Gemstone.
            </p>
            <div className="relative">
              <Input
                placeholder="Enter Your Email"
                type="email"
                className="mt-4 text-black h-12 rounded-3xl text-sm border-0 focus:border-0"
              />
              <Button className="rounded-full absolute right-2 top-1 bg-orange-200 hover:bg-orange-400 h-10 w-10 p-0">
                <Send className="h-5 w-5 text-black" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute w-full h-28 bg-gray-800 bottom-0 left-0 right-0 -z-10"></div>
    </section>
  );
};

export default Categories_6;
