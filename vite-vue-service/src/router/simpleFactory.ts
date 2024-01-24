import express from "express";
import menuDb from "../db/menu";
import DB from "@/db/data";
import { HttpCode } from "@/constant/http";

export default function simpleFactory(modalKey: string) {
  const router = express.Router();
  const db = new DB(modalKey);

  router.get("/:id", function (req, res) {
    const modal = db.getDataByKey(+req.params.id);
    if (req.params.id && modal) {
      res.send(modal);
    } else {
      res.sendError("No user found", HttpCode.InternalServerError);
    }
  });

  router.get("/", function (req, res) {
    const { list, total } = db.getDataList(req.body);
    const { current, size } = req.body;
    res.send({ list, total, current, size });
  });

  router.post("/", function (req, res) {
    db.insertData(req.body);
    res.send("ok");
  });

  router.put("/:id", function (req, res) {
    db.updateDataById(+req.params.id, req.body);
    res.send("ok");
  });

  router.delete("/:id", function (req, res) {
    db.deleteDataById(+req.params.id);
    res.send("ok");
  });

  return router;
}
