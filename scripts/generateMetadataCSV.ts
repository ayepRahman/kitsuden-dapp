import * as fs from "fs";
import { parse } from "json2csv";
import path from "path";
import { shuffle } from "../utils/shuffle";

// -----------------------
// Foxfone-1
// -----------------------

// Name: Foxfone “KT-1”

// Metadata:

// Version: KT-1
// Class: Civilian
// Kitsunite: Pebble
// Badge: Level 1
// Utility: Basic
// Color: Calm Orange

// -----------------------
// Foxfone-2
// -----------------------

// Name: Foxfone “FF-66”

// Metadata:

// Version: FF-66
// Class: Fox Force
// Kitsunite: Core
// Badge: Level 2
// Utility: Elite
// Color: Focus Blue

// -----------------------
// Foxfone-3
// -----------------------

// Name: Foxfone “ELDR-9T”

// Metadata:

// Version: ELDR-9T
// Class: Elders
// Kitsunite: Pure
// Badge: Level 3
// Utility: Divine
// Color: Mystic Purple

const desc =
  "The first drop from Kitsuden,The Foxfones are your key to entering the hidden village and to unlocking all future releases from Kitsuden. Foxfones are kitsunite-powered companion personal identification devices that enables the users to tap into the powers of the sacred foxfire and harness it’s energy. Increasing the user's abilities, attributes and unlocking their potential to summon and lead other Kitsunes in battle.";

const unrevealMetadata = {
  name: "Foxfone ???",
  description: desc,
  animation_url:
    "https://kitsuden.infura-ipfs.io/ipfs/QmbTkDc3Ge23LqWpN51Zp591v5yh3MQ6wdSDRcCBmKrGaV/kitsuden-prereveal.mp4",
  image:
    "https://kitsuden.infura-ipfs.io/ipfs/QmbTkDc3Ge23LqWpN51Zp591v5yh3MQ6wdSDRcCBmKrGaV/kitsuden-prereveal.gif",
  attributes: [
    {
      trait_type: "Status",
      value: "Fabricating",
    },
  ],
};

const metadataType = {
  common: {
    name: "FOXFONE “KT-1”",
    description: desc,
    animation_url:
      "https://kitsuden.infura-ipfs.io/ipfs/QmbTkDc3Ge23LqWpN51Zp591v5yh3MQ6wdSDRcCBmKrGaV/foxfone-1.mp4",
    image:
      "https://kitsuden.infura-ipfs.io/ipfs/QmbTkDc3Ge23LqWpN51Zp591v5yh3MQ6wdSDRcCBmKrGaV/foxfone-1.gif",
    attributes: [
      {
        trait_type: "Version",
        value: "KT-1",
      },
      {
        trait_type: "Class",
        value: "Civilian",
      },
      {
        trait_type: "Kitsunite",
        value: "Pebble",
      },
      {
        trait_type: "Badge",
        value: "Level 1",
      },
      {
        trait_type: "Utility",
        value: "Basic",
      },
      {
        trait_type: "Color",
        value: "Calm Orange",
      },
    ],
  },
  uncommon: {
    name: "FOXFONE “FF-66”",
    description: desc,
    animation_url:
      "https://kitsuden.infura-ipfs.io/ipfs/QmbTkDc3Ge23LqWpN51Zp591v5yh3MQ6wdSDRcCBmKrGaV/foxfone-2.mp4",
    image:
      "https://kitsuden.infura-ipfs.io/ipfs/QmbTkDc3Ge23LqWpN51Zp591v5yh3MQ6wdSDRcCBmKrGaV/foxfone-2.gif",
    attributes: [
      {
        trait_type: "Version",
        value: "FF-66",
      },
      {
        trait_type: "Class",
        value: "Fox Force",
      },
      {
        trait_type: "Kitsunite",
        value: "Core",
      },
      {
        trait_type: "Badge",
        value: "Level 2",
      },
      {
        trait_type: "Utility",
        value: "Elite",
      },
      {
        trait_type: "Color",
        value: "Focus Blue",
      },
    ],
  },
  rare: {
    name: "FOXFONE “ELDR-9T”",
    description: desc,
    animation_url:
      "https://kitsuden.infura-ipfs.io/ipfs/QmbTkDc3Ge23LqWpN51Zp591v5yh3MQ6wdSDRcCBmKrGaV/foxfone-3.mp4",
    image:
      "https://kitsuden.infura-ipfs.io/ipfs/QmbTkDc3Ge23LqWpN51Zp591v5yh3MQ6wdSDRcCBmKrGaV/foxfone-3.gif",
    attributes: [
      {
        trait_type: "Version",
        value: "ELDR-9T",
      },
      {
        trait_type: "Class",
        value: "Elders",
      },
      {
        trait_type: "Kitsunite",
        value: "Pure",
      },
      {
        trait_type: "Badge",
        value: "Level 3",
      },
      {
        trait_type: "Utility",
        value: "Divine",
      },
      {
        trait_type: "Color",
        value: "Mystic Purple",
      },
    ],
  },
};

const quantites = {
  prereveal: 6666,
  common: 4000,
  uncommon: 2000,
  rare: 666,
};

const fields = ["name", "attributes", "animation_url", "image", "description"];
const opts = { fields };

const genUnreveal = async () => {
  const mapped = Array.from({ length: quantites.prereveal }).map((_, i) => {
    return {
      ...unrevealMetadata,
      name: `${unrevealMetadata.name} #${i}`,
    };
  });

  const csv = parse(mapped, opts);

  const dir = path.join(process.cwd(), "scripts", "pre-reveal.csv");

  fs.writeFileSync(dir, csv);

  console.log("COMPLATE UNREVEAL");
};

const genReveal = async () => {
  const data: any[] = [];

  Array.from({ length: quantites.common }).forEach((_, i) => {
    data.push({
      ...metadataType.common,
    });
  });
  Array.from({ length: quantites.uncommon }).forEach((_, i) => {
    data.push({
      ...metadataType.uncommon,
    });
  });
  Array.from({ length: quantites.rare }).forEach((_, i) => {
    data.push({
      ...metadataType.rare,
    });
  });

  const finalData = shuffle(data).map((ele, i) => {
    return {
      ...ele,
      name: `${ele.name} #${i}`,
    };
  });

  const csv = parse(finalData, opts);

  const dir = path.join(process.cwd(), "scripts", "reveal.csv");

  fs.writeFileSync(dir, csv);

  console.log("COMPLETE REVEAL");
};

const genTestReveal = async () => {
  const data: any[] = [];

  Array.from({ length: 6666 }).forEach((_, i) => {
    data.push({
      ...metadataType.common,
      name: `${metadataType.common.name} #${i}`,
    });
  });

  const csv = parse(data, opts);

  const dir = path.join(process.cwd(), "scripts", "test-reveal.csv");

  fs.writeFileSync(dir, csv);

  console.log("COMPLATE TEST REVEAL");
};

(async () => {
  try {
    await genUnreveal();
    // @desc - hiding this as not to shuffle again
    // await genReveal();
    await genTestReveal();
  } catch (error) {
    console.log("ERROR", error);
  }
})();
