import { Container, Heading, Text } from "@chakra-ui/react";
import Button from "@components/Button";
import ChakraBox from "@components/ChakraBox";
import { Meta } from "@components/Meta";
import NetworkDetectorBanner from "@components/NetworkDetectorBanner";
import MetamaskButton from "@containers/MetamaskButton";
import useCheckIsAddressWhiteListed from "@hooks/useCheckIsAddressWhiteListed";
import useIsMounted from "@hooks/useIsMounted";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
import wcKitsulistImg from "public/img/kitsulist_bg.png";
import wcImg from "public/img/wallet_checker_bg.png";
import wcFoxImg from "public/img/wallet_checker_fox_bg.png";
import { useAccount } from "wagmi";

const WalletCheckPage = () => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const { isConnected } = useAccount();
  const { isWhiteListed } = useCheckIsAddressWhiteListed();

  const handleRedirect = () => router.push("/");

  if (!isMounted) return null;

  return (
    <>
      <Meta
        title="Kitsuden | Wallet Checker"
        images={[
          {
            url: "https://kitsuden.s3.amazonaws.com/images/wallet-checker-meta.png",
            alt: "kitsuden wallet checker",
          },
        ]}
      />
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

        {isConnected && (
          <ChakraBox position="absolute" top="2rem" right="2rem">
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
                <ChakraBox w="100%" maxW="620px" marginBottom="2rem">
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
              <Text fontWeight={600}>
                You are in possesion of a Kitsulist. The path to the hidden
                village lies in front of you, Be present for the Kitsulist mint
                on the 26th of November at 10PM SGT (9am EST) . Kitsuden awaits.
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
              <Text fontWeight={600}>
                You are not in possesion of a Kitsulist. The path to the hidden
                village is dangerous, Be present for the Public mint on the 27th
                of November at 1AM SGT (12PM EST). There is still hope.
              </Text>

              <Button size="lg" marginTop="2.5rem" onClick={handleRedirect}>
                BACK TO HOME
              </Button>
            </ChakraBox>
          )}
        </Container>
      </ChakraBox>
    </>
  );
};

export default WalletCheckPage;
