import { Box, Center, useColorModeValue } from "native-base";
import React, { useState, useEffect } from "react";
import { useColorScheme } from "react-native";

import UploadAlert from "./Alert";
function VersalBox({ children }) {
  const colorScheme = useColorScheme();

  const bg = useColorModeValue("light.primary", "dark.primary");
  return (
    <Box flex={1} bg={`${colorScheme}.background`} alignItems="center">
      <Box safeAreaTop />
      {children}
    </Box>
  );
}

export default VersalBox;
