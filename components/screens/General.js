import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Authentication/Login";

import { shallow } from "zustand/shallow";
import useStore from "../../store";
import AvatarSetUp from "./Profile/AvatarSetUp";
import AddPhoto from "./Profile/AddPhoto";
const General = () => {
  const { isSignedIn } = useStore(
    (state) => ({
      isSignedIn: state.isSignedIn,
    }),
    shallow
  );
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        {isSignedIn == undefined ? (
          <>
            <Stack.Screen name="login" component={AddPhoto} />
            <Stack.Screen name="createavatar" component={AvatarSetUp} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default General;
