import { genSalt, hash } from 'bcrypt';
import { Costumer } from './entities/costumer.entity';
import { getDate } from '../utils/date';

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

  const farMonths = [];

  data.forEach((d) => {
    const { day, month } = getDate(d.birthDate.toString());

    console.debug(getDate(d.birthDate.toString()));
    if (month == `${thisMonth}` && day >= `${thisDay}`) {
      ddd.push(d);
    } else {
      // data.sort(function (a, b) {
      //   return a.birthDate.getMonth() - b.birthDate.getMonth();
      // });
      for (let i = 0; i < thisMonth; i++) {}
      farBirthdays.push(d);
    }
  });

  return [...ddd, ...farBirthdays];
};
