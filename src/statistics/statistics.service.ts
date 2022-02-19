import { Injectable, HttpStatus, HttpException, Inject } from '@nestjs/common';
import { isDate } from 'class-validator';
import { QueryStatisticsDto } from './dto/filter-statistics.dto';
import { Statistic } from './entities/statistic.entity';
import { getDaysInBetween, incrementDate } from '../utils';
import { globalProviders } from '../globals/global.types';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class StatisticsService {
  constructor(@Inject(globalProviders.prisma) private prisma: PrismaClient) {}
  async create() {
    //
  }

  async findAll(filter: QueryStatisticsDto): Promise<Statistic> {
    // Destruct the from-to date string
    const { from, to } = filter;

    // Check if it's a valid values
    if (!isDate(new Date(from))) {
      throw new HttpException(
        '"from" must be a valid string',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!isDate(new Date(to))) {
      throw new HttpException(
        '"to" must be a valid string',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Convert the date string to Date object
    const fromDate = new Date(from);
    const toDate = new Date(to);

    // Calculate the days in between the dates to determine the "loop" duration
    const daysInBetween = getDaysInBetween(fromDate, toDate);

    // Initial query
    let incomeQuery = `select (select sum("totalPrice") from "Order" where date between '${from}' and '${to}') as "DailyIncome"`;
    let orderCountQueryTotal = `select (select count(*) from "Order") as "allOrders"`;
    let ordersWithCreditQuery = `select (select count(*) from "Order" where not  "creditUsed" = 0) as "allOrders"`;

    for (let index = 0; index < daysInBetween; index++) {
      const fromFiled = incrementDate(fromDate, 1);

      const fromFiledCopy = new Date(fromFiled);

      const toFiled = incrementDate(fromFiledCopy, 1);

      // Manipulate the query
      incomeQuery += `,(select sum("totalPrice") from "Order" where date between '${fromFiled}' and '${toFiled}') as "${fromFiled}"`;
      orderCountQueryTotal += `,(select count(*) from "Order" where date between '${fromFiled}' and '${toFiled}') as"${fromFiled}"`;
      ordersWithCreditQuery += `,(select count(*) from "Order" where not  "creditUsed" = 0 and date between '${fromFiled}' and '${toFiled}') as"${fromFiled}"`;
    }

    // Query the daily income
    const dailyIncome = (await this.prisma.$queryRawUnsafe(incomeQuery))[0];
    const orderCount = (
      await this.prisma.$queryRawUnsafe(orderCountQueryTotal)
    )[0];
    const orderCountWithCredit = (
      await this.prisma.$queryRawUnsafe(ordersWithCreditQuery)
    )[0];

    return { dailyIncome, orderCount, orderCountWithCredit };
  }
}
