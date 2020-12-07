import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodSchema } from './schemas/food.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Food',
        schema: FoodSchema,
      },
    ]),
  ],
  providers: [FoodService],
  controllers: [FoodController],
})
export class FoodModule {}
