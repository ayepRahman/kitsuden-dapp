import { useMediaQuery } from "@chakra-ui/react";
import "@google/model-viewer";
import Image from "src/components/Image";

import mintBrushImg from "public/img/mint_brush_bg.png";
import ChakraBox from "src/components/ChakraBox";

const MintModelViewer = () => {
  // const isMounted = useIsMounted();
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");

  // if (!isMounted) return null;

  return (
    <ChakraBox
      overflow="hidden"
      initial={{
        opacity: 0,
        x: 100,
      }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 1,
        },
      }}
      position="relative"
      flexBasis={isMobile ? "100%" : "50%"}
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
          width: "60%",
          height: "60%",
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
