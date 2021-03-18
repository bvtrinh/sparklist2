import React from "react";
import { Box, Stack, Icon } from "@chakra-ui/react";
import { MdDashboard } from "react-icons/md";
import { FaPlus, FaSearch } from "react-icons/fa";
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
          spacing={2}
          align="center"
          justify={["center", "space-between", "flex-start", "flex-start"]}
          direction={["column", "row", "row", "row"]}
          pt={[3, 3, 0, 0]}
        >
          <NavLink to="/">
            <Icon as={MdDashboard} /> Dashboard
          </NavLink>
          <NavLink to="#">
            <Icon as={FaPlus} /> Add
          </NavLink>
          <NavLink to="#">
            <Icon as={FaSearch} /> Search
          </NavLink>
        </Stack>
      </Box>
    </Stack>
  );
};
