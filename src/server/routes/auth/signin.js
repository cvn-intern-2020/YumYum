import express from "express";
import usersModel from "../../models/users";

const router = express.Router();

router.post("/", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  return res.status(200).json(await usersModel.getUserByEmail(email));
});

module.exports = router;
