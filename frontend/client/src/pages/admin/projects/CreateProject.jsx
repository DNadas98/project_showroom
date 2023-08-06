import React, { useState } from "react";
import ProjectForm from "../../../components/admin/projects/ProjectForm";
import LoadingSpinner from "../../../components/utility/LoadingSpinner";
import UseAuthFetch from "../../../hooks/useAuthFetch";
import {
  githubRepoNameRegex,
  githubUsernameRegex,
  githubRepoFilePathRegex
} from "../../../regex/regex";

function CreateProject() {
  const authFetch = UseAuthFetch();
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState("Please fill out all fields!");
  const [repoError, setRepoError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [readmeError, setReadmeError] = useState(false);

  async function handleCreate(event) {
    try {
      event.preventDefault();
      setLoading(true);
      setMessage("");
      const form = Object.fromEntries(new FormData(event.target).entries());
      const validInput = validateInput(form?.repo, form?.user, form?.readmePath);
      if (validInput) {
        const project = {
          "repo": form.repo,
          "user": form.user,
          "readme": { "path": form.readmePath }
        };
        const { responseObject } = await authFetch("POST", "admin/projects", project);
        if (responseObject?.message) {
          setMessage(responseObject.message);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  function validateInput(repo, user, readmePath) {
    let validInput = true;
    if (!repo || !user || !readmePath) {
      setMessage("All fields are required!");
      validInput = false;
    } else {
      if (!githubRepoNameRegex.test(repo)) {
        setRepoError(true);
        validInput = false;
      } else {
        setRepoError(false);
      }
      if (!githubUsernameRegex.test(user)) {
        setUserError(true);
        validInput = false;
      } else {
        setUserError(false);
      }
      if (!githubRepoFilePathRegex.test(readmePath)) {
        setReadmeError(true);
        validInput = false;
      } else {
        setReadmeError(false);
      }
    }
    return validInput;
  }

  return (
    <div className="CreateProject hcenter column">
      <h2>Create new project</h2>
      <p>{message}</p>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ProjectForm
          onSubmit={handleCreate}
          repoError={repoError}
          userError={userError}
          readmeError={readmeError}
        />
      )}
    </div>
  );
}

export default CreateProject;
