import React from "react";
import GitContentSelectorButton from "./GitContentSelectorButton";

function GitContentSelector({ readme, files, selectedFile, onSelect }) {
  return (
    <div>
      {readme && (
        <div className="row">
          <p>Project Info:</p>
          <GitContentSelectorButton
            selectedFile={selectedFile}
            onSelect={onSelect}
            file={{ ...readme, name: readme?.path }}
          />
        </div>
      )}
      {files?.length >= 1 && (
        <div className="column">
          <p>Code snippets from the project:</p>
          <div className="row">
            {files.map((file, i) => (
              <GitContentSelectorButton
                key={i}
                selectedFile={selectedFile}
                onSelect={onSelect}
                file={file}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GitContentSelector;
