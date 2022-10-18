import {
  Icon as ChakraIcon,
  IconProps as ChakraIconProps,
} from "@chakra-ui/react";
import * as SvgIcons from "public/svg";

export type IconNamesType =
  | "kitsudenLogo"
  | "kitsudenName"
  | "foxfoneLogo"
  | "discord"
  | "twitter"
  | "opensea"
  | "etherscan"
  | "fire1"
  | "fire2"
  | "fire3"
  | "fire4"
  | "headerClip"
  | "lock"
  | "modalMobile"
  | "modal"
  | "footer";

const iconNames: {
  [K in IconNamesType]: any;
} = {
  kitsudenLogo: SvgIcons.KitsudenLogoSvg,
  kitsudenName: SvgIcons.KitsudenLogoNameSvg,
  foxfoneLogo: SvgIcons.FoxFoneLogoSvg,
  discord: SvgIcons.DiscordSvg,
  twitter: SvgIcons.TwitterSvg,
  opensea: SvgIcons.OpenSeaSvg,
  etherscan: SvgIcons.EtherscanSvg,
  fire1: SvgIcons.Fire1Svg,
  fire2: SvgIcons.Fire2Svg,
  fire3: SvgIcons.Fire3Svg,
  fire4: SvgIcons.Fire4Svg,
  headerClip: SvgIcons.HeaderClipSvg,
  lock: SvgIcons.LockSvg,
  modalMobile: SvgIcons.ModalMobileSvg,
  modal: SvgIcons.ModalBgSvg,
  footer: SvgIcons.FooterSvg,
};

interface IconProps extends ChakraIconProps {
  name: IconNamesType;
}

const Icon: React.FC<IconProps> = (props) => {
  return <ChakraIcon as={iconNames[props.name]} fill="black" {...props} />;
};

export default Icon;
