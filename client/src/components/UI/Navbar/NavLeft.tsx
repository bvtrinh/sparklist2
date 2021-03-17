import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { NavLogo } from "./NavLogo";

interface NavLeftProps {
  isOpen: boolean;
}

export const NavLeft: React.FC<NavLeftProps> = ({ isOpen }) => {
  return (
    <Stack alignItems="center" direction={["column", "row", "row", "row"]}>
      <NavLogo />
      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          spacing={4}
          align="center"
          justify={["center", "space-between", "flex-start", "flex-start"]}
          direction={["column", "row", "row", "row"]}
          pt={[3, 3, 0, 0]}
        >
          <NavLink to="#">Dashboard</NavLink>
          <NavLink to="#">Add</NavLink>
          <NavLink to="#">Search</NavLink>
        </Stack>
      </Box>
    </Stack>
  );
};
