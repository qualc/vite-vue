import { http } from '@/utils/http';
import { IMenuItem } from '@/models/menu';
import { IPaging } from '@/utils/http/types';

export const getMenuList = () => {
  return http.get<IPaging<IMenuItem>>(`/permission/menu`);
};

export const saveMenu = <T>(data: T) => {
  return http.post(`/menu`, data);
};

export const updateMenu = <T>(id: number, data: T) => {
  return http.put(`/menu/${id}`, data);
};

export const deleteMenu = (id: number) => {
  return http.delete(`/menu/${id}`);
};
