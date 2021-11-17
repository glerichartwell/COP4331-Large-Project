import React from "react";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./custom-properties/Themes";

import MainScreen from "./screens/MainScreen";
import TopBar from "./components/TopBar";

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <TopBar />

      <MainScreen />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
