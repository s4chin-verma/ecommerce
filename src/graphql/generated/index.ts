import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  addressLine?: Maybe<Scalars['String']['output']>;
  alternatePhone?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  landmark?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type CartProduct = {
  __typename?: 'CartProduct';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  products?: Maybe<Array<Product>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory?: Maybe<Category>;
  addProduct?: Maybe<Product>;
  addToCart?: Maybe<CartProduct>;
  addToWishlist?: Maybe<Wishlist>;
  createAddress?: Maybe<Address>;
  createOrder?: Maybe<Order>;
  createUser?: Maybe<User>;
  deleteAddress?: Maybe<Address>;
  deleteCartItem?: Maybe<CartProduct>;
  deleteMenu?: Maybe<Category>;
  deleteProduct?: Maybe<Product>;
  editMenu?: Maybe<Category>;
  editUserRole?: Maybe<User>;
  removeFromWishlist?: Maybe<Scalars['Boolean']['output']>;
  updateAddress?: Maybe<Address>;
  updateCartItemQuantity?: Maybe<CartProduct>;
  updateOrder?: Maybe<Order>;
  updateProduct?: Maybe<Product>;
  updateStatus?: Maybe<Order>;
  updateStock?: Maybe<Product>;
  updateUser?: Maybe<User>;
};


