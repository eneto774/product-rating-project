import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import ProductService from 'src/application/services/product.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/domain/dtos/product.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly _productService: ProductService,
    private readonly _logger: Logger,
  ) {}

  @Post()
  async create(@Body() product: CreateProductDto) {
    return this._productService.create(product);
  }

  @Get()
  async findAll() {
    return this._productService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    }

    return this._productService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() product: UpdateProductDto) {
    if (!id) {
      throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    }

    return this._productService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    }

    return this._productService.delete(id);
  }
}
