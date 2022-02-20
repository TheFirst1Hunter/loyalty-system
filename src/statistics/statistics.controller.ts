import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import { QueryStatisticsDto } from './dto/filter-statistics.dto';
import { ResponseShape } from '../utils';

@ApiBearerAuth()
@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  @ApiQuery({ type: QueryStatisticsDto })
  @Get()
  async findAll(@Query() query: QueryStatisticsDto) {
    const data = await this.statisticsService.findAll(query);
    return new ResponseShape(true, data);
  }
}
