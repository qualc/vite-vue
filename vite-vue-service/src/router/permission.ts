import express from "express";
import menuDb from "../db/menu";
import { getUserRedis } from "@/redis/user";

const router = express.Router();

router.get("/menu", function (req, res) {
  const token = req.headers?.authorization?.replace("Bearer ", "");
  const user = getUserRedis().getUserInfo(token!);
  res.send({
    list: user ? menuDb.getMenuListByUserId(user.id) : [],
  });
});
export default router;
