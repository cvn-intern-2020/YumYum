const convertOderFormat = (dishes) => {
  return dishes.map((dish) => {
    dish.dishName = dish.name;
    delete dish.name;
    dish.dishPrice = dish.price;
    delete dish.price;
    return dish;
  });
};
export default convertOderFormat();
