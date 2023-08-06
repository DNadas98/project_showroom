import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/layout/NavBar";

function Layout() {
  const pageTitle = "Project Showroom";
  const name = "Daniel Nadas";
  const link = "https://github.com/DNadas98";
  const year = new Date().getFullYear();

  return (
    <div className="Layout">
      <header>
        <NavBar pageTitle={pageTitle} />
      </header>
      <main>
        <Outlet className="Outlet" />
      </main>
      <footer>
        <div className="row">
          <p>{pageTitle} </p>
          <p>
            {year} ©{" "}
            <a rel="noopener noreferrer" target="_blank" href={link} className="fade">
              {name}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
