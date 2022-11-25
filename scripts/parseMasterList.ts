import csv from "csvtojson";
import * as fs from "fs";
import path from "path";

(async () => {
  try {
    const fileName = "kitsuden_master_list";

    const dir = path.join(process.cwd(), "scripts", `${fileName}.csv`);

    const data = await csv().fromFile(dir);

    const mappedData = data.map((ele) => {
      // console.log(ele);

      return `"${ele["0x97FFDB0Bdb081969B7178971DBF335Ae325682B8"]}"`;
    });

    // console.log("mappedData", mappedData);
    console.log("length", mappedData?.length);

    const writeDir = path.join(process.cwd(), "constants", `addresses.ts`);

    const stringData = `export const PROD_WHITE_LIST_ADDRESSES: string[] = [${mappedData}]`;

    fs.writeFileSync(writeDir, stringData);
  } catch (error) {
    console.error(error);
  }
})();
