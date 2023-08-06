import React from "react";

function GitContentSelectorButton({ selectedFile, onSelect, file }) {
  const isSelected = selectedFile?.name === file.name;

  const handleClick = () => {
    if (!isSelected) {
      onSelect(file);
    } else {
      onSelect(null);
    }
  };

  return (
    <button className={isSelected ? "selected fit" : "fit"} onClick={handleClick}>
      {file.name}
    </button>
  );
}

export default GitContentSelectorButton;
