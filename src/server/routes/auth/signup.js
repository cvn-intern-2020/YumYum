import express from "express";
import userModel from "../../models/users";
import passwordHash from "../../utils/passwordHash";

const router = express.Router();

router.post("/", async (req, res) => {
  let { name, phone, email, password } = req.body;
  let duplicate = await userModel.getUserByEmail(email);
  if (duplicate != null) {
    return res.status(400).json({ message: "Duplicate email!" });
  }
  let result = await userModel.createUser(
    name,
    phone,
    email,
    passwordHash(password)
  );
  return res.status(200).json(result);
});

module.exports = router;
