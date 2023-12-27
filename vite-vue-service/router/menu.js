const router = require("express").Router();
const menuDB = require("../db/menu");

router.get("/list", function (req, res) {
  res.send(menuDB.getData());
});

router.get("/:id", function (req, res) {
  res.send(menuDB.getMenuListByUserId(req.params.id));
});

module.exports = router;
