const user = require("./user");
const menu = require("./menu");
const permission = require("./permission");

module.exports = (app) => {
  app.use("/permission", permission);
  app.use("/user", user);
  app.use("/menu", menu);
};
