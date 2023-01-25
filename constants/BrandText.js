import { Text } from "native-base";
import React, { useState, useEffect } from "react";
import useStore from "../State/store";
function BrandText(props) {
  const colourScheme = useColorScheme();

  return (
    <Text
      key={props.key}
      color={
        colourScheme === "light" ? props.color || "light.text" : "dark.text"
      }
      fontWeight={props.weight || "normal"}
      fontSize={props.size || 14}
    >
      {props.text}
    </Text>
  );
}

export default BrandText;
