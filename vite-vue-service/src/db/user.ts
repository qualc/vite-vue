import { Role } from "@/model/role";
import { IUserListParams, User } from "@/model/user";
import DB from "./data";
import roleDB from "./role";

type IRoleMap = { [key in number]: Role };
class UserDB extends DB<User> {
  private roleMap: IRoleMap = Object.create(null);
  constructor() {
    super("user");
    roleDB.getData().reduce((obj: IRoleMap, target: Role) => {
      obj[target.id] = target;
      return obj;
    }, this.roleMap);
  }

  getUserById(id: number, filtrate: Array<keyof User> = []) {
    const user = this.getDataByKey(id);
    if (!user) {
      return null;
    }
    if (filtrate.length > 0) {
      filtrate.forEach((key) => delete user[key]);
    }
    return this.format(user);
  }

  getUserByUserName(username: string, filtrate: Array<keyof User> = []) {
    const user = this.getDataByKey(username, "username");
    if (!user) {
      return null;
    }
    if (filtrate.length > 0) {
      filtrate.forEach((key) => delete user[key]);
    }
    return this.format(user);
  }
  getUserList(params: IUserListParams, filtrate: Array<keyof User> = []) {
    const { current = 1, size = 10, username } = params || {};

    const list = this.getData()
      .map((user) => {
        if (filtrate.length > 0) {
          filtrate.forEach((key) => delete user[key]);
        }
        return this.format(user);
      })
      .filter((user) => {
        return username ? user.username === username : true;
      });
    return {
      list: list.slice((current - 1) * size, current * size),
      total: list.length,
    };
  }
  deleteUserById(id: number) {
    return this.deleteDataById(id);
  }
  generateToken() {
    return Math.random().toString(36).substring(2);
  }

  private format(user: User) {
    const newUser = { ...user };
    newUser.roleName = this.roleMap[user.roleId]?.name || "游客";
    return newUser;
  }
}

export default new UserDB();
