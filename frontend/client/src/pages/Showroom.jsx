import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../style/projects.css";
import { apiFetch } from "../functions/publicFetch";
import LoadingSpinner from "../components/utility/LoadingSpinner";
import GitContent from "../components/projects/GitContent";
import GitRepoData from "../components/projects/GitRepoData";
import GitContentSelector from "../components/projects/GitContentSelector";

function Showroom() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(null);
  const [projects, setProjects] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const selectedIndex = projects?.findIndex(
    (project) => project?._id === selectedProject?._id
  );
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    async function getProjects() {
      try {
        setLoading(true);
        const { responseObject } = await apiFetch("projects", "GET");
        if (responseObject?.data?.length > 0) {
          setProjects(responseObject.data);
          const query = getSelectedFromQuery(responseObject.data);
          if (query?.foundProject) {
            setSelectedProject(query.foundProject);
            if (query?.foundFile) {
              setSelectedFile(query.foundFile);
            } else {
              setSelectedFile(null);
            }
          } else {
            handleProjectSelect(responseObject.data[0]);
          }
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.project]);

  function getSelectedFromQuery(data) {
    try {
      const queryProject = searchParams.get("project");
      const queryFile = searchParams.get("file");
      if (queryProject) {
        const decodedRepoName = decodeURIComponent(queryProject);
        const decodedFileName = decodeURIComponent(queryFile);
        const foundProject = data.find((project) => project.repo === decodedRepoName);
        let foundFile = null;
        if (decodedFileName === foundProject.readme?.path) {
          foundFile = {
            ...foundProject.readme,
            name: foundProject.readme?.path
          };
        } else if (foundProject?.files?.length > 0) {
          foundFile = foundProject.files.find((file) => file.name === decodedFileName);
        }
        return { foundProject, foundFile };
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  function handleProjectSelect(newSelectedProject) {
    setSelectedProject(newSelectedProject);
    const query = { project: encodeURIComponent(newSelectedProject.repo) };
    const readmeFile = newSelectedProject.readme;
    if (readmeFile) {
      setSelectedFile({
        ...readmeFile,
        name: readmeFile?.path
      });
      query.file = encodeURIComponent(newSelectedProject.readme?.path);
    } else {
      query.file = "";
      setSelectedFile(null);
    }
    setSearchParams(query);
  }

  function handleFileSelect(file) {
    setSelectedFile(file);
    const queryProject = searchParams.get("project");
    setSearchParams({
      project: queryProject,
      file: encodeURIComponent(file?.name ?? "")
    });
  }

  return (
    <div className="Showroom column">
      <div className="Info column">
        <p>
          Project Showroom is a GitHub REST API integration I have developed to present my
          projects dynamically through my full-stack web application.
        </p>
        <p>
          <a
            className="blue underline"
            href="https://github.com/DNadas98/project_showroom"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Project Showroom on GitHub for details!
          </a>
        </p>
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : selectedProject ? (
        <div className="column">
          <GitRepoData user={selectedProject?.user} repo={selectedProject?.repo} />
          <div className="row">
            <button
              className="smallButton"
              disabled={selectedIndex === 0}
              onClick={() => {
                handleProjectSelect(projects[selectedIndex - 1]);
              }}
            >
              {"◀"}
            </button>
            <button
              className="smallButton"
              disabled={selectedIndex === projects?.length - 1}
              onClick={() => {
                handleProjectSelect(projects[selectedIndex + 1]);
              }}
            >
              {"▶"}
            </button>
          </div>
          <GitContentSelector
            readme={selectedProject?.readme}
            files={selectedProject?.files}
            selectedFile={selectedFile}
            onSelect={handleFileSelect}
          />
          {selectedFile ? (
            <GitContent
              user={selectedProject?.user}
              repo={selectedProject?.repo}
              fileToShow={selectedFile}
            />
          ) : (
            <div className="column">
              <h3>Select a file to view its content!</h3>
            </div>
          )}
        </div>
      ) : (
        <div className="column">
          <h2>No projects found</h2>
        </div>
      )}
    </div>
  );
}

export default Showroom;
