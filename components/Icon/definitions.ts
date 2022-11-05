export const IconNames = [
  "discord",
  "etherscan",
  "fire_1",
  "fire_3",
  "fire_4",
  "footer",
  "foxfone_logo",
  "header_clip",
  "kitsuden_logo_1",
  "lock",
  "logo_icon",
  "logo_name",
  "mobile_modal_bg",
  "modal_bg",
  "opensea",
  "twitter",
] as const;

export type IconName = typeof IconNames[number];
export type IconSize = "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Icon names
   */
  name: IconName;
  /**
   * Icon size
   */
  size?: IconSize;
  /**
   * Icon sizing
   */
  sizing?: string;
  /**
   * Icon css mask
   */
  isMask?: boolean;
}
