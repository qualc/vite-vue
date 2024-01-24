export const isPlainObject = (val: any) => {
  return Object.prototype.toString.call(val) === '[object Object]';
};
