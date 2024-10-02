import { FC, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useMutation } from 'urql';
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  DeleteProductDocument,
  DeleteProductMutation,
  DeleteProductMutationVariables,
} from '@/graphql/generated';

interface Props {
  children: string;
  productId: string;
}

const DeleteProductButton: FC<Props> = ({ children, productId }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [result, deleteProduct] = useMutation<
    DeleteProductMutation,
    DeleteProductMutationVariables
  >(DeleteProductDocument);

  const handleDelete = useCallback(async () => {
    const response = await deleteProduct({ deleteProductId: productId });

    if (response.error) {
      toast({
        title: 'Error',
        description: 'Failed to delete product. Please try again.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Product deleted successfully!',
      });
      router.push('/admin/inventory');
    }
  }, [deleteProduct, productId, toast, router]);

  return (
    <div className="flex space-x-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <Trash2 className="h-7 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 mb-5">
              <AlertTriangle className="h-5 w-5" />
              Confirm Product Deletion
            </DialogTitle>
            <DialogDescription className="text-left">
              Are you sure you want to delete{' '}
              <span className="font-semibold">{children}</span>? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-red-50 rounded-md">
            <p className="text-sm text-red-800">Deleting this product will:</p>
            <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
              <li>Remove it from your inventory</li>
              <li>Delete all associated data</li>
              <li>Potentially affect related orders or reports</li>
            </ul>
          </div>
          <DialogFooter className="mt-6 flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
              onClick={handleDelete} // Trigger delete action
              disabled={result.fetching}
            >
              {result.fetching ? (
                <Loader2 className="h-7 w-6 animate-spin" />
              ) : (
                'Delete Product'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { DeleteProductButton };
