const fs = require("fs");
const path = require("path");

const cwd = __dirname;

const createDataFile = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.writeFileSync(dir, "[]");
  }
  return dir;
};

module.exports = class DB {
  model = "";
  cachePath = "";
  data = [];
  constructor(model) {
    this.model = model;
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

  getData() {
    return this.data;
  }

  getDataByKey(id, key = "id") {
    const item = this.data.find((item) => item[key] === id);
    return item ? { ...item } : null;
  }
  deleteDataById(id) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.data.splice(index, 1);
    }
    this.setData();
    return this.data[index];
  }
  updateDataById(id, data) {
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
};
