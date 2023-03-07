import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Authentication/Login";

import { shallow } from "zustand/shallow";
import useStore from "../../store";
import AvatarSetUp from "./Profile/AvatarSetUp";
import AddPhoto from "./Profile/AddPhoto";
import Chat from "./Chats/Chat";
import VersalBox from "../../constants/VersalBox";
import BrandText from "../../constants/BrandText";
const General = () => {
  const { isSignedIn } = useStore(
    (state) => ({
      isSignedIn: state.isSignedIn,
    }),
    shallow
  );
  const Stack = createNativeStackNavigator();
  if (isSignedIn == undefined) {
    return (
      <VersalBox>
        <BrandText text={"loading"} />
      </VersalBox>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        {isSignedIn == false ? (
          <Stack.Screen name="Home" component={Login} />
        ) : (
          <>
            {" "}
            <Stack.Screen name="openai" component={Chat} />
            <Stack.Screen name="addphoto" component={AddPhoto} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default General;
