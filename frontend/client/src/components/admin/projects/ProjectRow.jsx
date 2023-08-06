import React from "react";
import { Link } from "react-router-dom";

function ProjectRow({ project, onEdit, onDelete }) {
  return (
    <>
      <tr key={`${project._id}-title`}>
        <td>{project.repo}</td>
        <td>{project.user}</td>
        <td>
          <Link to={`/admin/projects/files`} state={{ projectId: project?._id }}>
            <button className="smallButton">🗈</button>
          </Link>
        </td>
        <td>
          <button
            className="smallButton"
            onClick={() => {
              onEdit(project._id);
            }}
          >
            ✏️
          </button>
        </td>
        <td>
          <button
            className="smallButton"
            onClick={() => {
              onDelete(project._id);
            }}
          >
            ❌
          </button>
        </td>
      </tr>
    </>
  );
}

export default ProjectRow;
