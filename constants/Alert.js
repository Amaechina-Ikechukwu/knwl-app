import { Box, HStack, VStack, Alert } from "native-base";

import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import useStore from "../State/store";
import BrandText from "./BrandText";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
function UploadAlert() {
  const [show, setShow] = useState(true);
  const clearAlert = useStore((state) => state.clearAlert);
  const showToast = () => {
    setTimeout(() => {
      clearAlert();
    }, 3000);
  };
  const alert = useStore((state) => state.alert);

  useEffect(() => {
    showToast();
    return () => {};
  });
  try {
    if (alert !== "") {
      return (
        <Box
          w="90%"
          rounded="sm"
          bg="blue.100"
          borderColor={"blue.400"}
          borderWidth={1.5}
          alignItems="center"
          position={"absolute"}
          bottom={windowHeight * 0.93}
          p={1}
        >
          <Alert w="full" bg="blue.100" alignItems="center">
            <VStack space={1} w="100%">
              <HStack alignItems="center">
                <BrandText color="#000" size={14} weight="bold" text={alert} />
              </HStack>
            </VStack>
          </Alert>
        </Box>
      );
    } else {
      return <Box />;
    }
  } catch {
    return <Box />;
  }
}

export default UploadAlert;
