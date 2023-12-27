import { http } from "@/utils/http";
import { IMenuList } from "@/models/menu";

export const getMenuList = () => {
 return http.get<IMenuList[]>(`/permission/menu`);
};
