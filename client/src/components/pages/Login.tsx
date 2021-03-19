import React from "react";
import { VStack, Heading } from "@chakra-ui/react";
import { GoogleButton } from "../UI/GoogleButton";
import { TwitterButton } from "../UI/TwitterButton";

export const Login: React.FC = () => {
  return (
    <VStack align="start">
      <Heading>Login</Heading>
      <GoogleButton />
      <TwitterButton />
    </VStack>
  );
};
