import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import _ from 'lodash';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { QueryOrderDto } from './dto/filter-order.dto';
import { Order, OrderCostumer } from './entities/order.entity';
import { prisma } from '../../prisma';

@Injectable()
export class OrderService {
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Get the costumer to get his old credit and check if he/she exists
    const entity = await prisma.costumer.findUnique({
      where: { id: createOrderDto.costumerId },
    });

    if (!entity) {
      throw new HttpException(
        'no costumer is registered with this id',
        HttpStatus.NOT_FOUND,
      );
    }

    // If the user did not spend any credit then update his credit score
    if (!createOrderDto.creditUsed || createOrderDto.creditUsed === 0) {
      const credits = createOrderDto.totalPrice * 0.1 + entity.credits;

      await prisma.costumer.update({
        where: { id: createOrderDto.costumerId },
        data: { credits },
      });

      const returnedCredits = createOrderDto.totalPrice * 0.1;

      const data = { ...createOrderDto, returnedCredits };

      return await prisma.order.create({ data });
    }

    // If he did spend
    // Credit spent should be less than the total price
    if (createOrderDto.creditUsed > createOrderDto.totalPrice) {
      throw new HttpException(
        'credit spent should not be more than the total price',
        HttpStatus.BAD_REQUEST,
      );
    }

    // If his credit is the right amount
    createOrderDto.totalPrice -= createOrderDto.creditUsed;

    return await prisma.order.create({ data: createOrderDto });
  }

  async findAll(query: QueryOrderDto): Promise<OrderCostumer[]> {
    const where: Prisma.OrderWhereInput = {
      active: true,
      costumerId: query.costumerId,
    };

    if (query.discounted) {
      where.creditUsed = { gt: 0 };
    }

    const data = await prisma.order.findMany({
      skip: query.skip,
      take: query.take,
      where,
      include: { costumer: { select: { name: true, serial: true } } },
    });

    const newData = [];

    data.forEach((d) => {
      const temp: OrderCostumer = { ...d, costumerName: '', costumerSerial: 0 };

      temp.costumerName = temp.costumer.name;
      temp.costumerSerial = temp.costumer.serial;

      newData.push(_.omit(temp, 'costumer'));
    });

    return newData;
  }

  async findOne(id: string): Promise<Order | null> {
    return await prisma.order.findUnique({ where: { id } });
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await prisma.order.update({ where: { id }, data: updateOrderDto });
  }

  async remove(id: string) {
    const entity = await prisma.order.findUnique({ where: { id } });

    await prisma.order.update({
      where: { id },
      data: { active: !entity.active },
    });

    return `toggled`;
  }
}
