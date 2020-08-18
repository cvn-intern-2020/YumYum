import {
  getGroupById,
  addMemberToGroup,
  createGroup,
  isAllowedToEditGroup,
  editDishes,
} from "../services/groupService";
import { getUserByEmail, addGroupToUser } from "../services/userService";
import { getManyDishes } from "../services/dishService";
import mongoose from "mongoose";
import { OK_RESPONSE, HANDLED_ERROR_RESPONSE } from "../constants/http";

export const getGroupController = async (req, res) => {
  const groupId = req.params.groupId;
  const userId = req._id;
  let result = await getGroupById(groupId);
  if (!result.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: result.message });
  }
  result = result.result;
  if (result.ownerId == userId) {
    return res.status(OK_RESPONSE).json(result);
  }
  for (const user of result.users) {
    if (userId == user.userId) {
      return res.status(OK_RESPONSE).json(result);
    }
  }
  return res
    .status(HANDLED_ERROR_RESPONSE)
    .json({ message: "You are not a member of this group" });
};

export const addMemberController = async (req, res) => {
  const userEmail = req.body.userEmail;
  const ownerId = req._id;
  const groupId = req.params.groupId;

  const isallowed = await isAllowedToEditGroup(groupId, ownerId);
  if (!isallowed) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: "Not allowed to add member" });
  }

  let user = await getUserByEmail(userEmail);
  if (!user.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: "Email does not exist" });
  }

  user = user.result;
  for (let group of user.groups) {
    if (group.groupId == groupId) {
      return res.status(HANDLED_ERROR_RESPONSE).json({ message: "User has already in group" });
    }
  }

  const addMemberResult = await addMemberToGroup(ownerId, user, groupId);
  if (!addMemberResult.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: addMemberResult.message });
  }

  const addGroupResult = await addGroupToUser(
    user._id,
    groupId,
    addMemberResult.result.name,
    false
  );
  if (!addGroupResult.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: addGroupResult.message });
  }
  return res.status(OK_RESPONSE).json({ message: "Successfully Added" });
};

export const createNewGroupController = async (req, res) => {
  const { name, description } = req.body;
  const ownerId = req._id;
  if (!name) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: "Name field is empty" });
  }
  if (!description) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: "Description field is empty" });
  }
  const { result, status } = await createGroup(name, ownerId, description);
  if (!status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: "something went wrong" });
  }
  return res.status(OK_RESPONSE).json(result);
};

export const editDishesController = async (req, res) => {
  let dishes = req.body.dishes;
  const groupId = req.params.groupId;
  const isAllowedToEdit = await isAllowedToEditGroup(groupId, req._id);
  if (!isAllowedToEdit) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: "Not allowed to edit dishes" });
  }
  dishes = dishes.map((dish) => mongoose.Types.ObjectId(dish));
  const newDishes = await getManyDishes(dishes);
  if (!newDishes.status || newDishes.result.length < dishes.length) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: "dishId does not exist" });
  }
  const editedDishes = await editDishes(groupId, dishes);
  if (!editedDishes.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: editedDishes.message });
  }
  return res.status(OK_RESPONSE).json({ newDishes: newDishes.result });
};
