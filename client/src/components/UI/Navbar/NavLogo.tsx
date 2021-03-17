import React from "react";
import { NavLink } from "./NavLink";
import { Flex, Image } from "@chakra-ui/react";

export const NavLogo = () => {
  return (
    <Flex>
      <Image src="/images/logo/logo128.png" w={8} h={8} mr={1} />
      <NavLink to="/" fontSize="2xl" fontWeight="bold">
        SparkList
      </NavLink>
    </Flex>
  );
};
