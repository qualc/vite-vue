import { Menu } from "@/model/menu";
import DB from "./data";
import userDB from "./user";
import roleDB from "./role";

class MenuDb extends DB<Menu> {
  constructor() {
    super("menu");
  }

  getMenuListByUserId(userId: number) {
    const user = userDB.getUserById(userId);
    if (!user) {
      return [];
    }
    const role = roleDB.getDataByKey(user.roleId);
    if (!role) {
      return [];
    }
    const menuIds = role.permission || [];
    const menuList = this.getData().filter(
      (item) => user.roleId === 1 || menuIds.includes(item.id),
    );
    return this.tree(menuList);
  }

  private tree(menuList: Menu[]) {
    const map: Record<string, Menu> = {};
    const result: Menu[] = [];

    menuList.forEach((item) => {
      map[item.id] = item;
      item.children = [];

      if (item.parentId === 0) {
        result.push(item);
        return;
      }

      if (map[item.parentId]) {
        item.parentName = map[item.parentId].name;
        map[item.parentId].children.push(item);
      }
    });
    return result;
  }
}

export default new MenuDb();
