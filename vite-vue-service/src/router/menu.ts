import express from "express";
import menuDB from "../db/menu";

const router = express.Router();

router.get("/list", function (req, res) {
  res.send(menuDB.getData());
});

router.get("/:id", function (req, res) {
  res.send(menuDB.getMenuListByUserId(+req.params.id));
});

export default router;
