import React from "react";
import NavButton from "./NavButton";

function NavBar() {
  return (
    <nav>
      <NavButton path="/" text="About Me" />
      <NavButton path="/showroom" text="Project Showroom" />
    </nav>
  );
}

export default NavBar;
