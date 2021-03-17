import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Text, Link } from "@chakra-ui/react";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  fontSize?: string;
  fontWeight?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, children, ...rest }) => (
  <Link
    as={RouterLink}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
    }}
    to={to}
  >
    <Text {...rest}>{children}</Text>
  </Link>
);
