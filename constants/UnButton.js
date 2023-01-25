import { Box, Pressable, Text } from "native-base";
import React, { useState, useEffect } from "react";
function UnButton(props) {
  return (
    <Pressable w="80%">
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            w="full"
            h="50"
            alignItems="center"
            justifyContent="center"
            bg={isPressed ? "gray.500" : isHovered ? "gray.500" : "brand.800"}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
            p="1"
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

export default UnButton;
