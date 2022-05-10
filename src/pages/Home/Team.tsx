import React from "react";
import styled from "@emotion/styled";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  useMediaQuery,
  Text,
  Icon,
} from "@chakra-ui/react";
import teamBg from "assets/img/bg_section_3.png";
import treamAvatar1 from "assets/img/team_1.png";
import treamAvatar2 from "assets/img/team_2.png";
import treamAvatar3 from "assets/img/team_3.png";
import treamAvatar4 from "assets/img/team_4.png";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const teams = [
  {
    name: "ADRI",
    title: "FOUNDER",
    img: treamAvatar1,
    links: {
      twitter: "https://twitter.com/adridwitomo",
      linkedin: "https://www.linkedin.com/in/adridwitomo/",
    },
  },
  {
    name: "ARIF",
    title: "FOUNDER",
    img: treamAvatar2,
    links: {
      twitter: "https://twitter.com/onlyayep",
      linkedin: "https://www.linkedin.com/in/ayeprahman/",
    },
  },
  {
    name: "DISZ",
    title: "FOUNDER",
    img: treamAvatar3,
    links: {
      twitter: "https://twitter.com/Diszazter8",
      linkedin: "",
    },
  },
  {
    name: "GEFI",
    title: "FOUNDER",
    img: treamAvatar4,
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

const Team = () => {
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");
  const [show, setShow] = React.useState<number | null>(null);

  const handlOnHover = (value: number | null) => setShow(value);

  return (
    <Box top="-12rem" width="full" position="relative">
      <Image
        position="absolute"
        width="full"
        height="160%"
        src={teamBg}
        objectFit={isMobile ? "cover" : "fill"}
      />
      <Container
        position="relative"
        zIndex={1}
        maxW="container.xl"
        background="Background.100"
        py={isMobile ? "10rem" : "8rem"}
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
};

export default Team;
