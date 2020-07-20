const {
  colors,
  lineHeight,
  fontWeight,
  fontSize,
} = require("tailwindcss/defaultTheme");

const percentageSpacing = {
  "1/12": "8.333333%",
  "1/10": "10%",
  "1/6": "16.666667%",
  "1/5": "20%",
  "1/4": "25%",
  "1/3": "33.333333%",
  "2/5": "40%",
  "5/12": "41.666667%",
  "1/2": "50%",
  "7/12": "58.333333%",
  "3/5": "60%",
  "2/3": "66.666667%",
  "3/4": "75%",
  "4/5": "80%",
  "5/6": "83.333333%",
  "6/12": "50%",
  "11/12": "91.666667%",
};

module.exports = {
  theme: {
    screens: {
      md: "1280px",
      lg: "1366px",
      xl: "1440px",
      xxl: "1680px",
    },
    colors: {
      black: colors.black,
      white: colors.white,
      transparent: colors.transparent,
      yellow: {
        1: "#EBEB14",
      },
      gray: {
        1: "#F8F8F8",
      },
      blue: {
        1: "#2576DA", // Base
        50: "#BACDE8",
        100: "#184d8d",
        200: "#0d2a4d",
      },
      green: {
        1: "#25DA2E",
      },
    },
    extend: {
      fontSize: {
        "10": "0.625rem",
        "13": "0.8125rem",
        "15": "0.9375rem",
      },
      spacing: {
        "72": "18rem",
        "80": "20rem",
        "88": "22rem",
        "96": "24rem",
        "104": "26rem",
      },
      inset: (theme, { negative }) => ({
        ...theme("spacing"),
        ...percentageSpacing,
        ...negative(theme("spacing")),
      }),
      height: percentageSpacing,
      minWidth: (theme) => ({
        ...theme("spacing"),
        tiny: "4.375rem",
        xs: "20rem",
        "min-screen": "980px",
        "1/10": "10%",
        "1/4": "25%",
        "1/3": "33%",
        "1/2": "50%",
        "3/4": "75%",
      }),
      minHeight: {
        "min-screen": "500px",
      },
      maxWidth: {
        "7xl": "80rem",
        "8xl": "88rem",
        "9xl": "96rem",
        "screen-xl": "1280px",
        "1/4": "25%",
        "1/3": "33%",
        "1/2": "50%",
        "3/4": "75%",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".drag-none": {
          userDrag: "none",
        },
        ".type-xs": {
          fontSize: fontSize.xs,
          fontWeight: fontWeight.medium,
          lineHeight: lineHeight.tight,
        },
        ".type-sm": {
          fontSize: fontSize.sm,
          fontWeight: fontWeight.medium,
          lineHeight: lineHeight.tight,
        },
        ".type-base": {
          fontSize: fontSize.base,
          fontWeight: fontWeight.medium,
          lineHeight: lineHeight.tight,
        },
        ".type-lg": {
          fontSize: fontSize.lg,
          fontWeight: fontWeight.medium,
          lineHeight: lineHeight.tight,
        },
        ".type-xl": {
          fontSize: fontSize.xl,
          fontWeight: fontWeight.medium,
          lineHeight: lineHeight.tight,
        },
        ".type-2xl": {
          fontSize: fontSize["2xl"],
          fontWeight: fontWeight.medium,
          lineHeight: lineHeight.tight,
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
