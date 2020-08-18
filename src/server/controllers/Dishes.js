import {
  getDishByUserId,
  createDish,
  deleteDish,
} from "../services/dishService";
import { pullDishFromGroup } from "../services/groupService";
import { validateDish } from "../utils/validator";

export const getDishByUserIdController = async (req, res) => {
  let userId = req._id;
  let result = await getDishByUserId(userId);
  if (!result.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json(result.message);
  }
  return res.status(OK_RESPONSE).json(result.result);
};

export const createDishController = async (req, res) => {
  let userId = req._id;
  let { name, price } = req.body;
  let validateResult = validateDish(name, price);
  if (!validateResult.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: validateResult.message });
  }
  let createDishResult = await createDish(name, price, userId);
  if (!createDishResult.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: createDishResult.message });
  }
  return res.status(OK_RESPONSE).json(createDishResult.result);
};

export const deleteDishController = async (req, res) => {
  let userId = req._id;
  let dishId = req.params.dishId;
  let deletedDish = await deleteDish(userId, dishId);
  if (!deletedDish.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: deletedDish.message });
  }
  let cascadeDeleteDish = await pullDishFromGroup(dishId);
  return res.status(OK_RESPONSE).json({
    message: `Delete successfully with ${cascadeDeleteDish} groups updated`,
  });
};
