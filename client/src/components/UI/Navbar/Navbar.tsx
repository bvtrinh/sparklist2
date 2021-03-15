import React, { useState } from "react";
import { MenuToggle } from "./MenuToggle";
import { NavLogo } from "./NavLogo";
import { MenuList } from "./MenuList";
import { NavbarContainer } from "./NavContainer";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  return (
    <NavbarContainer>
      <NavLogo />
      <MenuToggle isOpen={isOpen} toggle={toggle} />
      <MenuList isOpen={isOpen} />
    </NavbarContainer>
  );
};
