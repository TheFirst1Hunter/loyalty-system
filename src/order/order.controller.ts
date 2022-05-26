import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import ChildProcess from 'child_process';
import { ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { QueryOrderDto } from './dto/filter-order.dto';
import { ordersWithFinalPrice } from './order.helper';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseShape } from '../utils';

@ApiBearerAuth()
@ApiTags('order')
@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const data = await this.orderService.create(createOrderDto);

    return new ResponseShape(true, data);
  }

  @ApiQuery({ type: QueryOrderDto })
  @Get()
  async findAll(@Query() query: QueryOrderDto) {
    const data = await this.orderService.findAll(query);

    const newData = ordersWithFinalPrice(data);

    return new ResponseShape(true, newData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.orderService.findOne(id);

    return new ResponseShape(true, data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const data = await this.orderService.update(id, updateOrderDto);

    return new ResponseShape(true, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.orderService.remove(id);
  }

  @Get('/excel')
  async getSheet(@Query() query: QueryOrderDto, @Res() res: Response) {
    // const data = await this.orderService.findAll(query);
    // const forkedChildProcess = ChildProcess.fork('src/utils/excelProcess.mjs');
    // forkedChildProcess.send(data);
    // forkedChildProcess.on('message', () => {
    //   res.download('data.csv');
  }
}
