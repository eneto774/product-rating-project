import type { CreateProductDto, Product, UpdateProductDto } from "@/types";
import { api } from "./api";

export async function getAll(): Promise<Product[]> {
  const response = await api.get("/product");
  return response.data;
}

export async function getById(id: string): Promise<Product> {
  const response = await api.get(`/product/${id}`);
  return response.data;
}

export async function create(product: CreateProductDto): Promise<Product> {
  const response = await api.post("/product", product);
  return response.data;
}

export async function update(
  id: string,
  product: UpdateProductDto
): Promise<Product> {
  const response = await api.put(`/product/${id}`, product);
  return response.data;
}

export async function deleteOne(id: string): Promise<void> {
  await api.delete(`/product/${id}`);
}
