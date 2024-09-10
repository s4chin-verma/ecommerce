'use client';

import React, { useState } from 'react';
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Diamond Ring',
    description: 'Elegant diamond solitaire',
    price: 1999.99,
    stock: 10,
    category: 'Rings',
  },
  {
    id: 2,
    name: 'Pearl Necklace',
    description: 'Classic pearl strand',
    price: 299.99,
    stock: 15,
    category: 'Necklaces',
  },
  {
    id: 3,
    name: 'Gold Bracelet',
    description: 'Solid gold chain bracelet',
    price: 599.99,
    stock: 8,
    category: 'Bracelets',
  },
];

export default function ProductManagement(): JSX.Element {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleAddProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newProduct: Product = {
      id: products.length + 1,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      stock: parseInt(formData.get('stock') as string, 10),
      category: formData.get('category') as string,
    };
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    toast({
      title: 'Product Added',
      description: `${newProduct.name} has been added to the inventory.`,
    });
  };

  const handleEditProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updatedProduct: Product = {
      ...currentProduct!,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      stock: parseInt(formData.get('stock') as string, 10),
      category: formData.get('category') as string,
    };
    setProducts(
      products.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setIsEditDialogOpen(false);
    toast({
      title: 'Product Updated',
      description: `${updatedProduct.name} has been updated.`,
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: 'Product Deleted',
      description: 'The product has been removed from the inventory.',
      variant: 'destructive',
    });
  };

  const openEditDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row">
        <CardTitle className="text-3xl font-bold">Product Management</CardTitle>
        <div className="flex justify-between items-center mb-6">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Enter the details of the new jewelry product here.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddProduct}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock" className="text-right">
                      Stock
                    </Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Select name="category" defaultValue="Rings">
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
                  <Button type="submit">Add Product</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-white rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
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
                              <span className="font-semibold">
                                {product.name}
                              </span>
                              ? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="mt-4 p-4 bg-red-50 rounded-md">
                            <p className="text-sm text-red-800">
                              Deleting this product will:
                            </p>
                            <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                              <li>Remove it from your inventory</li>
                              <li>Delete all associated data</li>
                              <li>
                                Potentially affect related orders or reports
                              </li>
                            </ul>
                          </div>
                          <DialogFooter className="mt-6 flex justify-end space-x-2">
                            <DialogTrigger asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogTrigger>
                            <Button
                              variant="destructive"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
                            >
                              Delete Product
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
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
                    <Select
                      name="category"
                      defaultValue={currentProduct.category}
                    >
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
      </CardContent>
    </Card>
  );
}
