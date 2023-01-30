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
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";

const AddPhoto = ({ navigation }) => {
  const colors = ["background", "accent", "success", "error"];
  const [selectedId, setSelectedId] = useState(undefined);
  const colorScheme = useColorScheme();
  const [createAvatar, setCreateAvatar] = useState(false);

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
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
        <BrandText text={"Add a photo"} size={30} />
        <Avatar
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

        <BrandButton
          text={"Open Gallery"}
          textcolor={"dark.text"}
          click={pickImage}
        />
        <BrandButton
          disabled={image == null}
          click={() => navigation.navigate("createavatar", { image: image })}
          color={colorScheme + ".success"}
          textcolor={"dark.text"}
          text={"Create Avatar With Your Photo"}
        />
      </VStack>
    </VersalBox>
  );
};

export default AddPhoto;
