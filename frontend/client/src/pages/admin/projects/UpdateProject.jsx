import React, { useEffect, useState } from "react";
import ProjectForm from "../../../components/admin/projects/ProjectForm";
import LoadingSpinner from "../../../components/utility/LoadingSpinner";
import { apiFetch } from "../../../functions/publicFetch";
import UseAuthFetch from "../../../hooks/useAuthFetch";
import { useLocation } from "react-router-dom";
import BackButton from "../../../components/utility/BackButton";
import {
  githubRepoNameRegex,
  githubUsernameRegex,
  githubRepoFilePathRegex
} from "../../../regex/regex";

function UpdateProject() {
  const id = useLocation()?.state?.id;
  const authFetch = UseAuthFetch();
  const [loading, setLoading] = useState(null);
  const [project, setProject] = useState(null);
  const [message, setMessage] = useState(
    "Please fill out all fields to update the project!"
  );
  const [repoError, setRepoError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [readmeError, setReadmeError] = useState(false);

  async function getProject() {
    try {
      setLoading(true);
      const { responseObject } = await apiFetch(`projects/${encodeURI(id)}`, "GET");
      if (responseObject?.data) {
        setProject(responseObject.data);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      getProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleUpdate(event) {
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
        const { responseObject } = await authFetch(
          "PATCH",
          `admin/projects/${encodeURI(id)}`,
          project
        );
        if (responseObject?.message) {
          setMessage(responseObject.message);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
      await getProject();
    }
  }
  function validateInput(repo, user, readmePath) {
    let validInput = true;
    if (!repo && !user && !readmePath) {
      setMessage("Nothing to update!");
      validInput = false;
    } else {
      if (repo && !githubRepoNameRegex.test(repo)) {
        setRepoError(true);
        validInput = false;
      } else {
        setRepoError(false);
      }
      if (user && !githubUsernameRegex.test(user)) {
        setUserError(true);
        validInput = false;
      } else {
        setUserError(false);
      }
      if (readmePath && !githubRepoFilePathRegex.test(readmePath)) {
        setReadmeError(true);
        validInput = false;
      } else {
        setReadmeError(false);
      }
    }
    return validInput;
  }

  return (
    <div className="UpdateProject hcenter column">
      <h2>Update project</h2>
      <p>{message}</p>
      {loading ? (
        <LoadingSpinner />
      ) : project ? (
        <ProjectForm
          onSubmit={handleUpdate}
          project={project}
          repoError={repoError}
          userError={userError}
          readmeError={readmeError}
        />
      ) : (
        <div className="column">
          <h2>Project not found</h2>
          <BackButton path="/admin/projects" />
        </div>
      )}
    </div>
  );
}

export default UpdateProject;
