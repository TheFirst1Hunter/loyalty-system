import { genSalt, hash } from 'bcrypt';
import _ from 'lodash';
import { Costumer } from './entities/costumer.entity';
import { getDate } from '../utils/date';

export const hashPassword = async (text: string) => {
  const salt = await genSalt(12);
  return await hash(text, salt);
};

export const sortByBirthday = (
  data: Costumer[],
  ascending = true,
  date: Date = new Date(),
) => {
  const thisMonth = date.getMonth() + 1;

  const thisDay = date.getDate();

  // close birthdays by ascending order
  const ddd = [];

  // Birthdays that make it out of the condition
  const farBirthdays = [];

  const farMonths = [];

  const pastDays = [];

  const highlighted = [];

  const notHighland = [];

  data.forEach((d) => {
    const { day, month } = getDate(d.birthDate.toString());

    if (month == thisMonth && day >= thisDay) {
      ddd.push(d);
    } else {
      if (month == thisMonth && day < thisDay) {
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
      getDate(a.birthDate.toString()).day - getDate(b.birthDate.toString()).day
    );
  });

  data.forEach((c) => {
    if (c.birthdayStatus !== 'nothing') {
      highlighted.push(c);
    }
  });

  const unique = [];

  const total = [...highlighted, ...ddd, ...farBirthdays, ...pastDays];

  total.forEach((t) => {
    if (!unique.includes(t)) {
      unique.push(t);
    }
  });

  if (ascending) {
    return unique;
  }

  const descendingSort = [];

  unique.forEach((u) => {
    descendingSort.push(unique.pop());
  });

  return descendingSort;
};
