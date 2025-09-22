import type { CreateReviewDto, Review, UpdateReviewDto } from "@/types";
import { api } from "./api";

export async function getById(id: string): Promise<Review> {
  const response = await api.get(`/review/${id}`);
  return response.data;
}

export async function getByProductId(productId: string): Promise<Review[]> {
  const response = await api.get(`/review/product/${productId}`);
  return response.data;
}

export async function getAverageRating(
  productId: string
): Promise<{ averageRating: number }> {
  const response = await api.get(`/review/average-rating/product/${productId}`);
  return response.data;
}

export async function create(review: CreateReviewDto): Promise<Review> {
  const response = await api.post("/review", review);
  return response.data;
}

export async function update(
  id: string,
  review: UpdateReviewDto
): Promise<Review> {
  const response = await api.put(`/review/${id}`, review);
  return response.data;
}

export async function deleteOne(id: string): Promise<void> {
  await api.delete(`/review/${id}`);
}
