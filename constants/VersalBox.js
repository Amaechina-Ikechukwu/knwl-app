import { Box, useColorModeValue } from "native-base";
import React, { useState, useEffect } from "react";
import useStore from "../State/store";
import UploadAlert from "./Alert";
function VersalBox({ children }) {
  const { toggleColorMode } = useColorMode();

  const bg = useColorModeValue("light.primary", "dark.primary");
  return (
    <Box flex={1} bg={bg} alignItems="center">
      <Box safeAreaTop /> <UploadAlert />
      {children}
    </Box>
  );
}

export default VersalBox;
