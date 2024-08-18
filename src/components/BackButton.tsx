import Link from 'next/link';
import { ArrowLeftToLine } from 'lucide-react';

const BackButton: React.FC = () => {
  return (
    <div className="flex justify-start">
      <Link href="/" className="flex justify-start items-center gap-2 group">
        <div className="p-2 rounded-full ring-1 ring-black transition duration-200 ease-in-out group-hover:ring-orange-700 group-focus:ring-orange-700">
          <ArrowLeftToLine className="h-4 w-4 group-hover:text-orange-700" />
        </div>
        <span className="text-sm transition duration-200 ease-in-out group-hover:text-orange-700 group-focus:text-orange-700">
          Back to Home
        </span>
      </Link>
    </div>
  );
};

BackButton.displayName = 'BackButton';
export { BackButton };
