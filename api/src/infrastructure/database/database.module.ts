import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://admin:admin123@localhost:27017')],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
