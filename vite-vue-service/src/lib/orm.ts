export default class Orm {
  constructor() {}
  getRepository<T = any>(repository: T) {}
  createQueryBuilder(alias: string) {}
}
