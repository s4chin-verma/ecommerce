import { Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DeleteProductDialogProps {
  productName: string;
  onDelete: () => void;
}

export function DeleteProductDialog({
  productName,
  onDelete,
}: DeleteProductDialogProps): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Confirm Product Deletion
          </DialogTitle>
          <DialogDescription className="text-left">
            Are you sure you want to delete{' '}
            <span className="font-semibold">{productName}</span>? This action
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
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <Button
            variant="destructive"
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            Delete Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
