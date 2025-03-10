import { Button } from '@/components/ui/button';
import { ShoppingCart, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMutation } from 'urql';
import {
  AddToCartDocument,
  AddToCartMutation,
  AddToCartMutationVariables,
} from '@/graphql/generated';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface AddToCartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  stock: number;
  isGoToProduct?: boolean;
  className?: string;
  icon?: React.ReactNode;
  hoverColor?: string;
  borderColor?: string;
  productId?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  children,
  stock,
  isGoToProduct,
  className,
  productId,
  icon,
  ...props
}) => {
  let buttonText = children || 'Add to Cart';
  let buttonIcon = icon || (
    <ShoppingCart className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
  );
  let isSoldOut = stock === 0;
  if (isSoldOut) {
    buttonText = 'Sold Out';
    buttonIcon = icon || <AlertCircle className="w-4 h-4 mr-2" />;
  } else if (isGoToProduct) {
    buttonText = 'Go to Product';
    buttonIcon = icon || <ExternalLink className="w-4 h-4 mr-2" />;
  }

  const router = useRouter();

  const [result, addToCart] = useMutation<
    AddToCartMutation,
    AddToCartMutationVariables
  >(AddToCartDocument);

  const handleClick = async () => {
    try {
      if (stock === 0) {
        toast.info('Product is not available');
        return;
      }
      const response = await addToCart({
        productId: productId as string,
        quantity: 1,
      });
      if (response?.error?.graphQLErrors[0].message === 'UNAUTHENTICATED') {
        toast.warning('Please Login', {
          description: 'You need an account to perform this action',
          action: {
            label: 'Login',
            onClick: () => {
              router.push('/shop/auth/login');
              toast.info('Redirecting to login page');
            },
          },
        });
      } else {
        toast.success('Product added to cart successfully');
      }
    } catch (error) {
      toast.error('Product added to cart failed');
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isSoldOut}
      className={cn(
        'flex items-center group px-4 py-2 rounded-xl',
        'bg-transparent text-black border border-gray-500 ',
        'transition-all duration-300 ease-in-out',
        `hover:bg-orange-200 hover:text-black`,
        `focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50`,
        `hover:border-orange-500`,
        'transform hover:-translate-y-0.5 active:translate-y-0',
        'shadow-sm hover:shadow-md',
        className
      )}
      {...props}
    >
      {result.fetching ? (
        <>
          <Loader2 className="animate-spin" />
          <span className="font-semibold">Adding...</span>
        </>
      ) : (
        <>
          {buttonIcon}
          <span className="font-semibold">{buttonText}</span>
        </>
      )}
    </Button>
  );
};

export default AddToCartButton;
