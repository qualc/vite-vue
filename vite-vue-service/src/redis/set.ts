type IHashSetValue<T> = {
  ttl: number | null;
  value: T;
};

let hashMap: { [key: string]: IHashSetValue<any> } = {};

export const set = <T = any>(key: string, value: T, expire?: number) => {
  hashMap[key] = {
    value,
    ttl: expire ? Date.now() + expire : null,
  };
};

export const get = <T = any>(key: string): T | null => {
  const { value, ttl } = hashMap[key];
  if (ttl && Date.now() > ttl) {
    // 过期了
    delete hashMap[key];
    return null;
  }
  return value;
};

export const del = (key: string) => {
  delete hashMap[key];
};

export const clear = () => {
  hashMap = {};
};

export const getAll = () => {
  return hashMap;
};

export const getExpire = () => {
  const now = Date.now();
  const expire = Object.keys(hashMap).filter((key) => {
    const { ttl } = hashMap[key];
    return ttl && now > ttl;
  });
  return expire;
};

export const getExpireKeys = () => {
  const now = Date.now();
  const expire = Object.keys(hashMap).filter((key) => {
    const { ttl } = hashMap[key];
    return ttl && now > ttl;
  });
  return expire.map((key) => {
    return hashMap[key];
  });
};

export const getExpireKeysAndValues = () => {
  const now = Date.now();
  const expire = Object.keys(hashMap).filter((key) => {
    const { ttl } = hashMap[key];
    return ttl && now > ttl;
  });
  return expire.map((key) => {
    return {
      key,
      value: hashMap[key],
    };
  });
};

export const clearExpire = () => {
  const now = Date.now();
  const expire = Object.keys(hashMap).filter((key) => {
    const { ttl } = hashMap[key];
    return ttl && now > ttl;
  });
  expire.forEach((key) => {
    delete hashMap[key];
  });
};

export const expire = (key: string, ttl: number) => {
  hashMap[key] = {
    value: hashMap[key],
    ttl: Date.now() + ttl,
  };
};
export const checkExpire = (key: string) => {
  const { ttl } = hashMap[key];
  return ttl && Date.now() > ttl;
};
