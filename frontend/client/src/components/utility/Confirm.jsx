import React, { useEffect } from "react";
import "../../style/confirm.css";

function Confirm({ onConfirm, message, setConfirmMessage }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Tab" || event.key === "Enter") {
        event.preventDefault();
      }
    }
    function handleFocusOut(event) {
      event.preventDefault();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);
  return (
    <div className="Confirm">
      <div className="ConfirmBox">
        <h3>{message}</h3>
        <div className="row" autoFocus={true}>
          <button
            autoFocus={true}
            onClick={() => {
              onConfirm();
              setConfirmMessage(null);
            }}
          >
            Confirm
          </button>
          <button
            onClick={() => {
              setConfirmMessage(null);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
