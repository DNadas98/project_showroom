import React from "react";
import BackButton from "../components/utility/BackButton";

function NotFound() {
  return (
    <div className="NotFound hcenter column">
      <h2>The page you are looking for does not exist.</h2>
      <BackButton />
    </div>
  );
}

export default NotFound;
