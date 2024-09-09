'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Package } from 'lucide-react';
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
} from '@/components/ui/dialog';
import { toast, useToast } from '@/components/ui/use-toast';

// Mock data for initial products
const initialProducts = [
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

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const { toast } = useToast();

  const handleAddProduct = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newProduct = {
      id: products.length + 1,
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price')),
      stock: parseInt(formData.get('stock')),
      category: formData.get('category'),
    };
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    toast({
      title: 'Product Added',
      description: `${newProduct.name} has been added to the inventory.`,
    });
  };

  const handleEditProduct = event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedProduct = {
      ...currentProduct,
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price')),
      stock: parseInt(formData.get('stock')),
      category: formData.get('category'),
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

  const handleDeleteProduct = id => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: 'Product Deleted',
      description: 'The product has been removed from the inventory.',
      variant: 'destructive',
    });
  };

  const openEditDialog = product => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
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

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
    </div>
  );
}
