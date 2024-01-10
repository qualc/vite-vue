import express from "express";
import menuDb from "../db/menu";
import { get } from "../redis/set";

const router = express.Router();

router.get("/menu", function (req, res) {
  const token = req.headers?.authorization?.replace("Bearer ", "");
  const user = get(`user:token:${token}`);
  res.send(menuDb.getMenuListByUserId(user.id));
});
export default router;
