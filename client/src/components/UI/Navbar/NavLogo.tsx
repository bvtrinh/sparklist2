import React from "react";
import { MenuItem } from "./MenuList";
import { Flex, Image } from "@chakra-ui/react";

export const NavLogo = () => {
  return (
    <Flex>
      <Image src="/images/logo/logo128.png" w={8} h={8} mr={1} />
      <MenuItem to="/" fontSize="2xl" fontWeight="bold">
        SparkList
      </MenuItem>
    </Flex>
  );
};
