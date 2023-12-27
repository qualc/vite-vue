const router = require("express").Router();
const userDB = require("../db/user");
const { set } = require("../redis");

router.post("/login", function (req, res) {
  const user = userDB.getUserByUserName(req.body.username);
  if (user && user.password !== req.body.password) {
    res.sendError("密码错误");
  } else if (!user) {
    res.sendError("用户不存在");
  } else {
    delete user.password;
    user.token = userDB.generateToken();
    set.set(`user:token:${user.token}`, user);
    res.send(user);
  }
});

router.get("/:id", function (req, res) {
  const user = userDB.getUserById(+req.params.id, ["password"]);
  if (req.params.id && user) {
    res.send(user);
  } else {
    res.sendError("No user found");
  }
});
router.post("/", function (req, res) {
  const { list, total } = userDB.getUserList(req.body, ["password"]);
  const { current, size } = req.body;
  res.send({ list, total, current, size });
});

module.exports = router;
