export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  inStock: boolean,
  isFavorite: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
