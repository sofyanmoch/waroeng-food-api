import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodModule } from './food/food.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/food-api', {
      useNewUrlParser: true,
    }),
    FoodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
