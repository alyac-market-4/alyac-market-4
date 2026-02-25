import type { User } from './user';

export interface Product {
  itemName: string;
  price: number;
  link: string;
  itemImage: string;
}

export interface ProductDetail extends Product {
  id: string;
  authorId: string;
  createdAt: string;
  author: User;
}
