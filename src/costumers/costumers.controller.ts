import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { CostumersService } from './costumers.service';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { QueryCostumerDto } from './dto/filter-costumer.dto';
import { sortByBirthday } from './costumer.helpers';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseShape } from '../utils';

@UseGuards(JwtAuthGuard)
@Controller('costumers')
export class CostumersController {
  constructor(private readonly costumersService: CostumersService) {}

  @Post()
  async create(@Body() createCostumerDto: CreateCostumerDto) {
    const data = await this.costumersService.create(createCostumerDto);

    return new ResponseShape(true, data);
  }

  @Get()
  async findAll(@Query() query: QueryCostumerDto) {
    let data = await this.costumersService.findAll(query);

    if (query.nearestBirthday) {
      data = sortByBirthday(data);
    }

    return new ResponseShape(true, data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.costumersService.findOne(id);

    return new ResponseShape(true, data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCostumerDto: UpdateCostumerDto,
  ) {
    const data = await this.costumersService.update(id, updateCostumerDto);
    return new ResponseShape(true, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costumersService.remove(id);
  }
}
