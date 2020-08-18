import {
  getDishByUserId,
  createDish,
  deleteDish,
} from "../services/dishService";
import { pullDishFromGroup } from "../services/groupService";
import { validateDish } from "../utils/validator";
import { OK_RESPONSE, HANDLED_ERROR_RESPONSE } from "../constants/http";

export const getDishByUserIdController = async (req, res) => {
  const userId = req._id;
  const result = await getDishByUserId(userId);
  if (!result.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json(result.message);
  }
  return res.status(OK_RESPONSE).json(result.result);
};

export const createDishController = async (req, res) => {
  const userId = req._id;
  const { name, price } = req.body;
  const validateResult = validateDish(name, price);
  if (!validateResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: validateResult.message });
  }
  const createDishResult = await createDish(name, price, userId);
  if (!createDishResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: createDishResult.message });
  }
  return res.status(OK_RESPONSE).json(createDishResult.result);
};

export const deleteDishController = async (req, res) => {
  const userId = req._id;
  const dishId = req.params.dishId;
  const deletedDish = await deleteDish(userId, dishId);
  if (!deletedDish.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: deletedDish.message });
  }
  const cascadeDeleteDish = await pullDishFromGroup(dishId);
  return res.status(OK_RESPONSE).json({
    message: `Delete successfully with ${cascadeDeleteDish} groups updated`,
  });
};
