import { reactive } from 'vue';

interface IPagination {
  current: number;
  size: number;
  total: number;
  sizeOption: Array<number>;
  // methods
  onChangePage: (currentValue: number) => void;
  onChangeSize: (sizeValue: number) => void;
  onReset: () => void;
}
type IUsePaginationReturn = [
  pagination: IPagination,
  onChangePage: IPagination['onChangePage'],
  onChangeSize: IPagination['onChangeSize'],
  onReset: IPagination['onReset'],
];

export default (
  callback: () => void,
  sizeOption: Array<number> = [10, 20, 50, 100, 200],
): IUsePaginationReturn => {
  const pagination = reactive<IPagination>({
    current: 1,
    size: 10,
    total: 0,
    sizeOption,

    onChangePage(currentValue: number) {
      pagination.current = currentValue;
      return callback();
    },
    onChangeSize(sizeValue: number) {
      pagination.size = sizeValue;
      return callback();
    },
    onReset() {
      pagination.current = 1;
      pagination.total = 0;
      pagination.size = sizeOption[0];
    },
  });

  const onChangePage = (currentValue: number) => {
    pagination.current = currentValue;
    return callback();
  };

  const onChangeSize = (sizeValue: number) => {
    pagination.size = sizeValue;
    return callback();
  };

  const onReset = () => {
    pagination.current = 1;
    pagination.total = 0;
    pagination.size = sizeOption[0];
  };

  return [pagination, onChangePage, onChangeSize, onReset];
};
