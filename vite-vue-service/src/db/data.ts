import * as fs from "fs";
import * as path from "path";

const cwd = __dirname;

const createDataFile = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.writeFileSync(dir, "[]");
  }
  return dir;
};

export default class DB<T extends { id: number }> {
  cachePath = "";
  data: T[] = [];
  constructor(private model: string) {
    this.formatCachePath();
    this.loadData();
  }
  formatCachePath() {
    this.cachePath = createDataFile(
      path.join(cwd, "cache", this.model + ".json"),
    );
  }

  loadData() {
    const data = fs.readFileSync(this.cachePath, "utf8");
    this.data = JSON.parse(data);
  }

  getData(): T[] {
    return this.data;
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

  setData() {
    fs.writeFileSync(this.cachePath, JSON.stringify(this.data));
  }
}
