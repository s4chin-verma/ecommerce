'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQuery } from '@urql/next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { productSchema, ProductSchemaType } from '@/lib/schema/zod';
import { ProductCardProps as Product } from '@/lib/interface';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  GetProductForUpdateDocument,
  GetProductForUpdateQuery,
  GetProductForUpdateQueryVariables,
  UpdateProductDocument,
  UpdateProductMutation,
  UpdateProductMutationVariables,
} from '@/graphql/generated';

import { Loader } from 'lucide-react';
import { DeleteProductButton } from '../../components/DeleteProductButton';
import { use, useEffect, useState } from 'react';
import { CategorySelect } from '../../components/CategorySelect';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const [result, updateProduct] = useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(UpdateProductDocument);

  const [{ data, fetching, error }] = useQuery<
    GetProductForUpdateQuery,
    GetProductForUpdateQueryVariables
  >({
    query: GetProductForUpdateDocument,
    variables: { getProductId: productId },
  });

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      sellingPrice: 0,
      stock: 0,
      categoryId: '',
      images: [''],
    },
  });

  useEffect(() => {
    if (data?.getProduct) {
      const product = data.getProduct;
      form.reset({
        name: product.name as string,
        description: product.description as string,
        price: product.price as number,
        sellingPrice: product.sellingPrice as number,
        stock: product.stock as number,
        categoryId: product.category?.title as string,
        images: product.images as string[],
      });
    }
  }, [data, form]);

  const onSubmit = async (formData: ProductSchemaType) => {
    try {
      setIsFormSubmitted(true);

      const response = await updateProduct({
        updateProductId: productId,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        sellingPrice: formData.sellingPrice,
        categoryId: formData.categoryId,
        images: formData.images.filter(img => img !== ''),
        stock: formData.stock,
      });

      if (response.error) {
        toast.error(
          response.error.graphQLErrors[0].message || 'Failed to update product'
        );
        setIsFormSubmitted(false);
      } else {
        toast.success('Product updated successfully!');

        setTimeout(() => {
          setIsFormSubmitted(false);
        }, 200);
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
      setIsFormSubmitted(false);
    }
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-1">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">Edit Product</CardTitle>
          <CardDescription>Edit the details of product below.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {fetching ? (
                <Loader className="animate-spin h-8 w-8 mx-auto" />
              ) : error ? (
                <p>Error loading product data</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="p-4 bg-green-50 rounded-md">
                      <p className="text-sm text-gray-500">Created At</p>
                      <p className="font-medium">
                        {formatDate(data?.getProduct?.createdAt)}
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-md">
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="font-medium">
                        {formatDate(data?.getProduct?.updatedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Product name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <CategorySelect
                              onValueChange={field.onChange}
                              value={field.value}
                              isFormSubmitted={isFormSubmitted}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <h1>{data?.getProduct?.category?.title}</h1>
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write description here"
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="1999.99"
                              type="text"
                              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              value={field.value.toString()}
                              onChange={e => {
                                const value =
                                  e.target.value === ''
                                    ? 0
                                    : parseFloat(e.target.value);
                                field.onChange(isNaN(value) ? 0 : value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sellingPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Selling Price</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="1899.99"
                              type="text"
                              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              value={field.value.toString()}
                              onChange={e => {
                                const value =
                                  e.target.value === ''
                                    ? 0
                                    : parseFloat(e.target.value);
                                field.onChange(isNaN(value) ? 0 : value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="199"
                              type="text"
                              value={field.value.toString()}
                              onChange={e => {
                                const value =
                                  e.target.value === ''
                                    ? 0
                                    : parseInt(e.target.value, 10);
                                field.onChange(isNaN(value) ? 0 : value);
                              }}
                              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://example.com/image.jpg"
                            value={field.value[0] || ''}
                            onChange={e => {
                              const newImages = [...field.value];
                              newImages[0] = e.target.value;
                              field.onChange(newImages);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <Button type="submit" className="w-full sm:w-auto">
                      {result.fetching ? (
                        <Loader className="animate-spin h-6 w-6 mx-8" />
                      ) : (
                        'Update Product'
                      )}
                    </Button>
                    <DeleteProductButton productId={productId}>
                      Delete Product
                    </DeleteProductButton>
                  </div>
                </>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
