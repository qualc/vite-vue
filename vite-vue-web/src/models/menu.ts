
export enum MenuType {
  Menu = 0,
  Button = 1
}
export interface IMenuList {
  id: number;
  level: number;
  name:string;
  parentId: number;
  path:string;
  sort: number;
  type: MenuType;
  children: IMenuList[];
}