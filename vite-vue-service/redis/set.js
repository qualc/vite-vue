const hashMap = {};

exports.set = (key, value, expire) => {
  hashMap[key] = {
    value,
    ttl: expire ? Date.now() + expire : null,
  };
};

exports.get = (key) => {
  const { value, ttl } = hashMap[key];
  if (ttl && Date.now() > ttl) {
    // 过期了
    delete hashMap[key];
    return null;
  }
  return value;
};

exports.del = (key) => {
  delete hashMap[key];
};

exports.clear = () => {
  hashMap = {};
};

exports.getAll = () => {
  return hashMap;
};

exports.getExpire = () => {
  const now = Date.now();
  const expire = Object.keys(hashMap).filter((key) => {
    const { ttl } = hashMap[key];
    return ttl && now > ttl;
  });
  return expire;
};

exports.getExpireKeys = () => {
  const now = Date.now();
  const expire = Object.keys(hashMap).filter((key) => {
    const { ttl } = hashMap[key];
    return ttl && now > ttl;
  });
  return expire.map((key) => {
    return hashMap[key];
  });
};

exports.getExpireKeysAndValues = () => {
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

exports.clearExpire = () => {
  const now = Date.now();
  const expire = Object.keys(hashMap).filter((key) => {
    const { ttl } = hashMap[key];
    return ttl && now > ttl;
  });
  expire.forEach((key) => {
    delete hashMap[key];
  });
};

exports.expire = (key, ttl) => {
  hashMap[key] = {
    value: hashMap[key],
    ttl: Date.now() + ttl,
  };
};
exports.checkExpire = (key) => {
  const { ttl } = hashMap[key];
  return ttl && Date.now() > ttl;
};
