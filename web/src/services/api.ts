import axios from "axios";
import type {
  Product,
  Review,
  CreateProductDto,
  UpdateProductDto,
  CreateReviewDto,
  UpdateReviewDto,
} from "../types";

const API_BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productService = {
  async getAll(): Promise<Product[]> {
    const response = await api.get("/product");
    return response.data;
  },

  async getById(id: string): Promise<Product> {
    const response = await api.get(`/product/${id}`);
    return response.data;
  },

  async create(product: CreateProductDto): Promise<Product> {
    const response = await api.post("/product", product);
    return response.data;
  },

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    const response = await api.put(`/product/${id}`, product);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/product/${id}`);
  },
};

export const reviewService = {
  async getById(id: string): Promise<Review> {
    const response = await api.get(`/review/${id}`);
    return response.data;
  },

  async getByProductId(productId: string): Promise<Review[]> {
    const response = await api.get(`/review/product/${productId}`);
    return response.data;
  },

  async getAverageRating(
    productId: string
  ): Promise<{ averageRating: number }> {
    const response = await api.get(
      `/review/average-rating/product/${productId}`
    );
    return response.data;
  },

  async create(review: CreateReviewDto): Promise<Review> {
    const response = await api.post("/review", review);
    return response.data;
  },

  async update(id: string, review: UpdateReviewDto): Promise<Review> {
    const response = await api.put(`/review/${id}`, review);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/review/${id}`);
  },
};
