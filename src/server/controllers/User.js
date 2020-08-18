import { getUserById } from "../services/userService";
import { OK_RESPONSE, HANDLED_ERROR_RESPONSE } from "../constants/http";

export const getUserController = async (req, res) => {
  const userId = req._id;
  const result = await getUserById(userId);
  if (!result.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ ...result.message });
  }
  return res.status(OK_RESPONSE).json({ ...result.result, token: req.cookies.token });
};
