import {
  getDishByUserId,
  createDish,
  deleteDish,
} from "../services/dishService";
import { pullDishFromGroup } from "../services/groupService";

export const getDishByUserIdController = async (req, res) => {
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

export const deleteDishController = async (req, res) => {
  let userId = req._id;
  let dishId = req.params.dishId;
  let deletedDish = await deleteDish(userId, dishId);
  if (!deletedDish.status) {
    return res.status(400).json({ message: deletedDish.message });
  }
  let cascadeDeleteDish = await pullDishFromGroup(dishId);
  return res
    .status(200)
    .json({
      message: `Delete successfully with ${cascadeDeleteDish} groups updated`,
    });
};
