export enum MenuType {
  Menu = 0,
  Button = 1,
}
export interface IMenuItem {
  id: number;
  level: number;
  name: string;
  parentId: number;
  parentName: string;
  path: string;
  sort: number;
  type: MenuType;
  children: IMenuList;
}
export type IMenuList = IMenuItem[];
