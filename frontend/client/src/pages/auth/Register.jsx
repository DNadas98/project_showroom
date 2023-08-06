import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPrivFetch } from "../../functions/publicFetch";
import LoadingSpinner from "../../components/utility/LoadingSpinner";
import Confirm from "../../components/utility/Confirm";
import { usernameRegex, passwordRegex } from "../../regex/regex";
import UserFormConfirm from "../../components/auth/UserFormConfirm";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [onConfirm, setOnConfirm] = useState(() => null);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setResultMessage("");
      const { username, password, confirmPassword } = Object.fromEntries(
        new FormData(event.target).entries()
      );
      const validInput = validateInput(username, password, confirmPassword);
      if (validInput) {
        setOnConfirm(() => () => {
          handleRegister(username, password);
        });
        setConfirmMessage(
          `Create user account "${username}"?\nYou will be redirected to login`
        );
      }
    } catch (err) {
      setResultMessage("Failed to create user");
    }
  }

  function validateInput(username, password, confirmPassword) {
    let validInput = true;
    if (!username || !password || !confirmPassword) {
      setResultMessage("All fields are required!");
      validInput = false;
    } else if (password !== confirmPassword) {
      setResultMessage("Passwords don't match");
      validInput = false;
    } else {
      if (!usernameRegex.test(username)) {
        setUsernameError(true);
        validInput = false;
      } else {
        setUsernameError(false);
      }
      if (!passwordRegex.test(password)) {
        setPasswordError(true);
        validInput = false;
      } else {
        setPasswordError(false);
      }
    }
    return validInput;
  }

  async function handleRegister(username, password) {
    try {
      setLoading(true);
      const { httpResponse, responseObject } = await apiPrivFetch("users", "POST", {
        "username": username,
        "password": password
      });
      setResultMessage(responseObject.message);
      if (httpResponse.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setResultMessage("Failed to create user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Register hcenter column">
      {confirmMessage && (
        <Confirm
          message={confirmMessage}
          onConfirm={onConfirm}
          setConfirmMessage={setConfirmMessage}
        />
      )}
      <h1>Create Account</h1>
      {resultMessage ? (
        <p className="red">{resultMessage}</p>
      ) : (
        <p>Enter your username and password to register!</p>
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <UserFormConfirm
          onSubmit={handleSubmit}
          submitText="Send"
          usernameError={usernameError}
          passwordError={passwordError}
        />
      )}
    </div>
  );
}

export default Register;
