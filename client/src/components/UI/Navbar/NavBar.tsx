import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { NavContainer } from "./NavContainer";
import { NavToggle } from "./NavToggle";
import { NavLeft } from "./NavLeft";
import { NavRight } from "./NavRight";
import { checkAuth } from "../../../helpers/authSession";

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <NavContainer>
      {checkAuth() ? <NavToggle isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> : undefined}
      <NavLeft isOpen={isOpen} />
      <NavRight />
    </NavContainer>
  );
};
