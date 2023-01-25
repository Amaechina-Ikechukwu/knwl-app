import { Center, HStack } from "native-base";
import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../../firebaseConfig";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import BrandButton from "../../constants/BrandButton";
import BrandText from "../../constants/BrandText";

WebBrowser.maybeCompleteAuthSession();

function Login() {
  const auth = getAuth(app);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "Your-Web-Client-ID.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);
  return (
    <Center>
      <HStack>
        <BrandButton>
          <BrandText text={"Join KWNL"} />
        </BrandButton>
        <Box bg={"light.successShade"} p={10}>
          <BrandText
            text={"Authentication is always by Google"}
            color={"light.accent"}
          />
        </Box>
      </HStack>
    </Center>
  );
}

export default Login;
