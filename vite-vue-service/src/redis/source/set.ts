type IHashSetValue<T> = {
  ttl: number | null;
  value: T;
};

class RedisSet {
  private hashMap: { [key: string]: IHashSetValue<any> } = {};
  set<T = any>(key: string, value: T, expire?: number) {
    this.hashMap[key] = {
      value,
      ttl: expire ? Date.now() + expire : null,
    };
  }
  get<T = any>(key: string): T | null {
    const { value, ttl } = this.hashMap[key] || {};
    if (ttl && Date.now() > ttl) {
      // 过期了
      delete this.hashMap[key];
      return null;
    }
    return value;
  }
  delete(key: string) {
    return this.hashMap[key];
  }
  clear(key: string) {
    this.hashMap = {};
  }
  getAll() {
    return this.hashMap;
  }
  getExpire() {
    const now = Date.now();
    const expire = Object.keys(this.hashMap).filter((key) => {
      const { ttl } = this.hashMap[key];
      return ttl && now > ttl;
    });
    return expire;
  }
  getExpireKeys() {
    const now = Date.now();
    const expire = Object.keys(this.hashMap).filter((key) => {
      const { ttl } = this.hashMap[key];
      return ttl && now > ttl;
    });
    return expire.map((key) => {
      return this.hashMap[key];
    });
  }
  getExpireKeysAndValues() {
    const now = Date.now();
    const expire = Object.keys(this.hashMap).filter((key) => {
      const { ttl } = this.hashMap[key];
      return ttl && now > ttl;
    });
    return expire.map((key) => {
      return {
        key,
        value: this.hashMap[key],
      };
    });
  }
  clearExpire() {
    const now = Date.now();
    const expire = Object.keys(this.hashMap).filter((key) => {
      const { ttl } = this.hashMap[key];
      return ttl && now > ttl;
    });
    expire.forEach((key) => {
      delete this.hashMap[key];
    });
  }
  expire(key: string, ttl: number) {
    this.hashMap[key] = {
      value: this.hashMap[key],
      ttl: Date.now() + ttl,
    };
  }
  checkExpire(key: string) {
    const { ttl } = this.hashMap[key];
    return ttl && Date.now() > ttl;
  }
}

const instance: RedisSet = new RedisSet();
export function getRedisSet() {
  return instance;
}
