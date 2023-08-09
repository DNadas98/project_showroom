import React from "react";
import NavButton from "./NavButton";

function NavBar() {
  return (
    <nav>
      <NavButton path="/" text="About Me" />
      <NavButton path="/showroom" text="Projects" />
      <NavButton path="/contacts" text="Contacts" />
    </nav>
  );
}

export default NavBar;
