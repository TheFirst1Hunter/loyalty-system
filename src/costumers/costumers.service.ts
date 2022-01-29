import { Injectable } from '@nestjs/common';
import { Costumer } from '@prisma/client';
import { CreateCostumerDto } from './dto/create-costumer.dto';
import { UpdateCostumerDto } from './dto/update-costumer.dto';
import { QueryCostumerDto } from './dto/filter-costumer.dto';
import { hashPassword } from './costumer.helpers';
import { prisma } from '../../prisma';

@Injectable()
export class CostumersService {
  async create(createCostumerDto: CreateCostumerDto): Promise<Costumer> {
    createCostumerDto.pin = await hashPassword(createCostumerDto.pin);

    const result = await prisma.costumer.create({ data: createCostumerDto });

    return result;
  }

  async findAll(filter: QueryCostumerDto): Promise<Costumer[]> {
    const costumers = await prisma.costumer.findMany({
      skip: filter.skip,
      take: filter.take,
      where: { active: true },
    });

    return costumers;
  }

  async findOne(id: string): Promise<Costumer | null> {
    return await prisma.costumer.findFirst({ where: { id, active: true } });
  }

  async update(
    id: string,
    updateCostumerDto: UpdateCostumerDto,
  ): Promise<Costumer> {
    const newCostumer = await prisma.costumer.update({
      where: { id },
      data: updateCostumerDto,
    });

    return newCostumer;
  }

  async remove(id: string) {
    await prisma.costumer.update({ where: { id }, data: { active: false } });
  }
}
