import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type Address = {
  __typename?: 'Address';
  addressLine1?: Maybe<Scalars['String']['output']>;
  addressLine2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Cart = {
  __typename?: 'Cart';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  products?: Maybe<Array<CartProduct>>;
  totalAmount?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type CartProduct = {
  __typename?: 'CartProduct';
  cart?: Maybe<Cart>;
  cartId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

export type Category = {
  __typename?: 'Category';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  products?: Maybe<Array<Product>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Delivery = {
  __typename?: 'Delivery';
  driverEmail?: Maybe<Scalars['String']['output']>;
  driverName?: Maybe<Scalars['String']['output']>;
  driverPhone?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  order?: Maybe<Order>;
  orderNum?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory?: Maybe<Category>;
  addProduct?: Maybe<Product>;
  createAddress?: Maybe<Address>;
  createOrder?: Maybe<Order>;
  deleteAddress?: Maybe<Address>;
  deleteMenu?: Maybe<Category>;
  deleteProduct?: Maybe<Product>;
  editMenu?: Maybe<Category>;
  editUserRole?: Maybe<User>;
  updateAddress?: Maybe<Address>;
  updateOrder?: Maybe<Order>;
  updateProduct?: Maybe<Product>;
  updateStatus?: Maybe<Order>;
  updateStock?: Maybe<Product>;
};

export type MutationAddCategoryArgs = {
  description: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type MutationAddProductArgs = {
  categoryId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  images: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  sellingPrice: Scalars['Float']['input'];
  stock: Scalars['Int']['input'];
};

export type MutationCreateAddressArgs = {
  addressLine1: Scalars['String']['input'];
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  state: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MutationCreateOrderArgs = {
  addressId: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  total: Scalars['Float']['input'];
  userEmail: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  userName: Scalars['String']['input'];
  userPhone: Scalars['String']['input'];
};

export type MutationDeleteAddressArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteMenuArgs = {
  id: Scalars['String']['input'];
};

export type MutationDeleteProductArgs = {
  id: Scalars['String']['input'];
};

export type MutationEditMenuArgs = {
  description: Scalars['String']['input'];
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type MutationEditUserRoleArgs = {
  id: Scalars['String']['input'];
  role: Role;
};

export type MutationUpdateAddressArgs = {
  addressLine1?: InputMaybe<Scalars['String']['input']>;
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdateOrderArgs = {
  deliveryTime?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  paid?: InputMaybe<Scalars['Boolean']['input']>;
  paymentToken?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OrderStatus>;
};

export type MutationUpdateProductArgs = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sellingPrice?: InputMaybe<Scalars['Float']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
};

export type MutationUpdateStatusArgs = {
  id: Scalars['String']['input'];
  status: OrderStatus;
};

export type MutationUpdateStockArgs = {
  id: Scalars['String']['input'];
  stock: Scalars['Int']['input'];
};

export type Order = {
  __typename?: 'Order';
  addressId?: Maybe<Scalars['ID']['output']>;
  delivery?: Maybe<Delivery>;
  deliveryAddress?: Maybe<Address>;
  deliveryFee?: Maybe<Scalars['Float']['output']>;
  deliveryTime?: Maybe<Scalars['DateTime']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  orderNumber?: Maybe<Scalars['ID']['output']>;
  orderProduct?: Maybe<Array<OrderProduct>>;
  paid?: Maybe<Scalars['Boolean']['output']>;
  payment?: Maybe<Array<Payment>>;
  paymentToken?: Maybe<Scalars['String']['output']>;
  serviceFee?: Maybe<Scalars['Float']['output']>;
  shipping?: Maybe<Array<Shipping>>;
  status?: Maybe<OrderStatus>;
  total?: Maybe<Scalars['Float']['output']>;
  user?: Maybe<User>;
  userEmail?: Maybe<Scalars['ID']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
  userName?: Maybe<Scalars['ID']['output']>;
  userPhone?: Maybe<Scalars['String']['output']>;
};

export type OrderProduct = {
  __typename?: 'OrderProduct';
  id?: Maybe<Scalars['ID']['output']>;
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
};

/** Order Status */
export enum OrderStatus {
  Delivered = 'DELIVERED',
  Ordered = 'ORDERED',
  OutForDelivery = 'OUT_FOR_DELIVERY',
  Shipped = 'SHIPPED',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  amount?: Maybe<Scalars['Float']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['String']['output']>;
  paymentMethod?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Product = {
  __typename?: 'Product';
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  images?: Maybe<Array<Scalars['String']['output']>>;
  name?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Float']['output']>;
  ratings?: Maybe<Scalars['Float']['output']>;
  sellingPrice?: Maybe<Scalars['Float']['output']>;
  stock?: Maybe<Scalars['Int']['output']>;
  totalSale?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  wishlistId?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAddressById?: Maybe<Address>;
  getAddressByUserId?: Maybe<Address>;
  getAllAddresses?: Maybe<Array<Address>>;
  getCategories?: Maybe<Array<Category>>;
  getCategory?: Maybe<Category>;
  getProduct?: Maybe<Product>;
  getProducts?: Maybe<QueryGetProductsConnection>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
};

export type QueryGetAddressByIdArgs = {
  id: Scalars['String']['input'];
};

export type QueryGetAddressByUserIdArgs = {
  userId: Scalars['String']['input'];
};

export type QueryGetCategoryArgs = {
  id: Scalars['String']['input'];
};

export type QueryGetProductArgs = {
  id: Scalars['String']['input'];
};

export type QueryGetProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryGetUserArgs = {
  email: Scalars['String']['input'];
};

export type QueryGetProductsConnection = {
  __typename?: 'QueryGetProductsConnection';
  edges?: Maybe<Array<Maybe<QueryGetProductsConnectionEdge>>>;
  pageInfo: PageInfo;
};

export type QueryGetProductsConnectionEdge = {
  __typename?: 'QueryGetProductsConnectionEdge';
  cursor: Scalars['String']['output'];
  node?: Maybe<Product>;
};

export type Review = {
  __typename?: 'Review';
  comment?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['ID']['output']>;
  rating?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['ID']['output']>;
};

/** User Role */
export enum Role {
  Admin = 'ADMIN',
  User = 'USER',
}

export type Shipping = {
  __typename?: 'Shipping';
  carrier?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  estimatedDelivery?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  order?: Maybe<Order>;
  orderId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  trackingNumber?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Array<Address>>;
  cart?: Maybe<Array<Cart>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  orderHistory?: Maybe<Array<Order>>;
  password?: Maybe<Scalars['String']['output']>;
  payment?: Maybe<Array<Payment>>;
  phone?: Maybe<Scalars['String']['output']>;
  review?: Maybe<Array<Review>>;
  role?: Maybe<Role>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  wishlist?: Maybe<Wishlist>;
};

export type Wishlist = {
  __typename?: 'Wishlist';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  products?: Maybe<Array<Product>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCategoriesQuery = {
  __typename?: 'Query';
  getCategories?: Array<{
    __typename?: 'Category';
    id?: string | null;
    title?: string | null;
  }> | null;
};

export type GetProductQueryVariables = Exact<{
  getProductId: Scalars['String']['input'];
}>;

export type GetProductQuery = {
  __typename?: 'Query';
  getProduct?: {
    __typename?: 'Product';
    categoryId?: string | null;
    description?: string | null;
    id?: string | null;
    images?: Array<string> | null;
    name?: string | null;
    price?: number | null;
    ratings?: number | null;
    sellingPrice?: number | null;
    stock?: number | null;
    totalSale?: number | null;
  } | null;
};

export type AddProductMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  sellingPrice: Scalars['Float']['input'];
  categoryId: Scalars['String']['input'];
  images: Array<Scalars['String']['input']> | Scalars['String']['input'];
  stock: Scalars['Int']['input'];
}>;

export type AddProductMutation = {
  __typename?: 'Mutation';
  addProduct?: { __typename?: 'Product'; id?: string | null } | null;
};

export const GetCategoriesDocument = gql`
  query GetCategories {
    getCategories {
      id
      title
    }
  }
`;

export function useGetCategoriesQuery(
  options?: Omit<Urql.UseQueryArgs<GetCategoriesQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>({
    query: GetCategoriesDocument,
    ...options,
  });
}
export const GetProductDocument = gql`
  query GetProduct($getProductId: String!) {
    getProduct(id: $getProductId) {
      categoryId
      description
      id
      images
      name
      price
      ratings
      sellingPrice
      stock
      totalSale
    }
  }
`;

export function useGetProductQuery(
  options: Omit<Urql.UseQueryArgs<GetProductQueryVariables>, 'query'>
) {
  return Urql.useQuery<GetProductQuery, GetProductQueryVariables>({
    query: GetProductDocument,
    ...options,
  });
}
export const AddProductDocument = gql`
  mutation AddProduct(
    $name: String!
    $description: String!
    $price: Float!
    $sellingPrice: Float!
    $categoryId: String!
    $images: [String!]!
    $stock: Int!
  ) {
    addProduct(
      name: $name
      description: $description
      price: $price
      sellingPrice: $sellingPrice
      categoryId: $categoryId
      images: $images
      stock: $stock
    ) {
      id
    }
  }
`;

export function useAddProductMutation() {
  return Urql.useMutation<AddProductMutation, AddProductMutationVariables>(
    AddProductDocument
  );
}
