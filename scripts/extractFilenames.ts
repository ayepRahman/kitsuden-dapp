import * as fs from "fs";
import path from "path";

const dir = path.join(process.cwd(), "public", "icons");

console.log(dir);
const files = fs.readdirSync(dir);

console.log("FILES", files);
