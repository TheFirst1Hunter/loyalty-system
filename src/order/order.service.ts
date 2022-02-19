import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { QueryOrderDto } from './dto/filter-order.dto';
import { Order, OrderCostumer } from './entities/order.entity';
import { globalProviders } from '../globals/global.types';

@Injectable()
export class OrderService {
  constructor(@Inject(globalProviders.prisma) private prisma: PrismaClient){ }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Get the costumer to get his old credit and check if he/she exists
    const entity = await this.prisma.costumer.findUnique({
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

      await this.prisma.costumer.update({
        where: { id: createOrderDto.costumerId },
        data: { credits },
      });

      const returnedCredits = createOrderDto.totalPrice * 0.1;

      const data = { ...createOrderDto, returnedCredits };

      return await this.prisma.order.create({ data });
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

    return await this.prisma.order.create({ data: createOrderDto });
  }

  async findAll(query: QueryOrderDto): Promise<Order[]> {
    const where: Prisma.OrderWhereInput = {
      active: true,
      costumerId: query.costumerId,
      // The most annoying search, it'll try to match the UID with the name sent by s1mply and if it couldn't it'll try the slow "contains" query
      OR: [
        {
          UID: query.name,
        },
        {
          costumer: { name: { contains: query.name } },
        },
      ],
    };

    if (query.discounted) {
      where.creditUsed = { gt: 0 };
    }

    const include: Prisma.OrderInclude = {
      costumer: { select: { name: true } },
    };

    const data = await this.prisma.order.findMany({
      skip: query.skip,
      take: query.take,
      where,
      include,
    });

    return data;
  }

  async findOne(id: string): Promise<OrderCostumer | null> {
    const data = await this.prisma.order.findUnique({
      where: { id },
      include: { costumer: { select: { name: true, serial: true } } },
    });

    const newData: OrderCostumer = {
      ...data,
      costumerName: '',
      costumerSerial: '0',
    };

    newData.costumerName = data.costumer.name;
    newData.costumerSerial = data.costumer.serial;

    return newData;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.prisma.order.update({ where: { id }, data: updateOrderDto });
  }

  async remove(id: string) {
    const entity = await this.prisma.order.findUnique({ where: { id } });

    await this.prisma.order.update({
      where: { id },
      data: { active: !entity.active },
    });

    return `toggled`;
  }
}
