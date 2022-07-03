import { chakra } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    ["onMouseOver", "onMouseOut"].includes(prop) ||
    isValidMotionProp(prop) ||
    prop === "children",
});

export default ChakraBox;
