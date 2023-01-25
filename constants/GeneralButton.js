import React, { useState, useEffect } from "react";
import { Box, Pressable, Text } from "native-base";
function GeneralButton({ children, click, key, color, rounded }) {
  return (
    <Pressable key={key} onPress={click}>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            rounded={rounded}
            alignItems="center"
            justifyContent="center"
            bg={isPressed ? "blue.100" : color || "brand.300"}
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
            p="2"
          >
            {children}
          </Box>
        );
      }}
    </Pressable>
  );
}

export default GeneralButton;
