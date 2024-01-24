import * as fs from "fs";
import * as path from "path";

export function mkdirFile(dir: string, defaultValue = "") {
  const parse = path.parse(dir);
  mkdirDirectory(parse.dir);
  if (!fs.existsSync(dir)) {
    fs.writeFileSync(dir, defaultValue);
  }
  return dir;
}

export function mkdirDirectory(directory: string) {
  try {
    let isMkdir = fs.existsSync(directory);
    if (!isMkdir) {
      fs.mkdirSync(directory);
    }
  } catch (e) {
    let tempDire = path.join(directory, "../");
    mkdirDirectory(tempDire);
    fs.mkdirSync(directory);
  }
}
