import { View, Text, FlatList, useColorScheme, TextInput } from "react-native";
import React, { useLayoutEffect } from "react";
import VersalBox from "../../../constants/VersalBox";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";

import { app, dbase, userid } from "../../../firebaseConfig";
import {
  addDoc,
  collection,
  FieldValue,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { Box, HStack, Input, VStack } from "native-base";
import BrandText from "../../../constants/BrandText";
import { exampleUser } from "../../../assets/exampleuser";
import BrandButton from "../../../constants/BrandButton";
import { knwlapi } from "../../../assets/api";
import PureMessageChat from "./PureMessageChat";
import PureUnsentMessages from "./UnsentMessages/PureUnsentMessages";
import { useCallback } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      message: "hello",
      uid: Math.random(),
      timestamp: new Date(),
      isRead: true,
    },
  ]);
  const [unsentMessages, setUnsentMessage] = useState([]);
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
    setMessages(
      data.sort((a, b) => {
        return b.timestamp - a.timestamp;
      })
    );
  };
  const colorScheme = useColorScheme();
  const sendMessages = async () => {
    let update = [
      {
        message: messageToSend,
        uid: Math.random(),
        timestamp: {},
        isRead: true,
      },
    ];
    // setMessages((prev) => [{ ...prev, ...update }]);
    setMessagesToSend();

    axios
      .post(
        `${knwlapi}/chatopenai`,
        {
          message: messageToSend,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + exampleUser,
          },
        }
      )
      .then(function (response) {
        setUnsentMessage();
      })
      .catch(function (error) {
        console.log(error, " error axois");
      });
  };

  useEffect(() => {
    const db = getFirestore(app);
    const q = query(
      collection(db, "chats", exampleUser, "openai"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setMessages(data);
    });
    console.log(userid);
    //trying cache
    //     const qCache = query(
    //       collection(db, "chats", exampleUser, "openai"),
    //       orderBy("timestamp", "desc")
    //     );
    //  const unsubscribeII =   onSnapshot(qCache, { includeMetadataChanges: true }, (snapshot) => {
    //       snapshot.docChanges().forEach((change) => {
    //         if (change.type === "added") {
    //           console.log("New city: ", change.doc.data());
    //         }

    //         const source = snapshot.metadata.fromCache ? "local cache" : "server";
    //         console.log("Data came from " + source);
    //       });
    //     });
    return () => {
      unsubscribe;
    };
  }, []);
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
            <PureMessageChat unsent={unsentMessages} items={messages} />
            {/* <PureUnsentMessages items={unsentMessages} /> */}
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
