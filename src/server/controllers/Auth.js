import { getUserByEmail } from "../services/userService";
import { signUpService } from "../services/authService";
import passwordCompare from "../utils/passwordCompare";

export const signUpController = async (req, res) => {
  let { name, phone, email, password } = req.body;
  let duplicate = await getUserByEmail(email);
  if (duplicate.status) {
    return res.status(400).json({ message: "Duplicate email!" });
  }
  let result = await signUpService(email, phone, name, password);
  if (result.status) {
    return res.status(200).json(result);
  }
  return res.status(400).json({ message: "Something went wrong" });
};

export const signInController = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = await getUserByEmail(email);
  if (!user.status) {
    return res.status(400).json({ message: user.message });
  }
  user = user.result;
  let result = await passwordCompare(password, user);
  if (result.status) {
    return res.status(200).json({
      token: result.token,
    });
  }
  return res.status(400).json(result.message);
};
