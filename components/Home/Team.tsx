import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  useMediaQuery,
  useMergeRefs,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import ChakraBox from "components/ChakraBox";
import Image from "components/Image";
import { useAnimation } from "framer-motion";
import teamBg from "public/img/team_bg.png";
import React from "react";
import { FaTwitter } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const teams = [
  {
    name: "ADRI DWITOMO",
    title: "FOUNDER & ART DIRECTOR",
    img: "/img/team_1.png",
    links: {
      twitter: "https://twitter.com/adridwitomo",
      handle: "@adridwitomo",
    },
  },
  {
    name: "ARIF RAHMAN",
    title: "LEAD DEVELOPER",
    img: "/img/team_2.png",

    links: {
      twitter: "https://twitter.com/onlyayep",
      handle: "@onlyayep",
    },
  },
  {
    name: "GEFI",
    title: "LEAD ARTIST",
    img: "/img/team_3.png",
    links: {
      twitter: "https://twitter.com/gefiction",
      handle: "@gefiction",
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
  // const isMounted = useIsMounted();
  const controlsTeam = useAnimation();
  const [isMobile] = useMediaQuery("(max-width: 767.98px)");
  const [show, setShow] = React.useState<number | null>(null);
  const [teamRef, InView] = useInView();
  const refs = useMergeRefs(ref, teamRef);

  React.useEffect(() => {
    if (InView) {
      controlsTeam.start("visible");
    }
  }, [InView]);

  const teamsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const teamVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
      },
    },
  };

  const handlOnHover = (value: number | null) => setShow(value);

  return (
    <Box top={["-22rem", "-16rem"]} width="full" position="relative" zIndex={5}>
      <Image
        alt="teamBg"
        priority
        layout="fill"
        width="100%"
        src={teamBg}
        bgRepeat="repeat"
        objectFit={isMobile ? "cover" : "fill"}
        placeholder="empty"
      />
      <Container
        position="relative"
        zIndex={1}
        maxW="container.xl"
        p="6rem 0 12rem"
      >
        <ChakraBox>
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
        </ChakraBox>

        <ChakraBox
          ref={refs}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap={isMobile ? "wrap" : "nowrap"}
          gap="4rem"
          initial="hidden"
          animate={controlsTeam}
          variants={teamsVariants}
        >
          {teams.map((t, i) => {
            return (
              <ChakraBox
                key={`${t?.name}-${i}`}
                position="relative"
                height={isMobile ? 168 : 272}
                width={isMobile ? 168 : 272}
                onMouseOver={() => handlOnHover(i + 1)}
                onMouseOut={() => handlOnHover(null)}
                variants={teamVariants}
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
                    <Text fontSize={24} fontWeight={700}>
                      {t.name}
                    </Text>
                    <Text fontSize={16} fontWeight={400}>
                      {t.title}
                    </Text>
                    <Box marginY="1rem" width="120px" height="1px" bg="white" />
                    <Flex
                      gap="1rem"
                      alignItems="center"
                      justifyContent="space-around"
                    >
                      {Object.keys(t.links).map((k) => {
                        if (k === "twitter" && t.links[k]) {
                          return (
                            <Flex
                              gap="0.5rem"
                              onClick={() => window.open(t.links[k])}
                              cursor="pointer"
                              _hover={{
                                color: "#F36800",
                                textDecoration: "underline",
                              }}
                            >
                              <Icon
                                cursor="pointer"
                                w="24px"
                                height="24px"
                                as={FaTwitter}
                              />
                              <Text>{t.links.handle}</Text>
                            </Flex>
                          );
                        }

                        return null;
                      })}
                    </Flex>
                  </Box>
                )}
              </ChakraBox>
            );
          })}
        </ChakraBox>
      </Container>
    </Box>
  );
});

export default Team;
