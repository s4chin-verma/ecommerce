import { Button } from '@/components/ui/button';
import { ShoppingCart, AlertCircle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSoldOut?: boolean;
  isGoToProduct?: boolean;
  className?: string;
  icon?: React.ReactNode;
  hoverColor?: string;
  borderColor?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  children,
  isSoldOut,
  isGoToProduct,
  onClick,
  className,
  icon,
  ...props
}) => {
  let buttonText = children || 'Add to Cart';
  let buttonIcon = icon || (
    <ShoppingCart className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
  );

  if (isSoldOut) {
    buttonText = 'Sold Out';
    buttonIcon = icon || <AlertCircle className="w-4 h-4 mr-2" />;
  } else if (isGoToProduct) {
    buttonText = 'Go to Product';
    buttonIcon = icon || <ExternalLink className="w-4 h-4 mr-2" />;
  }

  return (
    <Button
      onClick={onClick}
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
      {buttonIcon}
      <span className="font-semibold">{buttonText}</span>
    </Button>
  );
};

export default AddToCartButton;
