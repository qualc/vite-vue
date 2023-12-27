const DB = require("./data");
const roleDB = require("./role");

class UserDB extends DB {
  #roleMap = {};
  constructor() {
    super("user");
    const roleMap = {};
    roleDB.getData().reduce((obj, target) => {
      obj[target.id] = target;
      return obj;
    }, roleMap);
    this.#roleMap = roleMap;
  }

  getUserById(id, filtrate = []) {
    const user = this.getDataByKey(id);
    if (filtrate.length > 0) {
      filtrate.forEach((key) => delete user[key]);
    }
    return this.#format(user);
  }

  getUserByUserName(username, filtrate = []) {
    const user = this.getDataByKey(username, "username");
    if (filtrate.length > 0) {
      filtrate.forEach((key) => delete user[key]);
    }
    return this.#format(user);
  }
  getUserList(params = {}, filtrate = []) {
    const { current = 1, size = 10, username } = params;
    const list = this.getData()
      .map((user) => {
        if (filtrate.length > 0) {
          filtrate.forEach((key) => delete user[key]);
        }
        return this.#format(user);
      })
      .filter((user) => {
        return username ? user.username === username : true;
      });
    return {
      list: list.slice((current - 1) * size, current * size),
      total: list.length,
    };
  }
  deleteUserById(id) {
    return this.deleteDataById(id);
  }
  generateToken() {
    return Math.random().toString(36).substring(2);
  }

  #format(user) {
    const isArray = Array.isArray(user);
    const formatItem = (item) => {
      item.roleName = this.#roleMap[item.roleId]?.name || "游客";
      return item;
    };

    return isArray ? user.map(formatItem) : formatItem(user);
  }
}

module.exports = new UserDB();
