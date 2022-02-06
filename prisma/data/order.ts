import faker from '@faker-js/faker';
import { v4 as uuid4 } from 'uuid';
import { prisma } from '..';

export const orders = async (ids: string[]) => {
  for (let index = 0; index < ids.length; index++) {
    for (
      let index = 0;
      index < parseInt(`${(Math.random() * 100) % 10}`);
      index++
    ) {
      const creditUsed = parseInt(`${(Math.random() * 100) % 10}`);
      const totalPrice = faker.datatype.number() * 10000;

      await prisma.order.create({
        data: {
          UID: uuid4(),
          tableNumber: faker.datatype.number() % 30,
          totalPrice,
          costumerId: ids[index],
          active: true,
          date: faker.date.recent(),
          creditUsed,
          returnedCredits: creditUsed ? 0 : totalPrice * 0.1,
          items: faker.random.arrayElements(),
        },
      });
    }
  }
};
