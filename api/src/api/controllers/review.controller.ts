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
import ReviewService from 'src/application/services/review.service';
import { CreateReviewDto, UpdateReviewDto } from 'src/domain/dtos/review.dto';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly _productService: ReviewService,
    private readonly _logger: Logger,
  ) {}

  @Post()
  async create(@Body() review: CreateReviewDto) {
    return this._productService.create(review);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this._productService.findById(id);
  }
  @Get('product/:id')
  async findByProductId(@Param('id') id: string) {
    return this._productService.findByProductId(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() review: UpdateReviewDto) {
    if (!id) {
      throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    }

    return this._productService.update(id, review);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    }

    return this._productService.delete(id);
  }

  @Get('average-rating/product/:id')
  async getAverageRatingByProductId(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('Id is required', HttpStatus.BAD_REQUEST);
    }

    return this._productService.getAverageRatingByProductId(id);
  }
}
