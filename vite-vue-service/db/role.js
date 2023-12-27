const DB = require("./data");

class RoleDb extends DB {
  constructor() {
    super("role");
  }
};

module.exports = new RoleDb();