import { Container, Heading, Text } from "@chakra-ui/react";
import Button from "@components/Button";
import ChakraBox from "@components/ChakraBox";
import Icon from "@components/Icon";
import { Meta } from "@components/Meta";
import NetworkDetectorBanner from "@components/NetworkDetectorBanner";
import MetamaskButton from "@containers/MetamaskButton";
import styled from "@emotion/styled";
import useCheckIsAddressWhiteListed from "@hooks/useCheckIsAddressWhiteListed";
import useIsMounted from "@hooks/useIsMounted";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import wcKitsulistImg from "public/img/kitsulist_bg.png";
import wcImg from "public/img/wallet_checker_bg.png";
import wcFoxImg from "public/img/wallet_checker_fox_bg.png";
import { useAccount } from "wagmi";

export const WalletCheckerBox = styled(ChakraBox)`
  height: 100%;
  width: 100%;
  background: url(${wcImg.src});
  background-repeat: no-repeat;
  object-fit: fill;
`;

const WalletCheckPage: React.FC = () => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const { isConnected, address } = useAccount();
  const { isWhiteListed } = useCheckIsAddressWhiteListed();

  const handleRedirect = () => router.push("/");

  return (
    <>
      <Meta
        title="Kitsuden | Wallet Checker"
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://kitsuden.com/kitsulist",
          siteName: "Kitsuden",
          images: [
            {
              url: "https://kitsuden.s3.amazonaws.com/images/kitsulist-meta.png",
              alt: "kitsuden wallet checker",
            },
          ],
        }}
      />
      {isMounted && (
        <>
          <NetworkDetectorBanner />
          <ChakraBox h="100vh" w="100vw" padding="2rem" position="relative">
            <ChakraBox
              zIndex="-1"
              position="absolute"
              top="0"
              left="0"
              h="100%"
              w="100%"
            >
              <Image
                alt="loreBrushBg"
                priority
                src={wcImg}
                layout="fill"
                placeholder="empty"
              />
            </ChakraBox>

            <ChakraBox
              cursor="pointer"
              marginLeft={!isConnected ? "auto" : "none"}
              marginRight={!isConnected ? "auto" : "none"}
              position="absolute"
              top={["2rem", "2rem"]}
              left={!isConnected ? "0" : ["1rem", "2rem"]}
              right={!isConnected ? "0" : "none"}
              textAlign="center"
              flex={1}
            >
              <Icon
                onClick={handleRedirect}
                name="kitsudenName"
                width="111px"
                height="33px"
              />
            </ChakraBox>

            {isConnected && (
              <ChakraBox
                position="absolute"
                top={["2rem", "2rem"]}
                right={["1rem", "2rem"]}
              >
                <MetamaskButton />
              </ChakraBox>
            )}

            <Container
              display="flex"
              maxW="2xl"
              flexDirection="column"
              height="100%"
              justifyContent="center"
              textAlign="center"
            >
              {!isConnected && (
                <ChakraBox>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: [0.8, 1], opacity: [0, 1] }}
                    transition={{ duration: 1.5 }}
                  >
                    <ChakraBox w="100%" maxW="620px" marginBottom="4rem">
                      <Image src={wcFoxImg} />
                    </ChakraBox>
                  </motion.div>

                  <MetamaskButton size="lg" textAlign="center" marginX="auto">
                    CHECK KITSULIST
                  </MetamaskButton>
                </ChakraBox>
              )}

              {isConnected && isWhiteListed && (
                <ChakraBox>
                  <motion.div
                    initial={{ translateY: 0 }}
                    animate={{ translateY: [0, 20, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Image src={wcKitsulistImg} />
                  </motion.div>
                  <Heading
                    marginTop={["2rem"]}
                    color="black"
                    fontWeight={400}
                    fontSize={[46, 84]}
                    lineHeight={["30px", "76px"]}
                    marginBottom="2rem"
                  >
                    YOU HAVE a KITSULIST
                  </Heading>
                  <Text fontWeight={600} color="black">
                    You are in possesion of a Kitsulist. The path to the hidden
                    village lies in front of you, Be present for the Kitsulist
                    mint on the 26th of November at 10PM SGT (9am EST) .
                    Kitsuden awaits.
                  </Text>
                  <Button size="lg" marginTop="2.5rem" onClick={handleRedirect}>
                    BACK TO HOME
                  </Button>
                </ChakraBox>
              )}

              {isConnected && !isWhiteListed && (
                <ChakraBox>
                  <Heading
                    marginTop={["2rem"]}
                    color="black"
                    fontWeight={400}
                    fontSize={[46, 84]}
                    lineHeight={["30px", "76px"]}
                    marginBottom="2rem"
                  >
                    YOU do not HAVE a KITSULIST
                  </Heading>
                  <Text fontWeight={600} color="black">
                    You are not in possesion of a Kitsulist. The path to the
                    hidden village is dangerous, Be present for the Public mint
                    on the 27th of November at 1AM SGT (12PM EST). There is
                    still hope.
                  </Text>

                  <Button size="lg" marginTop="2.5rem" onClick={handleRedirect}>
                    BACK TO HOME
                  </Button>
                </ChakraBox>
              )}
            </Container>
          </ChakraBox>
        </>
      )}
    </>
  );
};

export default WalletCheckPage;
