import React, { useEffect, useState } from "react";
import ProjectFileForm from "../../../components/admin/projects/ProjectFileForm";
import LoadingSpinner from "../../../components/utility/LoadingSpinner";
import UseAuthFetch from "../../../hooks/useAuthFetch";
import {
  fileNameRegex,
  githubRepoFilePathRegex,
  languageRegex,
  descriptionRegex
} from "../../../regex/regex";
import { apiFetch } from "../../../functions/publicFetch";
import { useLocation } from "react-router-dom";
import BackButton from "../../../components/utility/BackButton";

function UpdateProjectFile() {
  const projectId = useLocation()?.state?.projectId;
  const fileId = useLocation()?.state?.fileId;
  const authFetch = UseAuthFetch();
  const [loading, setLoading] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("Please fill out this form to add a new file!");
  const [nameError, setNameError] = useState(false);
  const [pathError, setPathError] = useState(false);
  const [languageError, setLanguageError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  async function getFile() {
    try {
      setLoading(true);
      const { responseObject } = await apiFetch(
        `projects/${encodeURI(projectId)}`,
        "GET"
      );
      if (responseObject?.data?.files?.length > 0) {
        const foundFile = responseObject.data.files.find((file) => file?._id === fileId);
        setFile(foundFile ?? null);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (projectId && fileId) {
      getFile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, fileId]);

  async function handleUpdateFile(event) {
    try {
      event.preventDefault();
      setLoading(true);
      setMessage("");
      const file = Object.fromEntries(new FormData(event.target).entries());
      file.projectId = projectId;
      file.fileId = fileId;
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
          `admin/projects/files/update`,
          file
        );
        if (responseObject?.message) {
          setMessage(responseObject.message);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
      await getFile();
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
      <h2>Update file</h2>
      <p>{message}</p>
      {loading ? (
        <LoadingSpinner />
      ) : file ? (
        <ProjectFileForm
          onSubmit={handleUpdateFile}
          file={file}
          nameError={nameError}
          pathError={pathError}
          languageError={languageError}
          descriptionError={descriptionError}
        />
      ) : (
        <div className="column">
          <h2>File not found</h2>
          <BackButton />
        </div>
      )}
    </div>
  );
}

export default UpdateProjectFile;
