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
  category: { title: string };
  createdAt: Date;
  updatedAt: Date;
}
