import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import UseAuthFetch from "../../hooks/useAuthFetch";
import LoadingSpinner from "../../components/utility/LoadingSpinner";
import { usernameRegex, passwordRegex } from "../../regex/regex";
import UserForm from "../../components/auth/UserForm";

function Login() {
  const { setAuth } = useAuth();
  const authFetch = UseAuthFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState(null);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  async function handleSubmit(event) {
    try {
      event.preventDefault();

      const { username, password } = Object.fromEntries(
        new FormData(event.target).entries()
      );

      const validInput = validateInput(username, password);

      if (validInput) {
        await handleLogin(username, password);
      }
    } catch (err) {
      setResultMessage("Login failed");
    }
  }

  function validateInput(username, password) {
    let validInput = true;
    if (!username || !password) {
      setResultMessage("All fields are required!");
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

  async function handleLogin(username, password) {
    try {
      setLoading(true);
      const { httpResponse, responseObject } = await authFetch("POST", "auth/login", {
        "username": username,
        "password": password
      });
      const accessToken = responseObject?.accessToken;
      const receivedUsername = responseObject?.username;
      const receivedRoles = responseObject?.roles;
      if (
        httpResponse?.status === 200 &&
        accessToken &&
        receivedUsername &&
        receivedRoles
      ) {
        setAuth({
          "username": receivedUsername,
          "roles": receivedRoles,
          "accessToken": accessToken
        });
        navigate("/admin/projects");
      } else if (responseObject?.message) {
        setResultMessage(responseObject.message);
      } else {
        throw new Error("");
      }
    } catch (err) {
      setResultMessage("Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Login hcenter column">
      <h1>Login</h1>
      {resultMessage ? (
        <p>{resultMessage}</p>
      ) : (
        <div className="column">
          <p>Enter your name and password to log in!</p>
          <p>Currently only available for Admin accounts.</p>
        </div>
      )}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <UserForm
          onSubmit={handleSubmit}
          submitText="Login"
          usernameError={usernameError}
          passwordError={passwordError}
        />
      )}
    </div>
  );
}

export default Login;
