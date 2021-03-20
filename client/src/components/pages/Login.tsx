import React from "react";
import { useHistory } from "react-router-dom";
import { VStack, Heading } from "@chakra-ui/react";
import { GoogleButton } from "../UI/GoogleButton";
import { TwitterButton } from "../UI/TwitterButton";
import { checkAuth } from "../../helpers/authSession";

export const Login: React.FC = () => {
  const history = useHistory();
  if (checkAuth()) history.push("/");
  return (
    <VStack align="start">
      <Heading>Login</Heading>
      <GoogleButton />
      <TwitterButton />
    </VStack>
  );
};
