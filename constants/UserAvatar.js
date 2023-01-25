import { Avatar } from "native-base";
import React, { useState, useEffect } from "react";
import { colors } from "../colors";
import VersalBox from "./VersalBox";
function UserAvatar(props) {
  return (
    <Avatar
      bg={colors.accent}
      size={props.size}
      source={{
        uri:
          props.userImage ||
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      }}
    >
      {props.userInitials || "Z"}
    </Avatar>
  );
}

export default UserAvatar;