export type MutationAddCategoryArgs = {
  image: Scalars['String']['input'];
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


export type MutationAddToCartArgs = {
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationAddToWishlistArgs = {
  productId: Scalars['String']['input'];
};


export type MutationCreateAddressArgs = {
  addressLine: Scalars['String']['input'];
  alternatePhone?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  landmark: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  state: Scalars['String']['input'];
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


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationDeleteAddressArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteCartItemArgs = {
  cartItemId: Scalars['String']['input'];
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


export type MutationRemoveFromWishlistArgs = {
  productId: Scalars['String']['input'];
};


export type MutationUpdateAddressArgs = {
  addressLine?: InputMaybe<Scalars['String']['input']>;
  alternatePhone?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  landmark?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateCartItemQuantityArgs = {
  cartItemId: Scalars['String']['input'];
  change: Scalars['Int']['input'];
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


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  emailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
};

export type Order = {
  __typename?: 'Order';
  Payment?: Maybe<Array<Payment>>;
  Shipping?: Maybe<Array<Shipping>>;
  User?: Maybe<User>;
  addressId?: Maybe<Scalars['String']['output']>;
  deliveryAddress?: Maybe<Address>;
  deliveryFee?: Maybe<Scalars['Float']['output']>;
  deliveryTime?: Maybe<Scalars['DateTime']['output']>;
  discount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  orderDate?: Maybe<Scalars['DateTime']['output']>;
  orderNumber?: Maybe<Scalars['String']['output']>;
  paid?: Maybe<Scalars['Boolean']['output']>;
  paymentToken?: Maybe<Scalars['String']['output']>;
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['Int']['output']>;
  serviceFee?: Maybe<Scalars['Float']['output']>;
  status?: Maybe<OrderStatus>;
  subtotal?: Maybe<Scalars['Float']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
  userPhone?: Maybe<Scalars['String']['output']>;
};

/** Order Status */
export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Delivered = 'DELIVERED',
  Ordered = 'ORDERED',
  OutForDelivery = 'OUT_FOR_DELIVERY',
  Returned = 'RETURNED',
  Shipped = 'SHIPPED'
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
  getAddressesByUserId?: Maybe<Array<Address>>;
  getAllAddresses?: Maybe<Array<Address>>;
  getCartItems?: Maybe<Array<CartProduct>>;
  getCategories?: Maybe<Array<Category>>;
  getCategory?: Maybe<Category>;
  getLimitedProduct?: Maybe<Array<Product>>;
  getOrderByOrderId?: Maybe<Order>;
  getOrderByUserId?: Maybe<Array<Order>>;
  getProduct?: Maybe<Product>;
  getProductByCategory?: Maybe<Array<Product>>;
  getProducts?: Maybe<QueryGetProductsConnection>;
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
  isWishListed?: Maybe<Scalars['Boolean']['output']>;
  wishListedProducts?: Maybe<Array<Wishlist>>;
};


export type QueryGetAddressByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetAddressesByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetCategoryArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetLimitedProductArgs = {
  limit: Scalars['Int']['input'];
};


export type QueryGetOrderByOrderIdArgs = {
  orderId: Scalars['String']['input'];
};


export type QueryGetOrderByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetProductArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetProductByCategoryArgs = {
  categoryId: Scalars['String']['input'];
};


export type QueryGetProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryIsWishListedArgs = {
  productId: Scalars['String']['input'];
};


export type QueryWishListedProductsArgs = {
  userId: Scalars['String']['input'];
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
  User = 'USER'
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
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailVerified?: Maybe<Scalars['Boolean']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
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
  id?: Maybe<Scalars['ID']['output']>;
  productId?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
};

export type GetAddressesByUserIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetAddressesByUserIdQuery = { __typename?: 'Query', getAddressesByUserId?: Array<{ __typename?: 'Address', id?: string | null, name?: string | null, phone?: string | null, postalCode?: string | null, addressLine?: string | null, landmark?: string | null, city?: string | null, state?: string | null, alternatePhone?: string | null }> | null };

export type CreateAddressMutationVariables = Exact<{
  addressLine: Scalars['String']['input'];
  city: Scalars['String']['input'];
  landmark: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  state: Scalars['String']['input'];
  alternatePhone?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateAddressMutation = { __typename?: 'Mutation', createAddress?: { __typename?: 'Address', id?: string | null } | null };

export type DeleteAddressMutationVariables = Exact<{
  deleteAddressId: Scalars['String']['input'];
}>;


export type DeleteAddressMutation = { __typename?: 'Mutation', deleteAddress?: { __typename?: 'Address', id?: string | null } | null };

export type AddToCartMutationVariables = Exact<{
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type AddToCartMutation = { __typename?: 'Mutation', addToCart?: { __typename?: 'CartProduct', id?: string | null } | null };

export type UpdateCartItemQuantityMutationVariables = Exact<{
  cartItemId: Scalars['String']['input'];
  change: Scalars['Int']['input'];
}>;


export type UpdateCartItemQuantityMutation = { __typename?: 'Mutation', updateCartItemQuantity?: { __typename?: 'CartProduct', id?: string | null } | null };

export type DeleteCartItemMutationVariables = Exact<{
  cartItemId: Scalars['String']['input'];
}>;


export type DeleteCartItemMutation = { __typename?: 'Mutation', deleteCartItem?: { __typename?: 'CartProduct', id?: string | null } | null };

export type GetCartItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartItemsQuery = { __typename?: 'Query', getCartItems?: Array<{ __typename?: 'CartProduct', id?: string | null, quantity?: number | null, product?: { __typename?: 'Product', id?: string | null, name?: string | null, images?: Array<string> | null, price?: number | null, sellingPrice?: number | null, stock?: number | null, category?: { __typename?: 'Category', title?: string | null } | null } | null }> | null };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories?: Array<{ __typename?: 'Category', id?: string | null, title?: string | null, image?: string | null }> | null };

export type GetOrderByUserIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetOrderByUserIdQuery = { __typename?: 'Query', getOrderByUserId?: Array<{ __typename?: 'Order', id?: string | null, orderNumber?: string | null, orderDate?: any | null, status?: OrderStatus | null, quantity?: number | null, subtotal?: number | null, product?: { __typename?: 'Product', images?: Array<string> | null, name?: string | null, price?: number | null } | null }> | null };

export type AddProductMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  sellingPrice: Scalars['Float']['input'];
  categoryId: Scalars['String']['input'];
  images: Array<Scalars['String']['input']> | Scalars['String']['input'];
  stock: Scalars['Int']['input'];
}>;


export type AddProductMutation = { __typename?: 'Mutation', addProduct?: { __typename?: 'Product', id?: string | null } | null };

export type DeleteProductMutationVariables = Exact<{
  deleteProductId: Scalars['String']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct?: { __typename?: 'Product', id?: string | null } | null };

export type UpdateProductMutationVariables = Exact<{
  updateProductId: Scalars['String']['input'];
  categoryId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  sellingPrice?: InputMaybe<Scalars['Float']['input']>;
  stock?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct?: { __typename?: 'Product', categoryId?: string | null, description?: string | null, images?: Array<string> | null, name?: string | null, price?: number | null, sellingPrice?: number | null, stock?: number | null, id?: string | null } | null };

export type GetProductQueryVariables = Exact<{
  getProductId: Scalars['String']['input'];
}>;


export type GetProductQuery = { __typename?: 'Query', getProduct?: { __typename?: 'Product', id?: string | null, name?: string | null, description?: string | null, images?: Array<string> | null, price?: number | null, ratings?: number | null, sellingPrice?: number | null, stock?: number | null, category?: { __typename?: 'Category', title?: string | null } | null } | null };

export type GetProductForUpdateQueryVariables = Exact<{
  getProductId: Scalars['String']['input'];
}>;


export type GetProductForUpdateQuery = { __typename?: 'Query', getProduct?: { __typename?: 'Product', id?: string | null, name?: string | null, images?: Array<string> | null, description?: string | null, price?: number | null, sellingPrice?: number | null, stock?: number | null, createdAt?: any | null, updatedAt?: any | null, category?: { __typename?: 'Category', id?: string | null, title?: string | null } | null } | null };

export type GetProductForCheckOutQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type GetProductForCheckOutQuery = { __typename?: 'Query', getProduct?: { __typename?: 'Product', id?: string | null, images?: Array<string> | null, name?: string | null, sellingPrice?: number | null, price?: number | null, stock?: number | null, category?: { __typename?: 'Category', title?: string | null } | null } | null };

export type GetProductByCategoryIdQueryVariables = Exact<{
  categoryId: Scalars['String']['input'];
}>;


export type GetProductByCategoryIdQuery = { __typename?: 'Query', getProductByCategory?: Array<{ __typename?: 'Product', id?: string | null, name?: string | null, description?: string | null, images?: Array<string> | null, price?: number | null, ratings?: number | null, sellingPrice?: number | null, stock?: number | null, category?: { __typename?: 'Category', title?: string | null } | null }> | null };

export type GetLimitedProductQueryVariables = Exact<{
  limit: Scalars['Int']['input'];
}>;


export type GetLimitedProductQuery = { __typename?: 'Query', getLimitedProduct?: Array<{ __typename?: 'Product', id?: string | null, name?: string | null, description?: string | null, images?: Array<string> | null, price?: number | null, ratings?: number | null, sellingPrice?: number | null, stock?: number | null, category?: { __typename?: 'Category', title?: string | null } | null }> | null };

export type GetProductsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductsQuery = { __typename?: 'Query', getProducts?: { __typename?: 'QueryGetProductsConnection', edges?: Array<{ __typename?: 'QueryGetProductsConnectionEdge', cursor: string, node?: { __typename?: 'Product', id?: string | null, name?: string | null, description?: string | null, price?: number | null, sellingPrice?: number | null, stock?: number | null, images?: Array<string> | null, ratings?: number | null, createdAt?: any | null, categoryId?: string | null, wishlistId?: string | null, updatedAt?: any | null, category?: { __typename?: 'Category', title?: string | null } | null } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: Array<{ __typename?: 'User', firstName?: string | null, lastName?: string | null, email?: string | null, phone?: string | null }> | null };

export type GetUserForCheckoutQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserForCheckoutQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', firstName?: string | null, lastName?: string | null, phone?: string | null } | null };

export type GetUserQueryVariables = Exact<{
  getUserId: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, password?: string | null, phone?: string | null } | null };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id?: string | null } | null };

export type UpdateUserFullNameMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
}>;


export type UpdateUserFullNameMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id?: string | null, firstName?: string | null, lastName?: string | null } | null };

