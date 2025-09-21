import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { type IProductRepository } from 'src/domain/abstractions/product.repository';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/domain/dtos/product.dto';
import Product from 'src/domain/entities/Product';

@Injectable()
export default class ProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly _productRepository: IProductRepository,
    private readonly _logger: Logger,
  ) {}

  async create(requestProduct: CreateProductDto): Promise<Product> {
    if (requestProduct.price <= 0) {
      throw new HttpException(
        'Product price must be greater than zero',
        HttpStatus.BAD_REQUEST,
      );
    }

    const product = new Product();
    product.name = requestProduct.name;
    product.description = requestProduct.description;
    product.price = requestProduct.price;
    product.category = requestProduct.category;
    product.createdAt = new Date();

    return this._productRepository.create({
      ...product,
      createdAt: new Date(),
    });
  }

  async update(id: string, product: UpdateProductDto): Promise<Product> {
    if (id != product._id?.toString()) {
      throw new HttpException('Id mismatch', HttpStatus.BAD_REQUEST);
    }

    const existingProduct = await this._productRepository.findById(id);
    if (!existingProduct) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return this._productRepository.update({ ...existingProduct, ...product });
  }

  async delete(id: string): Promise<void> {
    return this._productRepository.delete(id);
  }

  async findAll(): Promise<Product[]> {
    return await this._productRepository.findAll();
  }

  async findById(id: string): Promise<Product | null> {
    return await this._productRepository.findById(id);
  }
}
