import React from "react";
import { configureFonts, DefaultTheme } from "react-native-paper";
import customFonts from "./Fonts";

const theme = {
  ...DefaultTheme,
  fonts: configureFonts(customFonts),
  roundness: 20,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4169E1",
    accent: "#f1c40f",
    favorite: "#BADA55",
    cancelButton: "#a4c639",
    iconColor: "#808080",

    // Custom
    main_c: '#64104D',
    orange: '#ED5E4F',
    color1: '#B21B3F',
    color2: '#D2C3E4',
    color3: '#EB3248',
    color4: '#28B7CB',
    purple: '#6f4792',
  },
};

export default theme;