export type UpdateUserEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type UpdateUserEmailMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id?: string | null, email?: string | null } | null };

export type UpdateUserPhoneMutationVariables = Exact<{
  phone: Scalars['String']['input'];
}>;


export type UpdateUserPhoneMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id?: string | null, phone?: string | null } | null };

export type UpdateUserPasswordMutationVariables = Exact<{
  password: Scalars['String']['input'];
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id?: string | null } | null };

export type AddToWishlistMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type AddToWishlistMutation = { __typename?: 'Mutation', addToWishlist?: { __typename?: 'Wishlist', productId?: string | null } | null };

export type RemoveFromWishlistMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type RemoveFromWishlistMutation = { __typename?: 'Mutation', removeFromWishlist?: boolean | null };

export type IsWishListedQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type IsWishListedQuery = { __typename?: 'Query', isWishListed?: boolean | null };


export const GetAddressesByUserIdDocument = gql`
    query GetAddressesByUserId($userId: String!) {
  getAddressesByUserId(userId: $userId) {
    id
    name
    phone
    postalCode
    addressLine
    landmark
    city
    state
    alternatePhone
  }
}
    `;

export function useGetAddressesByUserIdQuery(options: Omit<Urql.UseQueryArgs<GetAddressesByUserIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetAddressesByUserIdQuery, GetAddressesByUserIdQueryVariables>({ query: GetAddressesByUserIdDocument, ...options });
};
export const CreateAddressDocument = gql`
    mutation CreateAddress($addressLine: String!, $city: String!, $landmark: String!, $name: String!, $phone: String!, $postalCode: String!, $state: String!, $alternatePhone: String) {
  createAddress(
    addressLine: $addressLine
    city: $city
    landmark: $landmark
    name: $name
    phone: $phone
    postalCode: $postalCode
    state: $state
    alternatePhone: $alternatePhone
  ) {
    id
  }
}
    `;

