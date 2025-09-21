/// <reference types="vite/client" />

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface Review {
  _id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface UpdateProductDto {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface CreateReviewDto {
  productId: string;
  author: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewDto {
  _id: string;
  rating: number;
  comment: string;
}
