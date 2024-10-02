import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export const ConfirmDialog = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'secondary'}>Update</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will update the product details. Are you sure you want
            to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => {}}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

<Dialog>
  <DialogTrigger asChild>
    <Button
      variant="outline"
      size="icon"
      onClick={() => handleEdit('name', product.name)}
    >
      <Pencil className="h-4 w-4" />
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit Product Name</DialogTitle>
      <DialogDescription>
        Make changes to the product name here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          className="col-span-3"
        />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit" onClick={handleSave}>
        Save changes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;

<Dialog>
  <DialogTrigger asChild>
    <Button
      variant="outline"
      size="icon"
      className="ml-2"
      onClick={() =>
        handleEdit('sellingPrice', product.sellingPrice || product.price)
      }
    >
      <Pencil className="h-4 w-4" />
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit Price</DialogTitle>
      <DialogDescription>
        Update the selling price of the product here.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="price" className="text-right">
          Price
        </Label>
        <Input
          id="price"
          type="number"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          className="col-span-3"
        />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit" onClick={handleSave}>
        Save changes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;

<Dialog>
  <DialogTrigger asChild>
    <Button
      variant="outline"
      size="icon"
      className="ml-2"
      onClick={() => handleEdit('stock', product.stock)}
    >
      <Pencil className="h-4 w-4" />
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit Stock</DialogTitle>
      <DialogDescription>
        Update the stock quantity of the product here.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="stock" className="text-right">
          Stock
        </Label>
        <Input
          id="stock"
          type="number"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          className="col-span-3"
        />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit" onClick={handleSave}>
        Save changes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;

<Dialog>
  <DialogTrigger asChild>
    <Button
      variant="outline"
      size="icon"
      className="mt-2"
      onClick={() => handleEdit('description', product.description)}
    >
      <Pencil className="h-4 w-4" />
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit Description</DialogTitle>
      <DialogDescription>
        Update the product description here.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Textarea
          id="description"
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          className="col-span-3"
        />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit" onClick={handleSave}>
        Save changes
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>;
