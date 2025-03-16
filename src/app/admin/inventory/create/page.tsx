'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@urql/next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { productSchema, ProductSchemaType } from '@/lib/schema/zod';
import { CategorySelect } from '../components/CategorySelect';
import { ImagePlus, Loader, Minus, Plus } from 'lucide-react';
import { UploadImg } from '@/components/UploadImg';
import { useState } from 'react';
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
import { toast } from 'sonner';

const Page: NextPage = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>(['']);
  const [imageFields, setImageFields] = useState<number[]>([0]);
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
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
    try {
      const response = await addProduct({
        name: data.name,
        description: data.description,
        price: data.price,
        sellingPrice: data.sellingPrice,
        categoryId: data.categoryId,
        images: data.images.filter(img => img !== ''),
        stock: data.stock,
      });

      if (response.error) {
        toast.error(response.error.graphQLErrors[0].message);
        setIsFormSubmitted(false);
      } else {
        toast.success('Product created successfully');
        setIsFormSubmitted(true);
        setImageFields([0]);
        setUploadedImages(['']);
        form.reset();

        setTimeout(() => {
          setIsFormSubmitted(false);
        }, 200);
      }
    } catch (error) {
      toast.error('An unknown error occurred');
      setIsFormSubmitted(false);
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

  const removeMoreImageFields = () => {
    if (imageFields.length > 0) {
      const updatedImages = uploadedImages.filter(
        (_, index) => index !== imageFields.length - 1
      );
      setImageFields(imageFields.slice(0, -1));
      setUploadedImages(updatedImages);
      form.setValue('images', updatedImages);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-1">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">Add Product</CardTitle>
          <CardDescription>
            Fill out the form below to add a new product to your inventory.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Product Name
                      </FormLabel>
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
                      <FormLabel className="font-medium">Category</FormLabel>
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
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write product description here"
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
                      <FormLabel className="font-medium">Price</FormLabel>
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
                      <FormLabel className="font-medium">
                        Selling Price
                      </FormLabel>
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
                      <FormLabel className="font-medium">Stock</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          type="text"
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          value={field.value.toString()}
                          onChange={e => {
                            const value =
                              e.target.value === ''
                                ? 0
                                : parseInt(e.target.value, 10);
                            field.onChange(isNaN(value) ? 0 : value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Product Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {imageFields.map((_, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`images.${index}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-medium">
                            Image {index + 1}
                          </FormLabel>
                          <FormControl>
                            <UploadImg
                              isFormSubmitted={isFormSubmitted}
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
                  <div className="border rounded-lg h-full flex flex-col items-center justify-center gap-2">
                    <Button
                      type="button"
                      onClick={addMoreImageFields}
                      variant="outline"
                      className="flex items-center gap-2"
                      disabled={imageFields.length >= 7}
                    >
                      <Plus className="h-4 w-4" /> Add another image
                    </Button>
                    <ImagePlus className="h-10 w-10 text-gray-400" />
                    <Button
                      type="button"
                      onClick={removeMoreImageFields}
                      variant="outline"
                      className="flex items-center gap-2"
                      disabled={imageFields.length >= 7}
                    >
                      <Minus className="h-4 w-4" />
                      Remove Image field
                    </Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button type="submit" className="w-full sm:w-auto">
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
    </div>
  );
};

export default Page;
