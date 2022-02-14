import { Injectable, HttpStatus, HttpException, Inject } from '@nestjs/common';
import { Costumer , PrismaClient } from '@prisma/client';
import { Cron } from '@nestjs/schedule';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { QueryCostumerDto } from './dto/filter-costumer.dto';
import { hashPassword } from './costumer.helpers';
import { globalProviders } from '../globals/global.types';

@Injectable()
export class CostumersService {
  constructor(@Inject(globalProviders.prisma) private prisma: PrismaClient){ }

  async create(createCostumerDto: CreateCostumerDto): Promise<Costumer> {
    createCostumerDto.pin = await hashPassword(createCostumerDto.pin);

    const result = await this.prisma.costumer.create({ data: createCostumerDto });

    return result;
  }

  async findAll(filter: QueryCostumerDto): Promise<Costumer[]> {
    const costumers = await this.prisma.costumer.findMany({
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
    await this.prisma.costumer.update({ where: { id }, data: { active: false } });
  }

  // Run this function every day at 1 AM
  @Cron('0 1 * * *')
  async setBirthdayFlag() {
    const costumers = await this.prisma.costumer.findMany();

    const currentDate = new Date();

    const today = currentDate.getDate();

    const thisMonth = currentDate.getMonth();

    for (let index = 0; index < costumers.length; index++) {
      const costumerBirthday = costumers[index].birthDate;

      if (
        costumerBirthday.getMonth() === thisMonth &&
        (costumerBirthday.getDate() === today ||
          costumerBirthday.getDate() === today + 1)
      ) {
        await this.prisma.costumer.update({
          where: { id: costumers[index].id },
          data: { isHisBirthday: true },
        });
      } else {
        await this.prisma.costumer.update({
          where: { id: costumers[index].id },
          data: { isHisBirthday: false },
        });
      }
    }
  }
}
