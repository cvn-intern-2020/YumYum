import express from "express";

import {
  getGroupController,
  addMemberController,
  createNewGroupController,
  editDishesController,
} from "../controllers/Group";

const router = express.Router();

router.get("/:groupId", getGroupController);

router.post("/:groupId/add/member", addMemberController);

router.post("/new", createNewGroupController);

router.post("/:groupId/dishes", editDishesController);

module.exports = router;
