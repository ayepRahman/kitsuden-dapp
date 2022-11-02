import csv from "csvtojson";
import * as fs from "fs";
import path from "path";

(async () => {
  try {
    const revealName = "reveal";
    const preRevealName = "pre-reveal";
    const testRevealName = "test-reveal";

    const revealDir = path.join(process.cwd(), "scripts", `${revealName}.csv`);
    const preRevealDir = path.join(
      process.cwd(),
      "scripts",
      `${preRevealName}.csv`
    );
    const testRevealDir = path.join(
      process.cwd(),
      "scripts",
      `${testRevealName}.csv`
    );

    const revealData = await csv().fromFile(revealDir);
    const preRevealData = await csv().fromFile(preRevealDir);
    const testRevealData = await csv().fromFile(testRevealDir);

    revealData.forEach((data, i) => {
      const dir = path.join(process.cwd(), "scripts", revealName, `${i}.json`);

      fs.writeFileSync(dir, JSON.stringify(data));
    });

    preRevealData.forEach((data, i) => {
      const dir = path.join(
        process.cwd(),
        "scripts",
        preRevealName,
        `${i}.json`
      );

      fs.writeFileSync(dir, JSON.stringify(data));
    });

    testRevealData.forEach((data, i) => {
      const dir = path.join(
        process.cwd(),
        "scripts",
        testRevealName,
        `${i}.json`
      );

      fs.writeFileSync(dir, JSON.stringify(data));
    });
  } catch (error) {
    console.log("ERROR", error);
  }
})();
