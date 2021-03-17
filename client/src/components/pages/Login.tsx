import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { GoogleButton } from "../UI/GoogleButton";
import { TwitterButton } from "../UI/TwitterButton";

export const Login: React.FC = () => {
  return (
    <Box pt={5}>
      <Text fontSize="3xl">Login</Text>
      <GoogleButton />
      <TwitterButton />
    </Box>
  );
};
