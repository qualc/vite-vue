const DB = require("./data");
const userDB =  require("./user");
const roleDB =  require("./role");

class MenuDb extends DB {
  constructor() {
    super("menu");
  }

  getMenuListByUserId(userId) {
    const user = userDB.getUserById(userId);
    const role = roleDB.getDataByKey(user.roleId);
    const menuIds = role.permission || [];
    const menuList = this.getData().filter((item) => menuIds.includes(item.id));
    return this.#tree(menuList);
  }

  #tree(menuList){
    const map = {};
    const result = [];

    menuList.forEach((item) => {
      map[item.id] = item;
      item.children = [];

      if (item.parentId === 0) {
        result.push(item);
        return;
      }

      if (map[item.parentId]) {
        map[item.parentId].children.push(item);
      }
    });
    return result;
  }
};

module.exports = new MenuDb();