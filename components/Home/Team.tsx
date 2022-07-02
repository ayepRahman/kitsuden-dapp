import React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Container,
  Flex,
  Heading,
  useMediaQuery,
  Text,
  Icon,
} from "@chakra-ui/react";
import teamBg from "public/img/team_bg.png";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "components/Image";

const teams = [
  {
    name: "ADRI",
    title: "FOUNDER",
    img: "/img/team_1.png",
    links: {
      twitter: "https://twitter.com/adridwitomo",
      linkedin: "https://www.linkedin.com/in/adridwitomo/",
    },
  },
  {
    name: "ONLYAYEP",
    title: "FOUNDER",
    img: "/img/team_2.png",

    links: {
      twitter: "https://twitter.com/onlyayep",
      linkedin: "https://www.linkedin.com/in/ayeprahman/",
    },
  },
  {
    name: "DISZ",
    title: "FOUNDER",
    img: "/img/team_3.png",
    links: {
      twitter: "https://twitter.com/Diszazter8",
      linkedin: "",
    },
  },
  {
    name: "GEFI",
    title: "FOUNDER",
    img: "/img/team_4.png",
    links: {
      twitter: "https://twitter.com/gefiction",
      linkedin: "",
    },
  },
];

const TeamImage = styled(Box)<{ show: boolean }>`
  height: 272px;
  width: 272px;
  background-image: ${(p) => `url(${p.src})`};
  filter: ${(p) => p.show && "contrast(175%) brightness(10%)"};
  background-size: cover;

  /* Medium devices (tablets, less than 992px) */
  @media (max-width: 767.98px) {
    height: 168px;
    width: 168px;
  }
`;

const Team = React.forwardRef((_, ref) => {
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");
  const [show, setShow] = React.useState<number | null>(null);

  const handlOnHover = (value: number | null) => setShow(value);

  return (
    <Box top="-12rem" width="full" position="relative" zIndex={5}>
      <Image
        layout="fill"
        width="100%"
        src={teamBg}
        bgRepeat="repeat"
        objectFit={isMobile ? "cover" : "fill"}
      />
      <Container
        position="relative"
        zIndex={1}
        maxW="container.xl"
        p="6rem 0 12rem"
      >
        <Heading
          fontWeight={400}
          fontSize={84}
          lineHeight="76px"
          color="white"
          textAlign="center"
          mb="3rem"
        >
          The team
        </Heading>

        <Flex
          justifyContent="space-around"
          alignItems="center"
          flexWrap={isMobile ? "wrap" : "nowrap"}
          gap="1rem"
        >
          {teams.map((t, i) => {
            return (
              <Box
                position="relative"
                height={isMobile ? 168 : 272}
                width={isMobile ? 168 : 272}
                onMouseOver={() => handlOnHover(i + 1)}
                onMouseOut={() => handlOnHover(null)}
              >
                <TeamImage src={t.img} show={show === i + 1} />
                {show === i + 1 && (
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    bottom={0}
                    color="white"
                    left={0}
                    display="flex"
                    justifyContent="center"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                  >
                    <Text fontSize={36} fontWeight={700}>
                      {t.name}
                    </Text>
                    <Text fontSize={20} fontWeight={400}>
                      {t.title}
                    </Text>
                    <Box width="120px" height="1px" bg="white" />
                    <Flex
                      gap="1rem"
                      mt="1rem"
                      alignItems="center"
                      justifyContent="space-around"
                    >
                      {Object.keys(t.links).map((k) => {
                        if (k === "twitter" && t.links[k]) {
                          return (
                            <Icon
                              cursor="pointer"
                              w="24px"
                              height="24px"
                              as={FaTwitter}
                              onClick={() => window.open(t.links[k])}
                            />
                          );
                        }
                        if (k === "linkedin" && t.links[k]) {
                          return (
                            <Icon
                              cursor="pointer"
                              w="24px"
                              height="24px"
                              as={FaLinkedin}
                              onClick={() => window.open(t.links[k])}
                            />
                          );
                        }

                        return null;
                      })}
                    </Flex>
                  </Box>
                )}
              </Box>
            );
          })}
        </Flex>
      </Container>
    </Box>
  );
});

export default Team;
