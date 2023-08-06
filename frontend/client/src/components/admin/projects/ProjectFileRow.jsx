import React from "react";

function ProjectFileRow({ file, onEdit, onDelete }) {
  return (
    <tr key={`${file._id}-title`}>
      <td>{file.name}</td>
      <td>{file.language}</td>
      <td>
        <button
          className="smallButton"
          onClick={() => {
            onEdit(file._id);
          }}
        >
          ✏️
        </button>
      </td>
      <td>
        <button
          className="smallButton"
          onClick={() => {
            onDelete(file._id);
          }}
        >
          ❌
        </button>
      </td>
    </tr>
  );
}

export default ProjectFileRow;
