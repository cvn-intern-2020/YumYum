import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const passwordCompare = async (password, user) => {
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const payload = {
      _id: user._id,
      email: user.email,
    };
    let token = jwt.sign(payload, "1234567890", {
      expiresIn: 3600,
    });
    return { status: true, token: "Bearer " + token };
  }
  return { status: false, message: "Password incorrect" };
};

export default passwordCompare;
