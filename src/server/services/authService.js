import { createUser } from "./userService";
import passwordHash from "../utils/passwordHash";

export const signUpService = async (email, phone, password, name) => {
  let result = await createUser(email, phone, passwordHash(password), name);
  return result;
};
