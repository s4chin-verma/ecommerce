'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation, useQuery } from '@urql/next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { productSchema, ProductSchemaType } from '@/lib/schema/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  GetProductDocument,
  GetProductQuery,
  GetProductQueryVariables,
  UpdateProductDocument,
  UpdateProductMutation,
  UpdateProductMutationVariables,
} from '@/graphql/generated';

import { Loader } from 'lucide-react';
import { DeleteProductButton } from '../../components/DeleteProductButton';
import { useEffect } from 'react';
import { CategorySelect } from '../../components/CategorySelect';

const Page = ({ params }: { params: { id: string } }) => {
  const { toast } = useToast();
  const productId = params.id;

  const [result, updateProduct] = useMutation<
    UpdateProductMutation,
    UpdateProductMutationVariables
  >(UpdateProductDocument);

  const [{ data, fetching, error }] = useQuery<
    GetProductQuery,
    GetProductQueryVariables
  >({
    query: GetProductDocument,
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

  // Update form values when data is fetched
  useEffect(() => {
    if (data?.getProduct) {
      const product = data.getProduct;
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price,
        sellingPrice: product.sellingPrice,
        stock: product.stock,
        categoryId: product.categoryId,
        images: product.images,
      });
    }
  }, [data, form]);

  const onSubmit = async (formData: ProductSchemaType) => {
    try {
      const response = await updateProduct({
        name: formData.name,
        description: formData.description,
        price: formData.price,
        sellingPrice: formData.sellingPrice,
        categoryId: formData.categoryId,
        images: formData.images,
        stock: formData.stock,
      });

      if (response.error) {
        toast({
          title: 'Error',
          description: 'Failed to add product. Please try again.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Product added successfully!',
        });
        form.reset();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteProduct = () => {
    // handle product deletion here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
        <CardDescription>Edit the details of product below.</CardDescription>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fetching ? (
              <Loader className="animate-spin h-8 w-8 mx-auto" />
            ) : error ? (
              <p>Error loading product data</p>
            ) : (
              <>
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
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="199"
                            type="number"
                            {...field}
                            onChange={e =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <CategorySelect onValueChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write description here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="1999.99"
                            type="number"
                            {...field}
                            onChange={e =>
                              field.onChange(parseFloat(e.target.value))
                            }
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
                            type="number"
                            {...field}
                            onChange={e =>
                              field.onChange(parseFloat(e.target.value))
                            }
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
                          value={field.value[0]}
                          onChange={e => field.onChange([e.target.value])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between">
                  <Button type="submit" className="w-full md:w-auto">
                    {result.fetching ? (
                      <Loader className="animate-spin h-6 w-6 mx-8" />
                    ) : (
                      'Update Product'
                    )}
                  </Button>
                  <DeleteProductButton children="ring" productId={productId} />
                </div>
              </>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Page;