export function useCreateAddressMutation() {
  return Urql.useMutation<CreateAddressMutation, CreateAddressMutationVariables>(CreateAddressDocument);
};
export const DeleteAddressDocument = gql`
    mutation DeleteAddress($deleteAddressId: String!) {
  deleteAddress(id: $deleteAddressId) {
    id
  }
}
    `;

export function useDeleteAddressMutation() {
  return Urql.useMutation<DeleteAddressMutation, DeleteAddressMutationVariables>(DeleteAddressDocument);
};
export const AddToCartDocument = gql`
    mutation AddToCart($productId: String!, $quantity: Int!) {
  addToCart(productId: $productId, quantity: $quantity) {
    id
  }
}
    `;

export function useAddToCartMutation() {
  return Urql.useMutation<AddToCartMutation, AddToCartMutationVariables>(AddToCartDocument);
};
export const UpdateCartItemQuantityDocument = gql`
    mutation UpdateCartItemQuantity($cartItemId: String!, $change: Int!) {
  updateCartItemQuantity(cartItemId: $cartItemId, change: $change) {
    id
  }
}
    `;

export function useUpdateCartItemQuantityMutation() {
  return Urql.useMutation<UpdateCartItemQuantityMutation, UpdateCartItemQuantityMutationVariables>(UpdateCartItemQuantityDocument);
};
export const DeleteCartItemDocument = gql`
    mutation DeleteCartItem($cartItemId: String!) {
  deleteCartItem(cartItemId: $cartItemId) {
    id
  }
}
    `;

export function useDeleteCartItemMutation() {
  return Urql.useMutation<DeleteCartItemMutation, DeleteCartItemMutationVariables>(DeleteCartItemDocument);
};
export const GetCartItemsDocument = gql`
    query GetCartItems {
  getCartItems {
    id
    quantity
    product {
      id
      name
      images
      price
      sellingPrice
      stock
      category {
        title
      }
    }
  }
}
    `;

export function useGetCartItemsQuery(options?: Omit<Urql.UseQueryArgs<GetCartItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCartItemsQuery, GetCartItemsQueryVariables>({ query: GetCartItemsDocument, ...options });
};
export const GetCategoriesDocument = gql`
    query GetCategories {
  getCategories {
    id
    title
    image
  }
}
    `;

export function useGetCategoriesQuery(options?: Omit<Urql.UseQueryArgs<GetCategoriesQueryVariables>, 'query'>) {
  return Urql.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>({ query: GetCategoriesDocument, ...options });
};
export const GetOrderByUserIdDocument = gql`
    query GetOrderByUserId($userId: String!) {
  getOrderByUserId(userId: $userId) {
    id
    orderNumber
    orderDate
    status
    quantity
    subtotal
    product {
      images
      name
      price
    }
  }
}
    `;

