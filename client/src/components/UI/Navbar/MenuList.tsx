import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Stack, Link, Text } from "@chakra-ui/react";

interface MenuItemProps {
  to: string;
  children: string | JSX.Element;
  fontSize?: string;
  fontWeight?: string;
  isLast?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link as={RouterLink} to={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

interface MenuListProps {
  isOpen: boolean;
}

export const MenuList: React.FC<MenuListProps> = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-start", "flex-start"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/profile">Profile</MenuItem>
        <MenuItem to="/logout">Logout</MenuItem>
      </Stack>
    </Box>
  );
};
