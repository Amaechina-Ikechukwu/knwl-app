import { View, Text, FlatList, useColorScheme, TextInput } from "react-native";
import React from "react";
import VersalBox from "../../../constants/VersalBox";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";

import { app } from "../../../firebaseConfig";
import { collection, getDocs, getFirestore, orderBy } from "firebase/firestore";
import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { Box, HStack, Input, VStack } from "native-base";
import BrandText from "../../../constants/BrandText";
import { exampleUser } from "../../../assets/exampleuser";
import BrandButton from "../../../constants/BrandButton";
import { knwlapi } from "../../../assets/api";
const Chat = () => {
  const [messages, setMessages] = useState();
  const [messageToSend, setMessagesToSend] = useState();

  const handleChange = (e) => {
    // e.preventDefault();
    setMessagesToSend(e);
  };
  const getData = async () => {
    let data = [];
    const db = getFirestore(app);
    const querySnapshot = await getDocs(
      collection(db, "chats", exampleUser, "openai"),
      orderBy("timestamp")
    );
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setMessages(data);
  };
  const colorScheme = useColorScheme();
  const sendMessages = async () => {
    axios
      .post(
        `${knwlapi}/chatopenai`,
        {
          message: messageToSend,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + exampleUser,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, [messages]);
  try {
    return (
      <VersalBox>
        <VStack
          w={"full"}
          h="full"
          space={5}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <VStack height={"80%"} space={2}>
            <FlatList
              data={messages}
              renderItem={({ item, index }) => (
                <HStack
                  justifyContent={
                    item.uid == "openai" ? "flex-start" : "flex-end"
                  }
                >
                  <Box
                    margin={2}
                    p={5}
                    borderRadius={20}
                    bgColor={
                      item.uid == "openai"
                        ? colorScheme + ".accent"
                        : colorScheme + ".success"
                    }
                  >
                    <BrandText
                      color={"light.background"}
                      text={item.message}
                      size={20}
                    />
                  </Box>
                </HStack>
              )}
              keyExtractor={(item, index) => index}
            />
          </VStack>
          <HStack>
            <TextInput
              value={messageToSend}
              onChangeText={handleChange}
              placeholder="useless placeholder"
              style={{ width: "80%" }}
            />
            <Box width={50}>
              <BrandButton
                textcolor={colorScheme + ".background"}
                click={sendMessages}
                text={"Send"}
              />
            </Box>
          </HStack>
        </VStack>
      </VersalBox>
    );
  } catch (e) {
    console.log(e);
  }
};

export default Chat;
