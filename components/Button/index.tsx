// @link - https://dev.to/gabrielmlinassi/a-more-stylish-way-to-write-conditional-tailwind-classes-5ae6
import Icon from "@components/Icon";
import { BeatLoader } from "@components/Loaders";
import { theme } from "@styles/theme";
import clsx from "clsx";
import { buttonIconSizeStyle, loaderSizeStyle, sizeStyle } from "./constants";
import { ButtonProps } from "./definitions";
import styles from "./index.module.css";

/**
 * Button component
 */
const Button: React.FC<ButtonProps> = ({
  variants = "primary",
  size = "md",
  colorScheme = "default",
  isLoading,
  isFullWidth,
  prefixIcon,
  suffixIcon,
  prefixIconMask,
  suffixIconMask,
  buttonIcon,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "rounded-md inline-flex items-center justify-center",
        styles.button,
        sizeStyle[size],
        buttonIcon && buttonIconSizeStyle[size],
        isFullWidth && "w-full",
        className
      )}
      {...props}
    >
      {isLoading ? (
        <BeatLoader
          color={theme.colors.neutral[50]}
          size={loaderSizeStyle[size]}
        />
      ) : (
        <>
          {!!buttonIcon ? (
            <Icon name={buttonIcon} size={size === "xl" ? "lg" : size} />
          ) : (
            <>
              {prefixIcon && (
                <Icon
                  className="mr-3"
                  name={prefixIcon}
                  size={size === "xl" ? "lg" : size}
                  isMask={prefixIconMask}
                />
              )}
              {children}
              {suffixIcon && (
                <Icon
                  className="ml-3"
                  name={suffixIcon}
                  size={size === "xl" ? "lg" : size}
                  isMask={suffixIconMask}
                />
              )}
            </>
          )}
        </>
      )}
    </button>
  );
};

export default Button;
export * from "./definitions";
