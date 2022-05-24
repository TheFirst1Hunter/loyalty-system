import { Injectable, HttpStatus, HttpException, Inject } from '@nestjs/common';
import { Costumer, PrismaClient, BDstatus, Prisma } from '@prisma/client';
import { Cron } from '@nestjs/schedule';
import { costumerPasswordQueryResult } from './costumers.types';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { QueryCostumerDto } from './dto/filter-costumer.dto';
import { globalProviders } from '../globals/global.types';
import { prisma } from '../../prisma';

@Injectable()
export class CostumersService {
  constructor(@Inject(globalProviders.prisma) private prisma: PrismaClient) {}

  async create(createCostumerDto: CreateCostumerDto): Promise<Costumer> {
    const result = await this.prisma.costumer.create({
      data: createCostumerDto,
    });

    return result;
  }

  async findAll(filter: QueryCostumerDto): Promise<Costumer[]> {
    // const orderBy: Prisma.CostumerOrderByWithAggregationInput;

    // // const costumers =
    await this.prisma.costumer.findMany({
      skip: filter.skip,
      take: filter.take,
      where: {
        active: true,
        birthDate: { gte: filter.dateMin, lte: filter.dateMax },
        name: { contains: filter.name },
        serial: filter.serial,
      },
      orderBy: [{ birthDate: 'asc' }],
    });

    // Dumbest filter ever
    const select = `SELECT "public"."Costumer"."id", "public"."Costumer"."birthDate", "public"."Costumer"."pin", "public"."Costumer"."serial", "public"."Costumer"."name", "public"."Costumer"."credits", "public"."Costumer"."UID", "public"."Costumer"."phoneNumber", "public"."Costumer"."active", "public"."Costumer"."birthdayStatus" `;

    let where = `where active = true`;

    if (filter.serial) {
      where += ` and serial = '${filter.serial}'`;
    }

    // Deprecated
    // Now the filter works via a reshaping function
    // if (filter.dateMax || filter.dateMax) {
    //   where += ` and "birthDate" between '${filter.dateMin.toISOString()}' and '${filter.dateMax.toISOString()}'`;
    // }

    // Search for users using their names or phone numbers
    if (filter.name) {
      where += ` and (similarity(name,'${filter.name}') > 0.2 or similarity("phoneNumber",'${filter.name}') > 0.2)`;
    }

    // Deprecated
    // if (filter.phoneNumber) {
    // where += ` and similarity("phoneNumber",'${filter.phoneNumber}') > 0.1`;
    // }

    let sort = `"birthDate" ASC`;

    if (filter.sortByCreatedAt) {
      sort = `"createdAt" ${filter.sortByCreatedAt}`;
    }

    const query = ` ${select} from "Costumer" ${where} order by ${sort} limit ${
      filter.take || 10
    } offset ${filter.skip || 0}`;

    const costumers = (await prisma.$queryRawUnsafe(query)) as Costumer[];

    return costumers;
  }

  async findOne(id: string): Promise<Costumer | null> {
    const data = await this.prisma.costumer.findFirst({
      where: { id, active: true },
    });

    if (!data) {
      throw new HttpException('no user found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async findByIds(ids: string[]): Promise<Costumer[]> {
    return await prisma.costumer.findMany({ where: { id: { in: ids } } });
  }

  async update(
    id: string,
    updateCostumerDto: UpdateCostumerDto,
  ): Promise<Costumer> {
    const newCostumer = await this.prisma.costumer.update({
      where: { id },
      data: updateCostumerDto,
    });

    return newCostumer;
  }

  async remove(id: string) {
    await this.prisma.costumer.update({
      where: { id },
      data: { active: false },
    });
  }

  async getCostumerWithPin(phoneNumber, pin): Promise<string> {
    const data = await this.prisma.costumer.findFirst({
      where: { phoneNumber },
    });

    if (!data) {
      return costumerPasswordQueryResult['no user found'];
    }

    return data.pin === pin
      ? `${data.credits}`
      : costumerPasswordQueryResult['wrong password'];
  }

  // Run this function every day at 1 AM
  //'0 1 * * *'
  @Cron('0 1 * * *')
  async setBirthdayFlag() {
    const costumers = await this.prisma.costumer.findMany();

    const currentDate = new Date();

    const today = currentDate.getDate();

    const thisMonth = currentDate.getMonth();

    for (let index = 0; index < costumers.length; index++) {
      const costumerBirthday = costumers[index].birthDate;

      if (
        costumerBirthday.getMonth() == thisMonth + 1 ||
        (costumerBirthday.getMonth() == thisMonth &&
          (costumerBirthday.getDate() == today ||
            costumerBirthday.getDate() == today + 1))
      ) {
        const birthdayStatus: BDstatus =
          costumerBirthday.getMonth() == thisMonth
            ? costumerBirthday.getDate() == today
              ? 'today'
              : 'tomorrow'
            : 'nextMonth';

        await prisma.costumer.update({
          where: { id: costumers[index].id },
          data: {
            birthdayStatus,
          },
        });
      } else {
        await prisma.costumer.update({
          where: { id: costumers[index].id },
          data: {
            birthdayStatus: 'nothing',
          },
        });
      }
    }
  }
}
