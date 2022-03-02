import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import { QueryStatisticsDto } from './dto/filter-statistics.dto';
import { ResponseShape } from '../utils';
import { JwtAuthGuard, PermGuard } from '../auth/guards';

@ApiBearerAuth()
@UseGuards(PermGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  @ApiQuery({ type: QueryStatisticsDto })
  @Get('/orders')
  async getOrders(@Query() query: QueryStatisticsDto) {
    const data = await this.statisticsService.getOrders(query);
    return new ResponseShape(true, data);
  }

  @ApiQuery({ type: QueryStatisticsDto })
  @Get('/income')
  async getIncome(@Query() query: QueryStatisticsDto) {
    const data = await this.statisticsService.getIncome(query);
    return new ResponseShape(true, data);
  }
}
