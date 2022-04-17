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
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CostumersService } from './costumers.service';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { QueryCostumerDto } from './dto/filter-costumer.dto';
import { SmsDTO } from './dto/sms.dto';
import { sortByBirthday, minMaxDate } from './costumer.helpers';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseShape, sendSMS, convertToInternational } from '../utils';

@ApiBearerAuth()
@ApiTags('costumer')
@Controller('costumers')
export class CostumersController {
  constructor(private readonly costumersService: CostumersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCostumerDto: CreateCostumerDto) {
    const data = await this.costumersService.create(createCostumerDto);

    return new ResponseShape(true, data);
  }

  @ApiQuery({ type: QueryCostumerDto })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: QueryCostumerDto) {
    let data = await this.costumersService.findAll(query);

    if (query.nearestBirthday) {
      data = sortByBirthday(data, query.ascending);
    }

    if (query.dateMax || query.dateMin) {
      data = minMaxDate(data, query.dateMin, query.dateMax);
    }

    return new ResponseShape(true, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.costumersService.findOne(id);

    return new ResponseShape(true, data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCostumerDto: UpdateCostumerDto,
  ) {
    const data = await this.costumersService.update(id, updateCostumerDto);
    return new ResponseShape(true, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.costumersService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/sms')
  async sendSms(@Body() smsDto: SmsDTO) {
    const costumers = await this.costumersService.findByIds(smsDto.ids);

    const phoneNumbers = costumers.map((c) =>
      convertToInternational(c.phoneNumber),
    );

    try {
      await sendSMS(phoneNumbers, smsDto.body);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return new ResponseShape(true, 'messages sent!');
  }

  @Post('/webhooks')
  async webhooks(@Body() body: any) {
    const { from, to, Body } = body;
  }
}
