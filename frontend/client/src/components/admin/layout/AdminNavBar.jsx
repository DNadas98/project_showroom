import React from "react";
import useLogout from "../../../hooks/auth/useLogout";
import NavButton from "../../layout/NavButton";

function NavBar() {
  const logout = useLogout();

  return (
    <nav>
      <NavButton path="/admin/projects" text="Projects" />
      <NavButton path="/admin/account" text="Account" />
      <button
        className="fit"
        onClick={() => {
          logout(true);
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default NavBar;
