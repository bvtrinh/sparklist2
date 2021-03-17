import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { NavContainer } from "./NavContainer";
import { NavToggle } from "./NavToggle";
import { NavLeft } from "./NavLeft";
import { NavRight } from "./NavRight";

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <NavContainer>
      <NavToggle isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <NavLeft isOpen={isOpen} />
      <NavRight />
    </NavContainer>
  );
};
