/**
 * @dev - explicitly name as a .js extension to be use in tailwind.config.js
 */

var theme = {
  container: {
    // you can configure the container to be centered
    center: true,
    padding: "1rem",
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1888px",
    },
  },
  colors: {
    white: "#FFFFFF",
    transparent: "transparent",
    twitter: "#1DA1F2",
    discord: "#5865F2",
    background: "#E5E5E5",
    neutral: {
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293B",
      900: "#0f172A",
    },
    primary: {
      50: "#FFFDE5",
      100: "#CC8E3A",
      200: "#E37823",
      300: "#B33F1C",
      400: "#8F2D14",
      500: "#",
      600: "#",
      700: "#",
      800: "#",
      900: "#",
    },
    error: {
      50: "#FFC0C0",
      300: "#FF8888",
      500: "#EB4343",
      700: "#BD1A1A",
      900: "#8B0A0A",
    },
    gradient: {
      purple:
        "linear-gradient(134.14deg, #766BF2 40.76%, #5944D7 55.74%, #613FE9 85.26%)",
    },
  },
  boxShadow: {
    xs: "0px 1px 2px -1px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.1)",
    sm: " 0px 4px 6px -1px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.1)",
    md: "0px 4px 6px -4px rgba(16, 24, 40, 0.1), 0px 10px 15px -3px rgba(16, 24, 40, 0.1)",
    lg: "0px 8px 10px -6px rgba(16, 24, 40, 0.1), 0px 20px 25px -5px rgba(16, 24, 40, 0.1)",
    xl: "0px 25px 50px -12px rgba(16, 24, 40, 0.1)",
  },
  fontFamily: {
    dmsans: ["DM Sans", "sans-serif"],
    montserrat: ["Montserrat", "sans-serif"],
  },
  blur: {
    sm: "8px",
    md: "16px",
    lg: "24px",
  },
};

module.exports = { theme };
