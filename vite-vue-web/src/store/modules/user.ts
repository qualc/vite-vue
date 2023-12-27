import { defineStore } from "pinia";
import { store } from "..";
import { IUserInfo } from "@/models/user";
import { ILoginParams, login } from "@/api/users";
import { IMenuList } from "@/models/menu";
import { getMenuList } from "@/api/menu";

export interface IUserState {
  userInfo: IUserInfo;
  menuList: IMenuList[];
}

export const useUserStore = defineStore({
  id: "user",
  state: (): IUserState => {
    return {
      userInfo: {
        id: undefined,
        username: "",
        token: "",
      },
      menuList: [],
    };
  },
  actions: {
    async login(params: ILoginParams) {
      const user = await login(params);
      this.setUserInfo(user);
      const menuList = await this.loadMenuList();
      this.setMenuList(menuList);
    },
    async loadMenuList() {
      return getMenuList();
    },
    refreshData(){
      if(this.menuList.length > 0){
        return;
      }
      // 刷新用户信息和菜单列表
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
      this.userInfo = userInfo; 

      const menuList = JSON.parse(localStorage.getItem("menuList") || "[]");
      this.menuList = menuList; 
    },
    setMenuList(menuList: IMenuList[]) {
      this.menuList = menuList;
      localStorage.setItem("menuList", JSON.stringify(menuList));
    },
    setUserInfo(userInfo: IUserInfo) {
      this.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("token", userInfo.token!);
    },
  },
});

export function useAppStoreHook() {
  return useUserStore(store);
}
