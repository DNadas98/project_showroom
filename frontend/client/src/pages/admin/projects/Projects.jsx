import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/utility/LoadingSpinner";
import { apiFetch } from "../../../functions/publicFetch";
import UseAuthFetch from "../../../hooks/useAuthFetch";
import ProjectsTable from "../../../components/admin/projects/ProjectsTable.jsx";
import Confirm from "../../../components/utility/Confirm";
import "../../../style/projects.css";

function Projects() {
  const authFetch = UseAuthFetch();
  const [loading, setLoading] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState(null);
  const [onConfirm, setOnConfirm] = useState(() => null);
  const [projects, setProjects] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getProjects() {
      try {
        setLoading(true);
        const { responseObject } = await apiFetch("projects", "GET");
        if (responseObject?.data?.length >= 1) {
          setProjects(responseObject.data);
          setFilteredProjects(responseObject.data);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    getProjects();
  }, []);
  function handleEdit(id) {
    navigate("/admin/projects/update", { state: { "id": id } });
  }

  async function handleDelete(id) {
    try {
      setLoading(true);
      const { httpResponse } = await authFetch(
        "DELETE",
        `admin/projects/${encodeURI(id)}`
      );
      if (httpResponse?.status === 200) {
        setProjects((prev) => {
          return [...prev].filter((project) => project._id !== id);
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function triggerDeleteConfirm(id) {
    setOnConfirm(() => () => handleDelete(id));
    setConfirmMessage("Project will be deleted.\nAre you sure?");
  }

  useEffect(() => {
    if (projects) {
      setFilteredProjects(
        [...projects].filter((project) =>
          project.repo.toLowerCase().includes(searchFilter.toLowerCase())
        )
      );
    }
  }, [projects, searchFilter]);

  return (
    <div className="Projects hcenter column">
      {confirmMessage && (
        <Confirm
          message={confirmMessage}
          onConfirm={onConfirm}
          setConfirmMessage={setConfirmMessage}
        />
      )}
      <h1>Manage Projects</h1>
      <div className="row">
        <Link to="/admin/projects/create">
          <button>New Project</button>
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
      ) : filteredProjects ? (
        <ProjectsTable
          projects={filteredProjects}
          onEdit={handleEdit}
          onDelete={triggerDeleteConfirm}
        />
      ) : (
        <h2>No projects found</h2>
      )}
    </div>
  );
}

export default Projects;
