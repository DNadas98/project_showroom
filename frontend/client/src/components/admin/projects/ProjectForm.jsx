import React from "react";
import BackButton from "../../utility/BackButton";

function ProjectForm({ onSubmit, project, repoError, userError, readmeError }) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="repo">
          <h3>Repository name</h3>
        </label>
        <input
          type="text"
          id="repo"
          name="repo"
          minLength={3}
          maxLength={100}
          placeholder="3-100 characters"
          title="Enter 3-100 characters (alphanumeric, hyphens, and underscores)"
          defaultValue={project?.repo ?? ""}
          autoFocus={true}
        />
        {repoError && (
          <p className="red error">
            Enter 3-100 characters (alphanumeric, hyphens, and underscores)
          </p>
        )}
      </div>
      <div>
        <label htmlFor="user">
          <h3>Username</h3>
        </label>
        <input
          type="text"
          id="user"
          name="user"
          minLength={3}
          maxLength={39}
          placeholder="3-39 characters"
          title="Enter 3-39 characters (alphanumeric and hyphens)"
          defaultValue={project?.user ?? ""}
        />
        {userError && (
          <p className="red error">Enter 3-39 characters (alphanumeric and hyphens)</p>
        )}
      </div>
      <div>
        <label htmlFor="readmePath">
          <h3>Readme</h3>
        </label>
        <input
          type="text"
          id="readmePath"
          name="readmePath"
          minLength={3}
          maxLength={500}
          placeholder="3-500 characters"
          title="Enter 3-500 characters (alphanumeric, hyphens, underscores, slashes, and dots)"
          defaultValue={project?.readme?.path ?? ""}
        />
        {readmeError && (
          <p className="red error">
            Enter 3-500 characters (alphanumeric, hyphens, underscores, slashes, and dots)
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

export default ProjectForm;
