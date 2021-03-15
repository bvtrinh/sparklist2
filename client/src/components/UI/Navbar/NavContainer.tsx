import React from "react";
import { Box, Flex, Container } from "@chakra-ui/react";

interface NavbarContainerProps {
  children: JSX.Element[];
}

const NAV_COLOR = "#150135";

export const NavbarContainer: React.FC<NavbarContainerProps> = ({ children, ...props }) => {
  return (
    <Box bgColor={NAV_COLOR}>
      <Container maxW={["100vw", "100vw", "100vw", "75vw"]}>
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          w="100%"
          mb={8}
          p={5}
          bg={NAV_COLOR}
          color="white"
          {...props}
        >
          {children}
        </Flex>
      </Container>
    </Box>
  );
};
