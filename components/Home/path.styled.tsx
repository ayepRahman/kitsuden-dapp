import styled from "@emotion/styled";
import ChakraBox from "components/ChakraBox";

export const TimeLine = styled(ChakraBox)`
  position: relative;
  margin: 1rem;
  color: white;

  &:after {
    content: "";
    position: absolute;
    width: 1px;
    background-color: #e3e3e3;
    top: 26px;
    bottom: 26px;
    left: 0;
  }
`;

export const TimeLineItem = styled(ChakraBox)<{ url: string; size: number }>`
  padding: 0 0 1rem 2rem;
  position: relative;

  &:after {
    content: "";
    background-image: url(${(p) => p.url});
    background-size: ${(p) => `${p.size}px ${p.size}px`};
    position: absolute;
    width: ${(p) => `${p.size}px`};
    height: ${(p) => `${p.size}px`};
    top: 0;
    left: ${(p) => `-${p.size / 2}px`};
    z-index: 1;
  }
`;
