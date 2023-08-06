import React from "react";
import BackButton from "../../components/utility/BackButton";

function Unauthorized() {
  return (
    <div className="Unauthorized hcenter column">
      <h1>Unauthorized</h1>
      <BackButton path={"/login"} />
    </div>
  );
}

export default Unauthorized;
