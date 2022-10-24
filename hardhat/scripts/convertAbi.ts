import * as fs from "fs";
import path from "path";
// artifacts/contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json

const main = async () => {
  try {
    const dir = path.join(process.cwd(), "..", "artifacts");

    const file = fs.readFileSync(
      path.join(dir, "contracts/KitsudenFoxfone.sol/KitsudenFoxfone.json"),
      "utf-8"
    );

    const json = JSON.parse(file);
    const abi = json?.abi || [];
    const abiTs = `export const abi = ${JSON.stringify(abi, null, 2)} as const`;

    fs.writeFileSync(
      path.join(process.cwd(), "..", "contracts", "abi.ts"),
      abiTs
    );

    console.log("Convert Abi succesfully!");
  } catch (error) {
    console.log("ERROR", error);
  }
};

main();
