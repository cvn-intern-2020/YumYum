import express from "express";
import userModel from "../../models/users";
import passwordHash from "../../utils/passwordHash";

const router = express.Router();

router.post("/", async (req, res) => {
  let { name, phone, email, password } = req.body;

  return res
    .status(200)
    .json(
      await userModel.createUser(name, phone, email, passwordHash(password))
    );
});

module.exports = router;
