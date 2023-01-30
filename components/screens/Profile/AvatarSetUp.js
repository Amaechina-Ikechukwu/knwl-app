import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import VersalBox from "../../../constants/VersalBox";
import { Avatar, Box, PresenceTransition, VStack } from "native-base";
import BrandButton from "../../../constants/BrandButton";
import BrandText from "../../../constants/BrandText";
import { getAuth } from "firebase/auth";

const AvatarSetUp = ({ route }) => {
  const colors = ["background", "accent", "success", "error"];
  const [selectedId, setSelectedId] = useState(undefined);
  const colorScheme = useColorScheme();
  const { image } = route.params;

  const storePicture = () => {
    // Create the form data object
    var data = new FormData();
    data.append("picture", {
      uri: image,
      name: "selfie.jpg",
      type: "image/jpg",
      user_id: "gn9FvGNKqzBCIoBzteNk",
    });

    // Create the config object for the POST
    // You typically have an OAuth2 token that you use for authentication
    const config = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data;",
        Authorization: "Bearer " + "SECRET_OAUTH2_TOKEN_IF_AUTH",
      },
      body: {
        uri: image,
        name: "selfie.jpg",
        type: "image/jpg",
        user_id: "gn9FvGNKqzBCIoBzteNk",
      },
    };

    fetch(
      "http://127.0.0.1:5001/knwl-d295a/us-central1/knwl/createavatar",
      config
    )
      .then((responseData) => {
        // Log the response form the server
        // Here we get what we sent to Postman back
        console.log(responseData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <VersalBox>
      {" "}
      <VStack
        w={"full"}
        h="full"
        space={5}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <BrandText text={"Create a unique display picture"} size={30} />
        <Avatar
          padding={10}
          bg={colorScheme + "." + colors[selectedId] || "light.accent"}
          alignSelf="center"
          size="2xl"
          w={300}
          h={300}
          source={{
            uri:
              image ||
              "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
          }}
        ></Avatar>
        <Box
          space={3}
          w="full"
          px={3}
          h={"15%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <FlatList
            data={colors}
            numColumns={2}
            renderItem={({ item, index }) => (
              <Box
                marginBottom={2}
                w={"50%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <BrandButton
                  click={() => setSelectedId(index)}
                  color={colorScheme + "." + item}
                  text={item}
                />
              </Box>
            )}
            keyExtractor={(item, index) => index}
            extraData={selectedId}
          />
        </Box>

        <BrandButton
          click={() => storePicture()}
          color={colorScheme + "." + colors[selectedId]}
          text={"Continue"}
        />
      </VStack>
    </VersalBox>
  );
};

export default AvatarSetUp;
