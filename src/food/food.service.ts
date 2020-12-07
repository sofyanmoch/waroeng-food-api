/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Food } from './interfaces/food.interface';
import { CreateFoodDTO } from './dto/create-food.dto';
import { QueryOptions } from './configs/query-option.config';

@Injectable()
export class FoodService {
  constructor(@InjectModel('Food') private readonly foodModel: Model<Food>) {}

  async getFoods(limit, offset) {
    const foods = await this.foodModel
      .find()
      .skip(Number(offset))
      .limit(Number(limit))
      .exec();
    return { foods, total: foods.length, offset: offset, limit: limit };
  }

  async getFood(foodID): Promise<Food> {
    const food = await this.foodModel.findById(foodID).exec();
    return food;
  }

  async addFood(createFoodDTO: CreateFoodDTO): Promise<Food> {
    const newFood = await new this.foodModel(createFoodDTO);
    return newFood.save();
  }

  async editFood(foodID, createFoodDTO: CreateFoodDTO): Promise<Food> {
    const editFood = await this.foodModel.findByIdAndUpdate(
      foodID,
      createFoodDTO,
      { new: true },
    );
    return editFood;
  }

  async deleteFood(foodID): Promise<any> {
    const deletedFood = await this.foodModel.findByIdAndRemove(foodID);
    return deletedFood;
  }
}
