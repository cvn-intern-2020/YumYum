import { getUserByEmail } from "../services/userService";
import { signUpService } from "../services/authService";
import passwordCompare from "../utils/passwordCompare";
import { validateRegister } from "../utils/validator";
import { OK_RESPONSE, HANDLED_ERROR_RESPONSE } from "../constants/http";

export const signUpController = async (req, res) => {
  let { name, phone, email, password } = req.body;
  let validateResult = validateRegister(name, phone, email, password);
  if (!validateResult.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: validateResult.message });
  }
  let duplicate = await getUserByEmail(email);
  if (duplicate.status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "Duplicate email!" });
  }
  let { result, status } = await signUpService(email, phone, password, name);
  if (!status) {
    return res
      .status(HANDLED_ERROR_RESPONSE)
      .json({ message: "Something went wrong" });
  }
  return res.status(OK_RESPONSE).json(result);
};

export const signInController = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = await getUserByEmail(email);
  if (!user.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: user.message });
  }
  user = user.result;
  let result = await passwordCompare(password, user);
  if (!result.status) {
    return res.status(HANDLED_ERROR_RESPONSE).json({ message: result.message });
  }
  return res
    .status(OK_RESPONSE)
    .cookie("token", result.token, {
      maxAge: 3600000,
      httpOnly: true,
    })
    .json({
      token: result.token,
    });
};
