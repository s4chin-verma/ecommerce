'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@urql/next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { productSchema, ProductSchemaType } from '@/lib/schema/zod';
import { CategorySelect } from '../components/CategorySelect';
import { Loader } from 'lucide-react';
import { UploadImg } from '@/components/UploadImg';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { NextPage } from 'next';
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
  AddProductDocument,
  AddProductMutation,
  AddProductMutationVariables,
} from '@/graphql/generated';

const Page: NextPage = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>(['']);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFields, setImageFields] = useState<number[]>([0]);
  const { toast } = useToast();
  const [result, addProduct] = useMutation<
    AddProductMutation,
    AddProductMutationVariables
  >(AddProductDocument);

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

  const onSubmit = async (data: ProductSchemaType) => {
    console.log(data);
    try {
      const response = await addProduct({
        name: data.name,
        description: data.description,
        price: data.price,
        sellingPrice: data.sellingPrice,
        categoryId: data.categoryId,
        images: data.images,
        stock: data.stock,
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

  const handleImageUpload = (index: number, url: string) => {
    const updatedImages = [...uploadedImages];
    updatedImages[index] = url;
    setUploadedImages(updatedImages);
    form.setValue('images', updatedImages);
  };

  const addMoreImageFields = () => {
    if (imageFields.length < 7) {
      setImageFields([...imageFields, imageFields.length]);
      setUploadedImages([...uploadedImages, '']);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
        <CardDescription>
          Fill out the form below to add a new product.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Textarea placeholder="Write description here" {...field} />
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
            <div className="flex flex-row gap-4">
              {imageFields.map((_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`images.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Image {index + 1}</FormLabel>
                      <FormControl>
                        <UploadImg
                          handleCallback={(fileUrl: string) =>
                            handleImageUpload(index, fileUrl)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={addMoreImageFields}
                variant="outline"
                className="flex items-center gap-2"
                disabled={imageFields.length >= 7}
              >
                <Plus className="h-4 w-4" /> Add another image
              </Button>
              <Button type="submit" className="w-full md:w-auto">
                {result.fetching ? (
                  <Loader className="animate-spin h-6 w-6 mx-8" />
                ) : (
                  'Add Product'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Page;
