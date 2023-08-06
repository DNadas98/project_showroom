import React, { useState } from "react";
import ProjectFileForm from "../../../components/admin/projects/ProjectFileForm";
import LoadingSpinner from "../../../components/utility/LoadingSpinner";
import UseAuthFetch from "../../../hooks/useAuthFetch";
import { useLocation } from "react-router-dom";
import {
  fileNameRegex,
  githubRepoFilePathRegex,
  languageRegex,
  descriptionRegex
} from "../../../regex/regex";

function AddProjectFile() {
  const projectId = useLocation()?.state?.projectId;
  const authFetch = UseAuthFetch();
  const [loading, setLoading] = useState(null);
  const [message, setMessage] = useState("Please fill out this form to add a new file!");
  const [nameError, setNameError] = useState(false);
  const [pathError, setPathError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  async function handleAddFile(event) {
    try {
      event.preventDefault();
      setLoading(true);
      setMessage("");
      const file = Object.fromEntries(new FormData(event.target).entries());
      file.projectId = projectId;
      if (file?.startLine === 0) {
        file.startLine = null;
      }
      if (parseInt(file?.endLine) === 0) {
        delete file.endLine;
      }
      const validInput = validateInput(
        file?.name,
        file?.path,
        file?.language,
        file?.startLine,
        file?.endLine,
        file?.description
      );
      if (validInput) {
        const { responseObject } = await authFetch(
          "PATCH",
          `admin/projects/files/add`,
          file
        );
        if (responseObject?.message) {
          setMessage(responseObject.message);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  function validateInput(name, path, language, description) {
    let validInput = true;
    if (!fileNameRegex.test(name)) {
      setNameError(true);
      validInput = false;
    } else {
      setNameError(false);
    }
    if (!githubRepoFilePathRegex.test(path)) {
      setPathError(true);
      validInput = false;
    } else {
      setPathError(false);
    }
    if (!languageRegex.test(language)) {
      setLanguageError(true);
      validInput = false;
    } else {
      setLanguageError(false);
    }
    if (!descriptionRegex.test(description)) {
      setDescriptionError(true);
      validInput = false;
    } else {
      setDescriptionError(false);
    }
    return validInput;
  }

  return (
    <div className="UpdateProject hcenter column">
      <h2>Add file</h2>
      <p>{message}</p>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ProjectFileForm
          onSubmit={handleAddFile}
          nameError={nameError}
          pathError={pathError}
          languageError={languageError}
          descriptionError={descriptionError}
        />
      )}
    </div>
  );
}

export default AddProjectFile;
