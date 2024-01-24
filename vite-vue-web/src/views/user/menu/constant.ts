import { IMenuItem } from '@/models/menu';

export enum EEditType {
  create = 1,
  edit,
}

export type IEditProps = {
  visible: boolean;
  data?: IMenuItem;
  type: EEditType;
};

export type { IMenuItem };

export enum MenuType {
  // 菜单
  MENU = 'menu',
  // 按钮
  BUTTON = 'button',
}
export const MenuLabelMap = {
  [MenuType.MENU]: '菜单',
  [MenuType.BUTTON]: '按钮',
};

export interface IFormRule {
  name: string;
  path: string;
  type: MenuType;
}
