import { View, Text, useColorScheme } from "react-native";
import React from "react";
import { Box } from "native-base";
import BrandText from "../../../constants/BrandText";

const RenderText = ({ messages, item }) => {
  const colorScheme = useColorScheme();
  return (
    <Box
      margin={2}
      px={5}
      py={3}
      borderRadius={20}
      alignItems={item.uid == "openai" ? "flex-start" : "flex-end"}
      bgColor={
        item.uid == "openai"
          ? colorScheme + ".accent"
          : colorScheme + ".success"
      }
    >
      <BrandText color={"light.background"} text={messages} size={20} />
    </Box>
  );
};

export default RenderText;
