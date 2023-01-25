import { StatusBar } from "expo-status-bar";
import { StyleSheet, useColorScheme } from "react-native";
import { NativeBaseProvider, extendTheme, Text, Box } from "native-base";

export default function App() {
  const colorScheme = useColorScheme();
  const theme = extendTheme({
    colors: {
      // Add new color
      light: {
        background: "#FFFFFF",
        accent: "#316BFF",
        accentSecondary: "#818181",
        text: "#1D1D1D",
        successShade: "rgba(0,209,172,0.1)",
        sucess: "#00d1ac",
        error: "#FF5959",
        errorShade: "rgba(255,89,89,0.1)",
        offWhite: "#E3E3E3",
      },
      // Redefining only one shade, rest of the color will remain same.
      dark: {
        background: "#1D1D1D",
        accent: "#316BFF",
        accentSecondary: "#818181",
        text: "#fcfcfc",
        successShade: "rgba(0,209,172,0.1)",
        sucess: "#00d1ac",
        error: "#FF5959",
        errorShade: "rgba(255,89,89,0.1)",
        offBlack: "#363636",
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "dark",
    },
  });
  return (
    <NativeBaseProvider theme={theme}>
      <Box bg={`${colorScheme}.background`} p="4" />
    </NativeBaseProvider>
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
