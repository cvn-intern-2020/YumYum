import { getUserById } from "../services/userService";

export const getUserController = async (req, res) => {
  let userId = req._id;
  let result = await getUserById(userId);
  if (!result.status) {
    return res.status(400).json(result.message);
  }
  return res.status(200).json(result.result);
};
