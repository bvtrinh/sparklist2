import React from "react";
import { Link as RouterLink } from "react-router-dom";
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
import { UserContext } from "../../../helpers/UserContext";

export const NavRight = () => {
  return (
    <UserContext.Consumer>
      {(context) => (
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton as={Button} color="white" variant={"link"} cursor={"pointer"}>
              <Avatar size={"sm"} src="/images/profile-placeholder.png" />{" "}
            </MenuButton>
            <MenuList color="black">
              <MenuItem as={RouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={context.logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </UserContext.Consumer>
  );
};
