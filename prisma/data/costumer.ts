import faker from '@faker-js/faker';
import { v4 as uuid4 } from 'uuid';
import { prisma } from '..';

export const costumers = async (): Promise<string[]> => {
  const ids = [];
  for (let index = 0; index < 100; index++) {
    const costumer = await prisma.costumer.create({
      data: {
        credits: faker.datatype.number(),
        name: `${faker.name.firstName()}-${faker.name.lastName()}`,
        phoneNumber: faker.phone.phoneNumber(),
        pin: '1234',
        UID: uuid4(),
        active: true,
        birthDate: faker.date.past(),
        isHisBirthday: parseInt(`${Math.random()}`) % 2 == 0,
      },
    });

    ids.push(costumer.id);
  }

  return ids;
};
