import React, { useEffect, useState } from "react";
import useRefresh from "../../hooks/auth/useRefresh";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingSpinner from "../utility/LoadingSpinner";

function RefreshHandler({ allowedRoles }) {
  const location = useLocation();
  const refresh = useRefresh();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    async function handleRefresh() {
      try {
        const refreshResponse = await refresh();
        if (
          refreshResponse?.username &&
          refreshResponse?.accessToken &&
          refreshResponse?.roles?.find((role) => allowedRoles.includes(role))
        ) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }
    handleRefresh();
  }, [allowedRoles, refresh]);
  return loading ? (
    <LoadingSpinner />
  ) : authorized ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RefreshHandler;
