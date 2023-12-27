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
}

export interface ITableConfig {
  columns: ITableColumn[];
  align?: ITableAlign;
  border?: boolean;
  stripe?: boolean;
}
