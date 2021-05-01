import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';


export default function calculateOrderTotal(order, pizzas) {
  const total = order.reduce((onGoingTotal, singleOrder) => {
    const pizza = pizzas.find(pizza => pizza.id === singleOrder.id);
    return onGoingTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
  return formatMoney(total);
}
