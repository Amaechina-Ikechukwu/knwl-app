import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { Box } from "native-base";
import BrandText from "../../../../constants/BrandText";

const RenderUnsentText = ({ messages, item }) => {
  const colorScheme = useColorScheme();
  return (
    <Box margin={2} p={5} borderRadius={20} bgColor={colorScheme + ".success"}>
      <BrandText color={"light.background"} text={messages} size={20} />
    </Box>
  );
};

export default RenderUnsentText;
