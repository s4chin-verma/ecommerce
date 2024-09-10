import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, Package, ShoppingCart, Users } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white p-6 shadow-md">
        <nav className="flex space-y-4 flex-col">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Overview
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="ghost" className="w-full justify-start">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </Button>
          </Link>
          <Link href="/admin/products">
            <Button variant="ghost" className="w-full justify-start">
              <Package className="mr-2 h-4 w-4" />
              Products
            </Button>
          </Link>
          <Link href="/admin/customers">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              Customers
            </Button>
          </Link>
          <Link href="/admin/inventory">
            <Button variant="ghost" className="w-full justify-start">
              <Package className="mr-2 h-4 w-4" />
              Inventory
            </Button>
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
