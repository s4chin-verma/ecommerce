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

export const registerSchema = z
  .object({
    firstName: z.string().min(3, 'First name must be at least 3 characters'),
    lastName: z.string().min(3, 'Last name must be at least 3 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password cannot be greater than 16 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Confirm password cannot be greater than 16 characters'),
    terms: z.boolean().refine(value => value === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });
export type RegisterSchemaType = z.infer<typeof registerSchema>;
