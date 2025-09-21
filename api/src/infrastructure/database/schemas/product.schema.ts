import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductEntitySchema>;

@Schema({ collection: 'products' })
export class ProductEntitySchema {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({ index: true })
  category: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntitySchema);
