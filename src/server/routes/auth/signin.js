import express from "express";
import usersModel from "../../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let user = await usersModel.getUserByEmail(email);
  console.log(email);
  console.log(password);
  console.log(user);

  bcrypt.compare(password, user.password).then((isMatch) => {
    if (isMatch) {
      const payload = {
        _id: user._id,
        email: user.email,
      };
      jwt.sign(
        payload,
        "1234567890",
        {
          expiresIn: 3600,
        },
        (err, token) => {
          return res.status(200).json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    } else {
      return res.status(400).json({ message: "Password incorrect" });
    }
  });
});

module.exports = router;
