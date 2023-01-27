import { Box, Center, HStack, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../../firebaseConfig";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";

import {
 
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import BrandButton from "../../constants/BrandButton";
import BrandText from "../../constants/BrandText";
import VersalBox from "../../constants/VersalBox";

WebBrowser.maybeCompleteAuthSession();

function Login() {
  const auth = getAuth(app);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "35313808604-lahi6a5db8n0uhjd92q07v0ddb176rv2.apps.googleusercontent.com",
  });


  
  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      // const credential = provider.credential(id_token);
      signInWithCredential(auth, GoogleAuthProvider.credential(id_token));
    }
  }, [response]);
  return (
    <VersalBox>
      <VStack space={5} w='full' h='full' alignItems={'center'} justifyContent={'center'}>
        <BrandButton text={'Join KWNL'} click={() => {
        promptAsync();
      }} />
        <Box alignItems={'center'} p={2} w='80%' borderRadius={20}>
          <BrandText
            text={"Authentication is always by Google"}
            color={"light.accentSecondary"}
          />
        </Box>
      </VStack>
    </VersalBox>
  );
}

export default Login;
