import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavButton({ path, text }) {
  const current = useLocation().pathname;
  return (
    <Link to={path}>
      <button className="fit" disabled={current === path ? true : false}>
        {text}
      </button>
    </Link>
  );
}

export default NavButton;
