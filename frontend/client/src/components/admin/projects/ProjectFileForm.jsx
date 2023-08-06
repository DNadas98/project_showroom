import React from "react";
import BackButton from "../../utility/BackButton";

function ProjectFileForm({
  onSubmit,
  file,
  nameError,
  pathError,
  languageError,
  descriptionError
}) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">
          <h3>File name</h3>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          minLength={1}
          maxLength={100}
          placeholder="3-100 characters"
          title="Enter 3-100 characters (alphanumeric, hyphens, and underscores)"
          defaultValue={file?.name ?? ""}
          autoFocus={true}
        />
        {nameError && (
          <p className="red error">
            Enter 1-100 characters (alphanumeric, hyphens, and underscores)
          </p>
        )}
      </div>
      <div>
        <label htmlFor="path">
          <h3>File path</h3>
        </label>
        <input
          type="text"
          id="path"
          name="path"
          minLength={1}
          maxLength={500}
          placeholder="1-500 characters"
          title="Enter 1-500 characters (alphanumeric, hyphens, underscores, slashes, and dots)"
          defaultValue={file?.path ?? ""}
        />
        {pathError && (
          <p className="red error">
            Enter 1-500 characters (alphanumeric, hyphens, underscores, slashes, and dots)
          </p>
        )}
      </div>
      <div>
        <label htmlFor="language">
          <h3>Language</h3>
        </label>
        <input
          type="text"
          id="language"
          name="language"
          minLength={1}
          maxLength={50}
          placeholder="1-50 characters"
          title="Enter 1-50 characters (alphanumeric, hyphens and underscores)"
          defaultValue={file?.language ?? ""}
        />
        {languageError && (
          <p className="red error">
            Enter 3-500 characters (alphanumeric, hyphens, underscores)
          </p>
        )}
      </div>

      <div className="row">
        <div>
          <label htmlFor="startLine">
            <h3>Start line</h3>
          </label>
          <input
            type="number"
            id="startLine"
            name="startLine"
            min={1}
            step={1}
            max={9999}
            title="The starting line for the code snippet"
            defaultValue={file?.startLine ?? 1}
          />
        </div>
        <div>
          <label htmlFor="endLine">
            <h3>End line</h3>
          </label>
          <input
            type="number"
            id="endLine"
            name="endLine"
            step={1}
            min={0}
            max={9999}
            title="The ending line for the code snippet, set to 0 to disable"
            defaultValue={file?.endLine ?? 0}
          />
        </div>
      </div>
      <div>
        <label htmlFor="description">
          <h3>Description</h3>
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          minLength={1}
          maxLength={500}
          placeholder="1-500 characters"
          title="Enter 1-500 characters (alphanumeric, common punctuation and line breaks)"
          defaultValue={file?.description ?? ""}
        />
        {descriptionError && (
          <p className="red error">
            Enter 1-500 characters (alphanumeric, common punctuation and line breaks)"
          </p>
        )}
      </div>
      <div>
        <button type="submit">Save</button>
        <BackButton />
      </div>
    </form>
  );
}

export default ProjectFileForm;
