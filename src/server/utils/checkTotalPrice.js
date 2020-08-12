const isTotalPriceCorrect = (order) => {
  let totalPrice = 0;
  for (let orderItem of order.details) {
    totalPrice = totalPrice + orderItem.dishPrice * orderItem.quantity;
  }
  if (order.totalPrice != totalPrice) {
    return false;
  }
  return true;
};

export default isTotalPriceCorrect;
