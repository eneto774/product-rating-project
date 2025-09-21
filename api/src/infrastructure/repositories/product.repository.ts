import { InjectModel } from '@nestjs/mongoose';
import { IProductRepository } from 'src/domain/abstractions/product.repository';
import Product from 'src/domain/entities/Product';
import { ProductEntitySchema } from '../database/schemas/product.schema';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export default class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel(ProductEntitySchema.name)
    private readonly _productModel: Model<ProductEntitySchema>,
    private readonly _logger: Logger,
  ) {}

  async create(product: Product): Promise<Product> {
    try {
      this._logger.log('[ProductRepository:create] - Creating product');

      const createdProduct = new this._productModel(product);

      const result = (await createdProduct.save()) as unknown as Product;

      this._logger.log(
        `[ProductRepository:create] - Product ${result.name} with id: ${result?._id} created successfully.`,
      );
      return result;
    } catch (error) {
      this._logger.error(
        error,
        '[ProductRepository:create] - Failed to create product',
      );
      throw new Error(error?.message);
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      this._logger.log('[ProductRepository:update] - Updating product');

      const updateData = {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
      };

      const updatedProduct = await this._productModel
        .findByIdAndUpdate(product._id, updateData, { new: true })
        .exec();

      if (!updatedProduct) {
        throw new Error(`Product with id ${product._id} not found`);
      }

      this._logger.log(
        `[ProductRepository:update] - Product ${product.name} with id: ${product?._id} updated successfully.`,
      );

      return updatedProduct as unknown as Product;
    } catch (error) {
      this._logger.error(
        error,
        '[ProductRepository:update] - Failed to update product',
      );
      throw new Error(error?.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      this._logger.log('[ProductRepository:delete] - Deleting product');

      await this._productModel.findByIdAndDelete(id).exec();

      this._logger.log('[ProductRepository:delete] - Product deleted');
    } catch (error) {
      this._logger.error(
        error,
        '[ProductRepository:create] - Failed to create product',
      );
      throw new Error(error.message || 'Failed to delete product');
    }
  }

  findAll(): Promise<Product[]> {
    try {
      this._logger.log('[ProductRepository:findAll] - Retrieving all products');

      const products = this._productModel.find().exec();

      this._logger.log('[ProductRepository:findAll] - Products retrieved');
      return products;
    } catch (error) {
      this._logger.error(
        error,
        '[ProductRepository:findAll] - Failed to retrieve products',
      );
      throw new Error(error.message || 'Failed to create product');
    }
  }

  findById(id: string): Promise<Product | null> {
    this._logger.log(
      '[ProductRepository:findAll] - Retrieving product with id: ' + id,
    );

    const product = this._productModel.findById(id).exec();

    this._logger.log('[ProductRepository:findAll] - Product retrieved');
    return product;
  }
}
