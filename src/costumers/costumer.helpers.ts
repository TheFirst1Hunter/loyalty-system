import { genSalt, hash } from 'bcrypt';
import { Costumer } from './entities/costumer.entity';

export const hashPassword = async (text: string) => {
  const salt = await genSalt(12);
  return await hash(text, salt);
};

export const sortByBirthday = (data: Costumer[], date: Date = new Date()) => {
  const thisMonth = date.getMonth();

  const thisDay = date.getDate();

  // close birthdays by ascending order
  const ddd = [];

  // Birthdays that make it out of the condition
  const farBirthdays = [];

  data.forEach((d) => {
    if (
      d.birthDate.getMonth() > thisMonth ||
      (d.birthDate.getMonth() == thisMonth && d.birthDate.getDate() >= thisDay)
    ) {
      ddd.push(d);
    } else {
      farBirthdays.push(d);
    }
  });

  return [...ddd, ...farBirthdays];
};
