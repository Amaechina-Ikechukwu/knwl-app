import { Box, Pressable, Text } from "native-base";
import React, { useState, useEffect } from "react";
import BrandText from "./BrandText";
function BrandButton(props) {
  return (
    <Pressable w="80%" onPress={props.click}>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            w="full"
            h="60"
            alignItems="center"
            justifyContent="center"
            bg={isPressed ? "light.accent" : isHovered ? "blue.400" : "light.accent"}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
            p="2"
            rounded="10"
          >
             <BrandText text={props.text} size={20} />
          </Box>
        );
      }}
    </Pressable>
  );
}

export default BrandButton;
