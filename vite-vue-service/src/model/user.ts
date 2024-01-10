import * as user from "../db/cache/user.json";
import { IListCommon } from ".";

export type User = (typeof user)[0] & {
  roleName: string;
  token: string;
  password?: string;
};

export interface IUserListParams extends IListCommon {
  username?: string;
}
