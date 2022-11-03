import { useMediaQuery } from "@chakra-ui/react";
import "@google/model-viewer";
import Image from "components/Image";

import ChakraBox from "components/ChakraBox";
import mintBrushImg from "public/img/mint_brush_bg.png";

const MintModelViewer = () => {
  // const isMounted = useIsMounted();
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");

  // if (!isMounted) return null;

  return (
    <ChakraBox
      overflow="hidden"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
        },
      }}
      position="relative"
      flexBasis={["100%", "50%"]}
      w="100%"
    >
      <Image
        src={mintBrushImg.src}
        height="700px"
        width="700px"
        placeholder="empty"
      />

      <model-viewer
        style={{
          width: "80%",
          height: "80%",
          backgroundColor: "transparent",
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        src="/glb/device_1.gltf"
        ios-src=""
        alt="foxfone-device"
        shadow-intensity="1"
        camera-controls
        auto-rotate
        ar
      ></model-viewer>
    </ChakraBox>
  );
};

export default MintModelViewer;
