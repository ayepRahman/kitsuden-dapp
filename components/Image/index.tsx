import React from "react";
import styled from "@emotion/styled";
import { Image as CKImage, ImageProps } from "@chakra-ui/react";

const CustomImage = styled(CKImage)<{ isLoaded?: boolean }>`
  opacity: ${(p) => (p.isLoaded ? "1" : "0")};
  transition: all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67);
`;

const Iamge: React.FC<ImageProps> = (props) => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const handleOnLoad = () => {
    setIsLoaded(true);
  };

  return <CustomImage {...props} isLoaded={isLoaded} onLoad={handleOnLoad} />;
};

export default Iamge;
