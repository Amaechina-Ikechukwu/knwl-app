import { Box, Pressable, Text } from "native-base";
import React, { useState, useEffect } from "react";
function BrandButton(props) {
  return (
    <Pressable w="80%" onPress={props.click}>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            w="full"
            h="50"
            alignItems="center"
            justifyContent="center"
            bg={isPressed ? "blue.500" : isHovered ? "blue.500" : "brand.300"}
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
            <Text fontSize={20} color="brand.100">
              {props.text}
            </Text>
          </Box>
        );
      }}
    </Pressable>
  );
}

export default BrandButton;
