import React, { useEffect, useState } from "react";
import useAuthFetch from "../../../hooks/useAuthFetch";
import useLogout from "../../../hooks/auth/useLogout";
import Confirm from "../../../components/utility/Confirm";
import LoadingSpinner from "../../../components/utility/LoadingSpinner";
import { usernameRegex, passwordRegex } from "../../../regex/regex";
import UserFormConfirm from "../../../components/auth/UserFormConfirm";
import { format } from "date-fns";

function Account() {
  const authFetch = useAuthFetch();
  const logout = useLogout();
  const [user, setUser] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [onConfirm, setOnConfirm] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getUserData() {
      try {
        setLoading(true);
        const { responseObject } = await authFetch("GET", "users");
        if (responseObject?.data) {
          const userData = responseObject.data;
          if (userData.createdAt) {
            userData.createdAt = format(
              new Date(userData?.createdAt),
              "yyyy.MM.dd. HH:mm"
            );
          }
          if (userData.updatedAt) {
            userData.updatedAt = format(
              new Date(userData?.updatedAt),
              "yyyy.MM.dd. HH:mm"
            );
          }
          setUser(userData);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const { username, password, confirmPassword } = Object.fromEntries(
        new FormData(event.target).entries()
      );
      const validInput = validateInput(username, password, confirmPassword);
      if (validInput) {
        setOnConfirm(() => () => {
          handleUpdate(username, password);
        });
        setConfirmMessage(
          "Are you sure you want to update your user settings?\nYou will be required to log in again."
        );
      }
    } catch (err) {
      setResultMessage("Failed to update settings");
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

  async function handleUpdate(username, password) {
    try {
      setLoading(true);
      let requestBody = {};
      if (username) {
        requestBody.newUsername = username;
      }
      if (password) {
        requestBody.newPassword = password;
      }
      const { httpResponse, responseObject } = await authFetch(
        "PATCH",
        "users",
        requestBody
      );
      if (httpResponse.status === 200 && responseObject?.message) {
        await logout();
      } else if (responseObject?.message) {
        setResultMessage(responseObject.message);
      } else {
        setResultMessage("Failed to update settings");
      }
    } catch (err) {
      setResultMessage("Failed to update settings");
    } finally {
      setLoading(false);
    }
  }

  async function fetchDelete() {
    try {
      setLoading(true);
      const { httpResponse, responseObject } = await authFetch("DELETE", "users");
      if (httpResponse.status === 200 && responseObject?.message) {
        await logout();
      } else if (responseObject?.message) {
        setResultMessage(responseObject.message);
      } else {
        setResultMessage("Failed to delete account");
      }
    } catch (err) {
      setResultMessage("Failed to delete account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="UserSettings hcenter">
      {loading ? (
        <LoadingSpinner />
      ) : (
        user && (
          <div className="column">
            {confirmMessage && (
              <Confirm
                onConfirm={onConfirm}
                message={confirmMessage}
                setConfirmMessage={setConfirmMessage}
              />
            )}
            <h1>Welcome {user?.username}!</h1>
            <table>
              <tbody>
                <tr>
                  <td className="right">Created at: </td>
                  <td>{user?.createdAt}</td>
                </tr>
                <tr>
                  <td className="right">Updated at: </td>
                  <td>{user?.updatedAt}</td>
                </tr>
                <tr>
                  <td className="right">Roles: </td>
                  <td>{user?.roles?.join(", ")}</td>
                </tr>
              </tbody>
            </table>
            {resultMessage ? (
              <h3 className="red">{resultMessage}</h3>
            ) : (
              <h3>Please fill out all fields to update</h3>
            )}
            <UserFormConfirm
              onSubmit={handleSubmit}
              user={user}
              submitText="Update"
              usernameError={usernameError}
              passwordError={passwordError}
            />
            <button
              onClick={() => {
                setOnConfirm(() => fetchDelete);
                setConfirmMessage(
                  "Are you sure you want to delete your account?\nThis action is irreversible."
                );
              }}
            >
              Delete account
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default Account;
