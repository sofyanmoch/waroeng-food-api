import {
  Controller,
  Get,
  Req,
  Res,
  HttpStatus,
  Param,
  Post,
  Body,
  Query,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDTO } from './dto/create-food.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('food')
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Get('/')
  async getFoods(@Res() res, @Req() req) {
    // console.log(req.query);
    const offset = !req.query.offset ? '0' : req.query.offset;
    const limit = !req.query.limit ? '5' : req.query.limit;
    const food = await this.foodService.getFoods(limit, offset);
    return res.status(HttpStatus.OK).json(food);
  }

  @Get('/:foodID')
  async getFood(@Res() res, @Param('foodID', new ValidateObjectId()) foodID) {
    const food = await this.foodService.getFood(foodID);
    if (!food) throw new NotFoundException('Food tidak ada!');
    return res.status(HttpStatus.OK).json(food);
  }

  @Post('/add')
  async addFood(@Res() res, @Body() createFoodDTO: CreateFoodDTO) {
    const newFood = await this.foodService.addFood(createFoodDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Add food success',
      food: newFood,
    });
  }

  @Put('/edit/:foodID')
  async editFood(
    @Res() res,
    @Param('foodID', new ValidateObjectId()) foodID,
    @Body() createFoodDTO: CreateFoodDTO,
  ) {
    const editedFood = await this.foodService.editFood(foodID, createFoodDTO);
    if (!editedFood) throw new NotFoundException('Food does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Edit food success',
      food: editedFood,
    });
  }

  @Delete('/delete/:foodID')
  async deleteFood(
    @Res() res,
    @Param('foodID', new ValidateObjectId()) foodID,
  ) {
    const deletedFood = await this.foodService.deleteFood(foodID);
    if (!deletedFood) throw new NotFoundException('Food does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Deleted success',
      food: deletedFood,
    });
  }
}
