import csv from "csvtojson";
import * as fs from "fs";
import path from "path";

const convertData = (data: any) => {
  return {
    name: data?.name,
    attributes: JSON.parse(data?.attributes),
    animation_url: data?.animation_url,
    image: data?.image,
    description: data?.description,
  };
};

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
      const cData = convertData(data);
      fs.writeFileSync(dir, JSON.stringify(cData));
    });

    preRevealData.forEach((data, i) => {
      const dir = path.join(
        process.cwd(),
        "scripts",
        preRevealName,
        `${i}.json`
      );

      const cData = convertData(data);

      fs.writeFileSync(dir, JSON.stringify(cData));
    });

    testRevealData.forEach((data, i) => {
      const dir = path.join(
        process.cwd(),
        "scripts",
        testRevealName,
        `${i}.json`
      );

      const cData = convertData(data);

      fs.writeFileSync(dir, JSON.stringify(cData));
    });

    console.log("COMPLETE");
  } catch (error) {
    console.log("ERROR", error);
  }
})();
