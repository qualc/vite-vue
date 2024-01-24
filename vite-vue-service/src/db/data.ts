import { IListCommon } from "@/model";
import { mkdirFile } from "@/utils/directory";
import * as fs from "fs";
import * as path from "path";

const cwd = __dirname;

export default class DB<T extends { id: number }> {
  private cachePath = "";
  private data: T[] = [];
  private _lastId: number = 0;

  constructor(private model: string) {
    this.formatCachePath();
    this.loadData();
  }
  formatCachePath() {
    this.cachePath = mkdirFile(
      path.join(cwd, "cache", this.model + ".json"),
      "[]",
    );
  }

  loadData() {
    const data = fs.readFileSync(this.cachePath, "utf8");
    this.data = JSON.parse(data || "[]");
  }

  getData(): T[] {
    return JSON.parse(JSON.stringify(this.data));
  }
  getDataList(params: IListCommon) {
    const { current = 1, size = 10 } = params || {};

    const list = this.getData();
    // 条件筛选
    return {
      list: list.slice((current - 1) * size, current * size),
      total: list.length,
    };
  }
  getDataByKey(id: number | string, key = "id"): T | null {
    const item = this.data.find((item) => (item as any)[key] === id);
    return item ? Object.assign({}, item) : null;
  }
  deleteDataById(id: number): T | null {
    const index = this.data.findIndex((item) => item.id === id);
    let item: T[] = [];
    if (index !== -1) {
      item = this.data.splice(index, 1);
    }
    this.setData();
    return item[0];
  }
  updateDataById(id: number, data: T): T | null {
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.data[index] = data;
    }
    this.setData();
    return this.data[index];
  }

  insertData(data: T): T | null {
    data.id = this.nextId;
    this.data.push(data);
    this.setData();
    return data;
  }

  private setData() {
    fs.writeFileSync(this.cachePath, JSON.stringify(this.data));
  }

  private get nextId(): number {
    if (!this._lastId) {
      this._lastId = this.data.length
        ? Math.max(...this.data.map((item) => item.id))
        : 0;
    }
    return ++this._lastId;
  }
}
