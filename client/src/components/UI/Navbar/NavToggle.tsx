import React from "react";
import { IconButton } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { NAV_COLOR } from "./NavContainer";

interface NavToggleProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const NavToggle: React.FC<NavToggleProps> = ({ isOpen, onOpen, onClose }) => {
  return (
    <IconButton
      bg={NAV_COLOR}
      size={"md"}
      icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
      aria-label={"Open Menu"}
      display={{ md: !isOpen ? "none" : "inherit" }}
      onClick={isOpen ? onClose : onOpen}
    />
  );
};
