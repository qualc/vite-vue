import express from "express";
import userDB from "../db/user";
import { HttpCode } from "../constant/http";
import { getUserRedis } from "@/redis/user";

const router = express.Router();

router.post("/login", function (req, res) {
  const user = userDB.getUserByUserName(req.body.username);
  if (user && user.password !== req.body.password) {
    res.sendError("密码错误", HttpCode.InternalServerError);
  } else if (!user) {
    res.sendError("用户不存在");
  } else {
    user.password = "";
    user.token = userDB.generateToken();
    getUserRedis().setUserInfo(user.token, user);
    res.send(user);
  }
});

router.get("/:id", function (req, res) {
  const user = userDB.getUserById(+req.params.id, ["password"]);
  if (req.params.id && user) {
    res.send(user);
  } else {
    res.sendError("No user found", HttpCode.InternalServerError);
  }
});

router.get("/", function (req, res) {
  const { list, total } = userDB.getUserList(req.body, ["password"]);
  const { current, size } = req.body;
  res.send({ list, total, current, size });
});

export default router;
