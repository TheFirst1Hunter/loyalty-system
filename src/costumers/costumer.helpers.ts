import { genSalt, hash } from 'bcrypt';
import { Costumer } from './entities/costumer.entity';
import { getDate } from '../utils/date';

export const hashPassword = async (text: string) => {
  const salt = await genSalt(12);
  return await hash(text, salt);
};

export const sortByBirthday = (data: Costumer[], date: Date = new Date()) => {
  const thisMonth = date.getMonth() + 1;

  const thisDay = date.getDate();

  // close birthdays by ascending order
  const ddd = [];

  // Birthdays that make it out of the condition
  const farBirthdays = [];

  const farMonths = [];

  const pastDays = [];

  data.forEach((d) => {
    const { day, month } = getDate(d.birthDate.toString());

    console.debug(day);
    console.debug(thisMonth == month);
    if (month == thisMonth && day >= thisDay) {
      ddd.push(d);
    } else {
      if (month == thisMonth && day < thisDay) {
        console.debug(d)
        pastDays.push(d);
      } else {
        farBirthdays.push(d);
      }
    }
  });

  farBirthdays.sort(function (a, b) {
    return (
      getDate(a.birthDate.toString()).month -
      getDate(b.birthDate.toString()).month
    );
  });

  farBirthdays.sort(function (a, b) {
    return (
      getDate(a.birthDate.toString()).day -
      getDate(b.birthDate.toString()).day
    );
  });

  return [...ddd, ...farBirthdays, ...pastDays];
};
