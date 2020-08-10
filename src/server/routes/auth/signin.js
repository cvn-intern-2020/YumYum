import express from "express";
import { signInController } from "../../controllers/Auth";

const router = express.Router();

router.post(
  "/",
  signInController
  // async (req, res) => {
  //   let email = req.body.email;
  //   let password = req.body.password;
  //   let user = await getUserByEmail(email);
  //   if (!user.status) {
  //     return res.status(400).json({ message: user.message });
  //   }
  //   user = user.result;
  //   let result = await passwordCompare(password, user);
  //   if (result.status) {
  //     return res.status(200).json({
  //       token: result.token,
  //     });
  //   }
  //   return res.status(400).json(result.message);
  // }
);

module.exports = router;
