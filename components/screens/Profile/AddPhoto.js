import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import VersalBox from "../../../constants/VersalBox";
import { Avatar, Box, PresenceTransition, VStack, ZStack } from "native-base";
import BrandButton from "../../../constants/BrandButton";
import BrandText from "../../../constants/BrandText";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { knwlapi } from "../../../assets/api";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { app } from "../../../firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import axios from "axios";
import { exampleUser } from "../../../assets/exampleuser";

const AddPhoto = ({ navigation }) => {
  const colors = ["background", "accent", "success", "error"];
  const [selectedId, setSelectedId] = useState(undefined);
  const colorScheme = useColorScheme();
  const [createAvatar, setCreateAvatar] = useState(false);
  const [imageBase64, setImageBase64] = useState();
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState();

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
    const storage = getStorage();
    const storageRef = ref(storage, "profileimage/" + exampleUser);

    const uploadTask = uploadBytesResumable(storageRef, image);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
    // axios
    //   .post(
    //     `${knwlapi}/createavatar`,
    //     {
    //       image_url: imageBase64,
    //       user_id: getAuth().currentUser.uid,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //         Authorization: "Bearer " + getAuth().currentUser.uid,
    //       },
    //     }
    //   )
    //   .then(function (response) {
    //     console.log(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  };
  useEffect(() => {}, []);
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
        <ZStack>
          {" "}
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
          <Avatar
            bg={colorScheme + "." + colors[selectedId] || "light.accent"}
            alignSelf="center"
            size="2xl"
            w={300}
            h={300}
          >
            {progress !== undefined && Math.ceil(progress) + "%"}
          </Avatar>
        </ZStack>

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
          text={"Upload photo"}
        />
      </VStack>
    </VersalBox>
  );
};

export default AddPhoto;
