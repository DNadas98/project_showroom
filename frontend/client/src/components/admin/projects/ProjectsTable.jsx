import React from "react";
import ProjectRow from "./ProjectRow";

function ProjectsTable({ projects, onEdit, onDelete }) {
  return (
    <table className="ProjectsTable">
      <thead>
        <tr>
          <th className="Repo">Repository name</th>
          <th>Username</th>
          <th>Files</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <ProjectRow
            key={project._id}
            project={project}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ProjectsTable;
