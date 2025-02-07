import { useCallback } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Heart, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQuery } from 'urql';
import {
  AddToWishlistDocument,
  AddToWishlistMutation,
  AddToWishlistMutationVariables,
  IsWishListedDocument,
  IsWishListedQuery,
  IsWishListedQueryVariables,
  RemoveFromWishlistDocument,
  RemoveFromWishlistMutation,
  RemoveFromWishlistMutationVariables,
} from '@/graphql/generated';

export const WishListIcon = ({ productId }: { productId: string }) => {
  const { toast } = useToast();

  const [{ data, fetching: queryFetching }, reexecuteQuery] = useQuery<
    IsWishListedQuery,
    IsWishListedQueryVariables
  >({
    query: IsWishListedDocument,
    variables: { productId },
  });

  const [{ fetching: addFetching }, addToWishlist] = useMutation<
    AddToWishlistMutation,
    AddToWishlistMutationVariables
  >(AddToWishlistDocument);

  const [{ fetching: removeFetching }, removeFromWishlist] = useMutation<
    RemoveFromWishlistMutation,
    RemoveFromWishlistMutationVariables
  >(RemoveFromWishlistDocument);

  const handleWishlistToggle = useCallback(async () => {
    const isCurrentlyWishlisted = data?.isWishListed;

    try {
      const mutation = isCurrentlyWishlisted
        ? removeFromWishlist
        : addToWishlist;
      const response = await mutation({ productId });

      if (response.error) {
        console.error(response.error);
        toast({
          title: 'Error',
          description: `Failed to ${
            isCurrentlyWishlisted ? 'remove from' : 'add to'
          } wishlist`,
          variant: 'destructive',
        });
      } else {
        reexecuteQuery({ requestPolicy: 'network-only' });
        toast({
          title: 'Success',
          description: `Product ${
            isCurrentlyWishlisted ? 'removed from' : 'added to'
          } wishlist!`,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  }, [
    data?.isWishListed,
    productId,
    addToWishlist,
    removeFromWishlist,
    toast,
    reexecuteQuery,
  ]);

  const isLoading = queryFetching || addFetching || removeFetching;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {isLoading ? (
            <Loader2 className="animate-spin h-6 w-6" />
          ) : (
            <Heart
              className={`h-6 w-6 cursor-pointer ${
                data?.isWishListed
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-500'
              }`}
              onClick={handleWishlistToggle}
            />
          )}
        </TooltipTrigger>
        <TooltipContent>
          {data?.isWishListed ? 'Remove from wishlist' : 'Add to wishlist'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default WishListIcon;
