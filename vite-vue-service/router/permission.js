const router = require("express").Router();
const menuDb = require("../db/menu");
const { get } = require("../redis/set");

router.get("/menu", function (req, res) {
  const token = req.headers?.authorization.replace("Bearer ", "");
  const user = get(`user:token:${token}`)
  res.send(menuDb.getMenuListByUserId(user.id));
});

module.exports = router;
