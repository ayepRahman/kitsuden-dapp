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

export const hiddenJson = {
  name: "Kitsuden Foxfone #17", // name need to be dynamic
  image:
    "https://gateway.pinata.cloud/ipfs/QmRLAckg7Pxfj2CBMFiodGtoKwU2NZxnsjBG4o242kSzAz", // placeholder image
  animation_url:
    "https://gateway.pinata.cloud/ipfs/QmRLAckg7Pxfj2CBMFiodGtoKwU2NZxnsjBG4o242kSzAz", // glb
  external_url: "https://kitsuden.com",
  attributes: [
    {
      trait_type: "Status",
      value: "Unrevealed",
    },
  ],
};

const generateHiddenJson = () => {};

fs.writeFileSync("hidden.json", JSON.stringify(hiddenJson));
