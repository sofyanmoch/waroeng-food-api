/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const FoodSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number
});
