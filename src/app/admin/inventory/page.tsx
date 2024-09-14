import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AddProduct } from './components/AddProduct';
import { DeleteProductButton } from './components/DeleteProductButton';

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
  return (
    <Card>
      <CardHeader className="flex justify-between flex-row">
        <CardTitle className="text-3xl font-bold">Product Management</CardTitle>
        <AddProduct />
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
              {initialProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <DeleteProductButton children={product.name} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
