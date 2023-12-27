export enum ISearchType {
  input = 'input',
  select = 'select',
  datePicker = 'datePicker',
  rangePicker = 'rangePicker',
}

export interface IBaseProps {
  props: string;
  type: ISearchType;
  label?: string;
  width?: string | number;
  placeholder?: string;
}

export interface ISelectOption {
  label: string;
  value: string | number | boolean;
}

export interface ISelectProps extends IBaseProps {
  type: ISearchType.select;
  options: ISelectOption[];
  defaultValue?: string | number | boolean;
}
export interface IDatePickerProps extends IBaseProps {
  type: ISearchType.datePicker;
  defaultValue?: string;
}
export interface IRangePickerProps extends IBaseProps {
  type: ISearchType.rangePicker;
  defaultValue?: [string, string];
  rangeSeparator?: string;
}
export interface IInputProps extends IBaseProps {
  type: ISearchType.input;
  defaultValue?: string;
}

export type ISearchConfig = (
  | ISelectProps
  | IDatePickerProps
  | IRangePickerProps
  | IInputProps
)[];
