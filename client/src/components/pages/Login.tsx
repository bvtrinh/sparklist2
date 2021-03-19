import React from "react";
import { VStack, Text } from "@chakra-ui/react";
import { GoogleButton } from "../UI/GoogleButton";
import { TwitterButton } from "../UI/TwitterButton";

export const Login: React.FC = () => {
  return (
    <VStack pt={5} align="start">
      <Text fontSize="3xl">Login</Text>
      <GoogleButton />
      <TwitterButton />
    </VStack>
  );
};