export function useGetOrderByUserIdQuery(options: Omit<Urql.UseQueryArgs<GetOrderByUserIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetOrderByUserIdQuery, GetOrderByUserIdQueryVariables>({ query: GetOrderByUserIdDocument, ...options });
};
export const AddProductDocument = gql`
    mutation AddProduct($name: String!, $description: String!, $price: Float!, $sellingPrice: Float!, $categoryId: String!, $images: [String!]!, $stock: Int!) {
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
  return Urql.useMutation<AddProductMutation, AddProductMutationVariables>(AddProductDocument);
};
export const DeleteProductDocument = gql`
    mutation DeleteProduct($deleteProductId: String!) {
  deleteProduct(id: $deleteProductId) {
    id
  }
}
    `;

export function useDeleteProductMutation() {
  return Urql.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument);
};
export const UpdateProductDocument = gql`
    mutation UpdateProduct($updateProductId: String!, $categoryId: String, $description: String, $images: [String!], $name: String, $price: Float, $sellingPrice: Float, $stock: Int) {
  updateProduct(
    id: $updateProductId
    categoryId: $categoryId
    description: $description
    images: $images
    name: $name
    price: $price
    sellingPrice: $sellingPrice
    stock: $stock
  ) {
    categoryId
    description
    images
    name
    price
    sellingPrice
    stock
    id
  }
}
    `;

export function useUpdateProductMutation() {
  return Urql.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument);
};
export const GetProductDocument = gql`
    query GetProduct($getProductId: String!) {
  getProduct(id: $getProductId) {
    id
    name
    description
    images
    price
    ratings
    sellingPrice
    stock
    category {
      title
    }
  }
}
    `;

export function useGetProductQuery(options: Omit<Urql.UseQueryArgs<GetProductQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProductQuery, GetProductQueryVariables>({ query: GetProductDocument, ...options });
};
export const GetProductForUpdateDocument = gql`
    query GetProductForUpdate($getProductId: String!) {
  getProduct(id: $getProductId) {
    id
    name
    images
    description
    price
    sellingPrice
    stock
    category {
      id
      title
    }
    createdAt
    updatedAt
  }
}
    `;

export function useGetProductForUpdateQuery(options: Omit<Urql.UseQueryArgs<GetProductForUpdateQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProductForUpdateQuery, GetProductForUpdateQueryVariables>({ query: GetProductForUpdateDocument, ...options });
};
export const GetProductForCheckOutDocument = gql`
    query GetProductForCheckOut($productId: String!) {
  getProduct(id: $productId) {
    id
    images
    name
    sellingPrice
    price
    stock
    category {
      title
    }
  }
}
    `;

export function useGetProductForCheckOutQuery(options: Omit<Urql.UseQueryArgs<GetProductForCheckOutQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProductForCheckOutQuery, GetProductForCheckOutQueryVariables>({ query: GetProductForCheckOutDocument, ...options });
};
export const GetProductByCategoryIdDocument = gql`
    query GetProductByCategoryId($categoryId: String!) {
  getProductByCategory(categoryId: $categoryId) {
    id
    name
    description
    images
    price
    ratings
    sellingPrice
    stock
    category {
      title
    }
  }
}
    `;

export function useGetProductByCategoryIdQuery(options: Omit<Urql.UseQueryArgs<GetProductByCategoryIdQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProductByCategoryIdQuery, GetProductByCategoryIdQueryVariables>({ query: GetProductByCategoryIdDocument, ...options });
};
export const GetLimitedProductDocument = gql`
    query GetLimitedProduct($limit: Int!) {
  getLimitedProduct(limit: $limit) {
    id
    name
    description
    images
    price
    ratings
    sellingPrice
    stock
    category {
      title
    }
  }
}
    `;

export function useGetLimitedProductQuery(options: Omit<Urql.UseQueryArgs<GetLimitedProductQueryVariables>, 'query'>) {
  return Urql.useQuery<GetLimitedProductQuery, GetLimitedProductQueryVariables>({ query: GetLimitedProductDocument, ...options });
};
export const GetProductsDocument = gql`
    query GetProducts($first: Int, $after: String) {
  getProducts(first: $first, after: $after) {
    edges {
      node {
        id
        name
        description
        price
        sellingPrice
        stock
        images
        ratings
        createdAt
        categoryId
        wishlistId
        updatedAt
        category {
          title
        }
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;

export function useGetProductsQuery(options?: Omit<Urql.UseQueryArgs<GetProductsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetProductsQuery, GetProductsQueryVariables>({ query: GetProductsDocument, ...options });
};
export const GetUsersDocument = gql`
    query GetUsers {
  getUsers {
    firstName
    lastName
    email
    phone
  }
}
    `;

export function useGetUsersQuery(options?: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUsersQuery, GetUsersQueryVariables>({ query: GetUsersDocument, ...options });
};
export const GetUserForCheckoutDocument = gql`
    query GetUserForCheckout($userId: String!) {
  getUser(id: $userId) {
    firstName
    lastName
    phone
  }
}
    `;

export function useGetUserForCheckoutQuery(options: Omit<Urql.UseQueryArgs<GetUserForCheckoutQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserForCheckoutQuery, GetUserForCheckoutQueryVariables>({ query: GetUserForCheckoutDocument, ...options });
};
export const GetUserDocument = gql`
    query GetUser($getUserId: String!) {
  getUser(id: $getUserId) {
    id
    firstName
    lastName
    email
    password
    phone
  }
}
    `;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserQuery, GetUserQueryVariables>({ query: GetUserDocument, ...options });
};
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $firstName: String!, $lastName: String!, $password: String!, $phone: String!) {
  createUser(
    email: $email
    firstName: $firstName
    lastName: $lastName
    password: $password
    phone: $phone
  ) {
    id
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const UpdateUserFullNameDocument = gql`
    mutation UpdateUserFullName($firstName: String!, $lastName: String!) {
  updateUser(firstName: $firstName, lastName: $lastName) {
    id
    firstName
    lastName
  }
}
    `;

export function useUpdateUserFullNameMutation() {
  return Urql.useMutation<UpdateUserFullNameMutation, UpdateUserFullNameMutationVariables>(UpdateUserFullNameDocument);
};
export const UpdateUserEmailDocument = gql`
    mutation UpdateUserEmail($email: String!) {
  updateUser(email: $email) {
    id
    email
  }
}
    `;

export function useUpdateUserEmailMutation() {
  return Urql.useMutation<UpdateUserEmailMutation, UpdateUserEmailMutationVariables>(UpdateUserEmailDocument);
};
export const UpdateUserPhoneDocument = gql`
    mutation UpdateUserPhone($phone: String!) {
  updateUser(phone: $phone) {
    id
    phone
  }
}
    `;

export function useUpdateUserPhoneMutation() {
  return Urql.useMutation<UpdateUserPhoneMutation, UpdateUserPhoneMutationVariables>(UpdateUserPhoneDocument);
};
export const UpdateUserPasswordDocument = gql`
    mutation UpdateUserPassword($password: String!) {
  updateUser(password: $password) {
    id
  }
}
    `;

export function useUpdateUserPasswordMutation() {
  return Urql.useMutation<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(UpdateUserPasswordDocument);
};
export const AddToWishlistDocument = gql`
    mutation AddToWishlist($productId: String!) {
  addToWishlist(productId: $productId) {
    productId
  }
}
    `;

export function useAddToWishlistMutation() {
  return Urql.useMutation<AddToWishlistMutation, AddToWishlistMutationVariables>(AddToWishlistDocument);
};
export const RemoveFromWishlistDocument = gql`
    mutation RemoveFromWishlist($productId: String!) {
  removeFromWishlist(productId: $productId)
}
    `;

export function useRemoveFromWishlistMutation() {
  return Urql.useMutation<RemoveFromWishlistMutation, RemoveFromWishlistMutationVariables>(RemoveFromWishlistDocument);
};
export const IsWishListedDocument = gql`
    query isWishListed($productId: String!) {
  isWishListed(productId: $productId)
}
    `;

export function useIsWishListedQuery(options: Omit<Urql.UseQueryArgs<IsWishListedQueryVariables>, 'query'>) {
  return Urql.useQuery<IsWishListedQuery, IsWishListedQueryVariables>({ query: IsWishListedDocument, ...options });
};