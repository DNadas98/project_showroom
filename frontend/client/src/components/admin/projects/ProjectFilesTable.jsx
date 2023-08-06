import React from "react";
import ProjectFileRow from "./ProjectFileRow";

function ProjectFilesTable({ files, onEdit, onDelete }) {
  return (
    <table className="ProjectFilesTable">
      <thead>
        <tr>
          <th className="Name">Name</th>
          <th>Language</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <ProjectFileRow
            key={file._id}
            file={file}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ProjectFilesTable;
