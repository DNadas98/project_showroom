import React from "react";
import { format } from "date-fns";

function GitRepoDetails({ repo }) {
  return (
    <>
      <div className="GitRepoTitle row">
        <img src={repo?.owner?.avatar_url} alt="profile_picture" />
        <div className="column">
          <h2>{repo?.owner?.login}</h2>
          <a rel="noreferrer" target="_blank" href={repo?.html_url} className="blue">
            <h1>{repo?.name}</h1>
          </a>
        </div>
      </div>
      <div className="GitRepoDetails">
        <table>
          <tbody>
            <tr>
              <td className="right">Main language</td>
              <td>{repo?.language}</td>
            </tr>
            <tr>
              <td className="right">Created at</td>
              <td>{format(new Date(repo?.created_at), "yyyy.MM.dd HH:mm")}</td>
            </tr>
            <tr>
              <td className="right">Last update</td>
              <td>{format(new Date(repo?.pushed_at), "yyyy.MM.dd HH:mm")}</td>
            </tr>
            {repo?.stargazers_count >= 1 && (
              <tr>
                <td className="right">Stars</td>
                <td>{repo?.stargazers_count}</td>
              </tr>
            )}
            {repo?.watchers_count >= 1 && (
              <tr>
                <td className="right">Watchers</td>
                <td>{repo?.watchers_count}</td>
              </tr>
            )}
            {repo?.open_issues_count >= 1 && (
              <tr>
                <td className="right">Open Issues</td>
                <td>{repo?.open_issues_count}</td>
              </tr>
            )}
            {repo?.forks_count >= 1 && (
              <tr>
                <td className="right">Forks</td>
                <td>{repo?.forks_count}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GitRepoDetails;
