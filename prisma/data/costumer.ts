import faker from '@faker-js/faker';
import { v4 as uuid4 } from 'uuid';
import { BDstatus } from '@prisma/client';
import { prisma } from '..';

export const costumers = async (): Promise<string[]> => {
  const ids = [];
  const status = ['today', 'tomorrow', 'nextMonth', 'nothing'];
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
        birthdayStatus: status[
          parseInt(`${Math.random()}`) % status.length
        ] as BDstatus,
      },
    });

    ids.push(costumer.id);
  }

  return ids;
};
