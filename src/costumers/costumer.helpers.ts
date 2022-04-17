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

export const minMaxDate = (
  data: Costumer[],
  minDate: Date,
  maxDate: Date,
): Costumer[] => {
  const formattedArray = [];

  for (let index = 0; index < data.length; index++) {
    const { month, day } = getDate(data[index].birthDate.toString());

    // console.debug(data[index].birthDate.toString());
    // console.debug(month);
    // console.debug();
    // console.debug(getDate(maxDate.toString()));

    if (month >= minDate.getMonth() + 1 && month <= maxDate.getMonth() + 1) {
      // if (month == minDate.getMonth() + 1 && month == maxDate.getMonth() + 1) {
      if (
        (day >= minDate.getDate() && month == minDate.getMonth() + 1) ||
        (day <= maxDate.getDate() && month == maxDate.getMonth() + 1)
      ) {
        formattedArray.push(data[index]);
      }

      if (month > minDate.getMonth() + 1 && month < maxDate.getMonth() + 1) {
        formattedArray.push(data[index]);
      }
      // } else if (month != minDate.getMonth() || month != maxDate.getMonth()) {
      //   formattedArray.push(data[index]);
      // }
    }
  }

  return formattedArray;
};
