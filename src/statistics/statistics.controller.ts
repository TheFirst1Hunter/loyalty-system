import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { QueryStatisticsDto } from './dto/filter-statistics.dto';
import { ResponseShape } from '../utils';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  @Get()
  async findAll(@Query() query: QueryStatisticsDto) {
    const data = await this.statisticsService.findAll(query);
    return new ResponseShape(true, data);
  }
}
