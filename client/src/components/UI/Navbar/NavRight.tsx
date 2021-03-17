import React from "react";
import {
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
} from "@chakra-ui/react";
import { NavLink } from "./NavLink";

export const NavRight = () => {
  return (
    <Flex alignItems={"center"}>
      <Menu>
        <MenuButton as={Button} color="white" variant={"link"} cursor={"pointer"}>
          <Avatar size={"sm"} src="/images/profile-placeholder.png" />{" "}
        </MenuButton>
        <MenuList color="black">
          <MenuItem>
            <NavLink to="#">Profile</NavLink>
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <NavLink to="#">Logout</NavLink>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
