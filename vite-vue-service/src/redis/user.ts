import { User } from "../model/user";
import { getRedisSet } from "./source/set";

class UserCache {
  readonly USER_TOKEN_KEY = `USER:TOKEN:KEY:`;

  setUserInfo(token: string, userInfo: User) {
    getRedisSet().set(`${this.USER_TOKEN_KEY}${token}`, userInfo);
  }

  getUserInfo(token: string): User | null {
    return getRedisSet().get(`${this.USER_TOKEN_KEY}${token}`);
  }
}

const instance: UserCache = new UserCache();
export function getUserRedis() {
  return instance;
}
