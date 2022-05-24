import { Order } from './entities/order.entity';
import { ReshapedOrder } from './entities/reshapedOrder.entity';

export const ordersWithFinalPrice = (orders: Order[]): ReshapedOrder[] => {
  const ordersWithFinalPrice: ReshapedOrder[] = [];

  orders.forEach((o) => {
    ordersWithFinalPrice.push({
      ...o,
      finalPrice: o.totalPrice - o.creditUsed,
    });
  });

  return ordersWithFinalPrice;
};
