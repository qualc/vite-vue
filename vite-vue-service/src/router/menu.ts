import express from "express";
import menuDB from "../db/menu";
import { isNumber } from "@/utils/valid";

const router = express.Router();

router.get("/list", function (req, res) {
  res.send(menuDB.getData());
});

router.get("/:id", function (req, res) {
  res.send(menuDB.getMenuListByUserId(+req.params.id));
});

router.post("/", function (req, res) {
  res.send(menuDB.insertData(req.body));
});
router.put("/:id", function (req, res) {
  if (!isNumber(req.params.id)) {
    return res.sendError("id必须是数字");
  }
  res.send(menuDB.updateDataById(+req.params.id, req.body));
});
router.delete("/:id", function (req, res) {
  if (!isNumber(req.params.id)) {
    return res.sendError("id必须是数字");
  }
  res.send(menuDB.deleteDataById(+req.params.id));
});
export default router;
