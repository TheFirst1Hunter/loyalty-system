import { orders, costumers } from './data';

const main = async () => {
  const ids = await costumers();

  await orders(ids);

  console.log('seeded 🌱');
};

main();
