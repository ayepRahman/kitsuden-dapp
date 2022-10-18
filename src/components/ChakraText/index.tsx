import { chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

const ChakraText = chakra(motion.p, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default ChakraText;
