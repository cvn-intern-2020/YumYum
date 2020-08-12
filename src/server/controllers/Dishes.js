import { getDishByUserId, createDish} from "../services/dishService";
import {  } from "../services/dishService";

export const getDishByUserIdController = async (req, res) => {
  console.log(req);
  let userId = req.params.userId;
  let result = await getDishByUserId(userId);
  if (!result.status) {
    return res.status(400).json(result.message);
  }
  return res.status(200).json(result.result);
};

export const createDishController = async (req, res) => {
  let userId = req._id;
  let { name, price } = req.body;
  let createDishResult = await createDish(name, price, userId);
  if (!createDishResult.status) {
    return res.status(400).json({ message: createDishResult.message });
  }
  return res.status(200).json(createDishResult.result);
};
