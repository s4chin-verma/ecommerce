import { z } from 'zod';

export const productSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Name is required and should be at least 3 characters')
      .max(255, 'Name should not exceed 255 characters'),
    description: z
      .string()
      .min(10, 'Description should be at least 10 characters'),
    price: z
      .number()
      .positive('Price must be a positive number')
      .min(0.01, 'Price should be at least 0.01')
      .max(1000000, 'Price should not exceed 1,000,000'),
    sellingPrice: z
      .number()
      .positive('Selling price must be a positive number')
      .max(1000000, 'Selling price should not exceed 1,000,000')
      .optional(),
    stock: z
      .number()
      .int('Stock must be an integer')
      .nonnegative('Stock must be a non-negative integer'),
    categoryId: z.string().min(1, 'Category is required'),
    images: z
      .array(z.string().url('Must be a valid URL'))
      .min(1, 'At least one image is required'),
    wishlistId: z.string().optional(),
  })
  .transform(data => ({
    ...data,
    sellingPrice:
      data.sellingPrice === undefined ? data.price : data.sellingPrice,
  }));

export type ProductSchemaType = z.infer<typeof productSchema>;
