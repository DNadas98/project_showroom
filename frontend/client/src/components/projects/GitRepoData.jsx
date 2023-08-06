import React, { useEffect, useState } from "react";
import LoadingSpinner from "../utility/LoadingSpinner";
import { forwardFetch } from "../../functions/publicFetch";
import GitRepoDetails from "./GitRepoDetails";

function GitRepoData({ user, repo }) {
  const [loading, setLoading] = useState(null);
  const [gitData, setGitData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const { responseObject } = await forwardFetch(`git/repos/${user}/${repo}`);
        if (responseObject?.size > 0) setGitData(responseObject);
        else setGitData(null);
      } catch (error) {
        setGitData(null);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [user, repo]);

  if (loading) {
    return <LoadingSpinner />;
  } else
    return (
      <div className="GitRepoData column">
        {gitData ? <GitRepoDetails repo={gitData} /> : <h2>Not Found</h2>}
      </div>
    );
}

export default GitRepoData;
