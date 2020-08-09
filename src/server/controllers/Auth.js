import { getUserByEmail } from "../services/userService";
import { signUpService } from "../services/authService";

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
