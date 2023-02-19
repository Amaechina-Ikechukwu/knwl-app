import { View, Text, FlatList } from "react-native";
import React from "react";
import VersalBox from "../../../constants/VersalBox";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";

import { app } from "../../../firebaseConfig";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { Box, Input, VStack } from "native-base";
import BrandText from "../../../constants/BrandText";
const Chat = async () => {
  const [messages, setMessages] = useState();
  const [inputValue, setInputValue] = useState({
    messageToSend: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const getData = async () => {
    let data = [];
    const db = getFirestore(app);
    const querySnapshot = await getDocs(
      collection(db, "chats", "0I6spClhEyRd3OfPRQYxj1xmWFp1", "openai")
    );
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setMessages(data);
  };

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
            Authorization: "Bearer " + getAuth(app).currentUser.uid,
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
  }, []);

  return (
    <VersalBox>
      <VStack
        w={"full"}
        space={5}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <VStack>
          <FlatList
            data={messages}
            renderItem={({ item, index }) => (
              <Box marginBottom={2}>
                <BrandText text={item.message} size={10} />
              </Box>
            )}
            keyExtractor={(item, index) => index}
          />
        </VStack>
        <Input
          value={inputValue.messageToSend}
          onChange={handleChange}
          name={"sendToSend"}
          mx="3"
          placeholder="Input"
          w="100%"
        />
      </VStack>
    </VersalBox>
  );
};

export default Chat;
