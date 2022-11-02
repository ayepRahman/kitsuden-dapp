// import { create, globSource } from "ipfs-http-client";
import dotenv from "dotenv";
import * as fs from "fs";
import { create, globSource } from "ipfs-http-client";
import path from "path";

dotenv.config();

(async () => {
  try {
    const dir = path.join(process.cwd(), "scripts", "test-reveal");
    const glob = globSource(dir, "**/*");

    const projectId = process.env.INFURA_PROJECT_ID;
    const projectSecret = process.env.INFURA_API_SECRET;

    const auth =
      "Basic " +
      Buffer.from(projectId + ":" + projectSecret).toString("base64");

    console.log({
      dir,
      projectId,
      projectSecret,
      auth,
    });

    const ipfs = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorization: auth,
      },
    });

    let addedFiles = [];

    const addOptions = {
      pin: true,
      wrapWithDirectory: true,
      enableShardingExperiment: true,
    };

    console.time();
    console.log("uploading!");
    for await (const file of ipfs.addAll(glob, addOptions)) {
      const obj = {
        cid: file.cid.toString(),
        path: file.path,
        size: file.size,
      };
      console.log(obj);
      addedFiles.push(obj);
    }

    const writePath = path.join(
      process.cwd(),
      "scripts",
      "cid",
      "test-reveal.json"
    );

    console.log("WRITE PATH", writePath);

    fs.writeFileSync(writePath, JSON.stringify(addedFiles));
    console.log("LENGTH", addedFiles.length);
    console.log("SUCCESS ADDED TO", writePath);
    console.timeEnd();
  } catch (error) {
    console.log("ERRROR", error);
  }
})();
