import * as fs from "fs";

export const mockJson = {
  name: "Kitsuden Foxfone Unrevealed",
  image:
    "https://gateway.pinata.cloud/ipfs/QmRLAckg7Pxfj2CBMFiodGtoKwU2NZxnsjBG4o242kSzAz",
  placeholder: "",
  external_url: "https://kitsuden.com",
  attributes: [
    { trait_type: "Type", value: "KT-1" },
    { trait_type: "Type", value: "FF-66" },
    { trait_type: "Type", value: "ELDR-9T" },
  ],
  animation_url:
    "https://gateway.pinata.cloud/ipfs/QmRLAckg7Pxfj2CBMFiodGtoKwU2NZxnsjBG4o242kSzAz",
};

const generateHiddenJson = () => {
  Array.from({ length: 100 }, (_, i) => {
    fs.writeFileSync(
      `${__dirname}/../resources/hidden/${i}.json`,
      JSON.stringify({
        name: `Kitsuden Foxfone #${i}`, // name need to be dynamic
        image:
          "https://gateway.pinata.cloud/ipfs/QmRLAckg7Pxfj2CBMFiodGtoKwU2NZxnsjBG4o242kSzAz", // placeholder image
        animation_url:
          "https://media.giphy.com/media/5th8zFFsvNOuM6nGsq/giphy.gif", // glb
        external_url: "https://kitsuden.com",
        attributes: [
          {
            trait_type: "Status",
            value: "Unrevealed",
          },
        ],
      })
    );
  });
};

generateHiddenJson();
