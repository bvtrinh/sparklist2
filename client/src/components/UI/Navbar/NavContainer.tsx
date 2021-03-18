import React from "react";
import { Box, Flex, Container } from "@chakra-ui/react";

interface NavContainerProps {
  children: JSX.Element[];
}

export const NAV_COLOR = "#150135";

export const NavContainer: React.FC<NavContainerProps> = ({ children, ...props }) => {
  return (
    <Box mb={5} as="nav" bg={NAV_COLOR} boxShadow="lg" color="white" px={4}>
      <Container maxW={["100vw", "100vw", "100vw", "75vw"]}>
        <Flex
          py={4}
          w="100%"
          alignItems={{ base: "start", md: "center" }}
          justifyContent="space-between"
          wrap="wrap"
        >
          {children}
        </Flex>
      </Container>
    </Box>
  );
};
