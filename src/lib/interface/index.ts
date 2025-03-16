export interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  sellingPrice: number;
  stock: number;
  images: string[];
  categoryId: string;
  wishlistId: string;
  ratings: number | null;
  category: { id?: string; title: string };
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItems {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    images: string[];
    price: number;
    sellingPrice: number;
    stock: number;
    category: { title: string };
  };
}
