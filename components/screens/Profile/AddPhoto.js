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
import * as FileSystem from "expo-file-system";
import { knwlapi } from "../../../assets/api";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { app } from "../../../firebaseConfig";
import axios from "axios";

const AddPhoto = () => {
  const colors = ["background", "accent", "success", "error"];
  const [selectedId, setSelectedId] = useState(undefined);
  const colorScheme = useColorScheme();
  const [createAvatar, setCreateAvatar] = useState(false);
  const [imageBase64, setImageBase64] = useState();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCreateAvatar(true);
      setImage(result.assets[0].uri);
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: "base64",
      });
      setImageBase64(base64);
    }
  };

  const postImage = async () => {
    axios
      .post(
        `${knwlapi}/createavatar`,
        {
          image_url: imageBase64,
          user_id: getAuth().currentUser.uid,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getAuth().currentUser.uid,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // await fetch(`${knwlapi}/createavatar`, {
    //   method: "post",
    //   headers: {
    //     Authorization: "Bearer" + getAuth().currentUser.uid,
    //   },
    //   body: JSON.stringify({
    //     imageurl: imageBase64,
    //     userId: getAuth().currentUser.uid,
    //   }),
    // }).then((data) => console.log(data));
  };
  useEffect(() => {
    console.log(imageBase64);
  }, []);
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
          disabled={createAvatar == false}
          color={colorScheme + ".success"}
          textcolor={"dark.text"}
          click={postImage}
          text={"Create Avatar With Your Photo"}
        />
      </VStack>
    </VersalBox>
  );
};

export default AddPhoto;
