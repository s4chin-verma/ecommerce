'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
import { useToast } from '@/components/ui/use-toast';
const EditProduct = () => {
  return (
    <Dialog>
      <Dial ogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the details of the selected jewelry product.
          </DialogDescription>
        </DialogHeader>
        {currentProduct && (
          <form onSubmit={handleEditProduct}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  name="name"
                  defaultValue={currentProduct.name}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  defaultValue={currentProduct.description}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  Price
                </Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={currentProduct.price}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-stock" className="text-right">
                  Stock
                </Label>
                <Input
                  id="edit-stock"
                  name="stock"
                  type="number"
                  defaultValue={currentProduct.stock}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Category
                </Label>
                <Select name="category" defaultValue={currentProduct.category}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rings">Rings</SelectItem>
                    <SelectItem value="Necklaces">Necklaces</SelectItem>
                    <SelectItem value="Bracelets">Bracelets</SelectItem>
                    <SelectItem value="Earrings">Earrings</SelectItem>
                    <SelectItem value="Watches">Watches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Update Product</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
