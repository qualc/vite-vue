export type ITableAlign = 'left' | 'center' | 'right';
export type ITableType = 'selection' | 'index';

export interface ITableColumn {
  label?: string;
  props?: string;
  slot?: string;
  width?: string | number;
  fixed?: string | boolean;
  type?: ITableType;
  align?: ITableAlign;
  formatter?:
    | ((value: any, row: any, index: number) => any)
    | Record<string | number | boolean, any>; // 格式化函数
}

type ITableConfigTree = {
  defaultExpandAll?: boolean;
  rowKey?: string;
};
export type ITableConfig = {
  columns: ITableColumn[];
  align?: ITableAlign;
  border?: boolean;
  stripe?: boolean;
} & ITableConfigTree;

export interface CTableInstance {
  refresh: () => void;
}
