import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/utility/LoadingSpinner";
import { apiFetch } from "../../../functions/publicFetch";
import UseAuthFetch from "../../../hooks/useAuthFetch";
import Confirm from "../../../components/utility/Confirm";
import "../../../style/projects.css";
import GitRepoData from "../../../components/projects/GitRepoData";
import BackButton from "../../../components/utility/BackButton";
import ProjectFilesTable from "../../../components/admin/projects/ProjectFilesTable";

function ProjectFiles() {
  const projectId = useLocation()?.state?.projectId;
  const authFetch = UseAuthFetch();
  const [loading, setLoading] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [onConfirm, setOnConfirm] = useState(() => null);
  const [files, setFiles] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [filteredFiles, setFilteredFiles] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getFiles() {
      try {
        setLoading(true);
        const { responseObject } = await apiFetch(`projects/${projectId}`, "GET");
        if (responseObject?.data?.repo && responseObject?.data?.user) {
          setProjectData({
            repo: responseObject.data.repo,
            user: responseObject.data.user
          });
        } else {
          setProjectData(null);
        }
        if (responseObject?.data?.files?.length > 0) {
          setFiles(responseObject?.data?.files);
          setFilteredFiles(responseObject?.data?.files);
        } else {
          setFiles(null);
          setFilteredFiles(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function handleEdit(id) {
    navigate("/admin/projects/files/update", {
      state: { "fileId": id, "projectId": projectId }
    });
  }

  async function handleDelete(id) {
    try {
      setLoading(true);
      const { httpResponse } = await authFetch("PATCH", `admin/projects/files/delete`, {
        "projectId": projectId,
        "fileId": id
      });
      if (httpResponse?.status === 200) {
        setFiles((prev) => {
          return [...prev].filter((file) => file._id !== id);
        });
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  function triggerDeleteConfirm(id) {
    setOnConfirm(() => () => handleDelete(id));
    setConfirmMessage("File will be deleted.\nAre you sure?");
  }

  useEffect(() => {
    if (files) {
      setFilteredFiles(
        [...files].filter((file) =>
          file.name.toLowerCase().includes(searchFilter.toLowerCase())
        )
      );
    }
  }, [files, searchFilter]);

  return projectId ? (
    <div className="ProjectFiles hcenter column">
      {confirmMessage && (
        <Confirm
          message={confirmMessage}
          onConfirm={onConfirm}
          setConfirmMessage={setConfirmMessage}
        />
      )}
      {projectData && <GitRepoData user={projectData.user} repo={projectData.repo} />}
      <div className="row">
        <Link to={`/admin/projects/files/add`} state={{ "projectId": projectId }}>
          <button>New File</button>
        </Link>
        <input
          type="search"
          name="searchfield"
          placeholder="Search"
          value={searchFilter}
          onChange={(event) => {
            setSearchFilter(event.target.value);
          }}
        />
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : filteredFiles?.length > 0 ? (
        <div className="column">
          <ProjectFilesTable
            files={filteredFiles}
            onEdit={handleEdit}
            onDelete={triggerDeleteConfirm}
          />
          <BackButton path="/admin/projects" text="Back to projects" />
        </div>
      ) : (
        <div className="column">
          <h2>No files found</h2>
          <BackButton path="/admin/projects" />
        </div>
      )}
    </div>
  ) : (
    <div className="hcenter column">
      <h2>Project not found</h2>
      <BackButton path="/admin/projects" />
    </div>
  );
}

export default ProjectFiles;
