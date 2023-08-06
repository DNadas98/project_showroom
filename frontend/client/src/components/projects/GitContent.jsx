import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/hljs";
import LoadingSpinner from "../utility/LoadingSpinner";
import { forwardFetch } from "../../functions/publicFetch";

function getSnippet(content, startLine, endLine) {
  if (startLine && startLine > 0) {
    startLine -= 1;
  } else {
    startLine = 0;
  }
  if (endLine && endLine > 0) {
    endLine -= 1;
    return content.split("\n").slice(startLine, endLine).join("\n");
  } else {
    return content.split("\n").slice(startLine).join("\n");
  }
}

function GitContent({ user, repo, fileToShow }) {
  const [loading, setLoading] = useState(null);
  const [gitContent, setGitContent] = useState("");

  useEffect(() => {
    async function getContent() {
      try {
        if (!fileToShow?.path || !fileToShow?.language) {
          throw new Error("Invalid file data");
        }
        setLoading(true);
        const path = `repos/${user}/${repo}/contents/${fileToShow.path}`;
        const { responseObject } = await forwardFetch(`git/${path}`);
        let content = atob(responseObject?.content);
        if (fileToShow?.startLine || fileToShow?.endLine) {
          content = getSnippet(content, fileToShow?.startLine, fileToShow?.endLine);
        }
        setGitContent(content);
      } catch (error) {
        setGitContent(null);
      } finally {
        setLoading(false);
      }
    }
    getContent();
  }, [user, repo, fileToShow]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="GitContent">
      {fileToShow?.description && fileToShow?.path && (
        <div className="Info column">
          <p>
            <a
              className="blue underline"
              href={`https://github.com/${user}/${repo}/blob/main/${fileToShow?.path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {fileToShow.path}
            </a>
          </p>
          <p>{fileToShow?.description}</p>
        </div>
      )}
      {gitContent ? (
        <div>
          {fileToShow?.language === "markdown" ? (
            <div className="GitMarkdownContent">
              <pre>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  className="ReactMarkdown"
                  children={gitContent}
                  linkTarget="_blank"
                />{" "}
              </pre>
            </div>
          ) : (
            <div className="GitCodeContent column">
              <SyntaxHighlighter
                language={fileToShow?.language}
                style={nord}
                customStyle={{
                  overflow: "hidden",
                  background: "transparent",
                  padding: "2rem"
                }}
              >
                {gitContent}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      ) : (
        <div className="column">
          <h3>
            Preview unavailable, please{" "}
            <a
              className="blue underline"
              href={`https://github.com/${user}/${repo}/blob/main/${fileToShow?.path}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              view the file on GitHub
            </a>
          </h3>
        </div>
      )}
    </div>
  );
}

export default GitContent;
