/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
// import { Document } from 'mongoose';

export interface Food extends Document {
  readonly title: string;
  readonly description: string;
  readonly price: number;
}
