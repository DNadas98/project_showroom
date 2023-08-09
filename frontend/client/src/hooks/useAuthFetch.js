import { useCallback } from "react";
import useAuth from "./auth/useAuth";
import useLogout from "./auth/useLogout";
import useRefresh from "./auth/useRefresh";

function UseAuthFetch() {
  const { auth } = useAuth();
  const logout = useLogout();
  const refresh = useRefresh();
  const apiUrl = process.env.REACT_APP_API_PRIV_URL;

  const apiFetch = useCallback(
    async (method, path, body) => {
      try {
        const url = `${apiUrl}/${path}`;
        const reqConfig = {
          method: `${method}`,
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        };
        if (auth?.accessToken) {
          reqConfig.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        if (body) {
          reqConfig.body = JSON.stringify(body);
        }

        let httpResponse = await fetch(url, reqConfig);

        if (
          (path !== "auth/login" && httpResponse.status === 401) ||
          (path !== "auth/login" && httpResponse.status === 403)
        ) {
          const refreshResponse = await refresh();
          const refreshedAccessToken = refreshResponse?.accessToken;
          if (refreshedAccessToken) {
            reqConfig.headers.Authorization = `Bearer ${refreshedAccessToken}`;
            httpResponse = await fetch(url, reqConfig);
            if (httpResponse.status === 401 || httpResponse.status === 403) {
              await logout();
              return null;
            }
          }
        }

        const responseObject = await httpResponse.json();

        return { "httpResponse": httpResponse, "responseObject": responseObject };
      } catch (err) {
        console.clear();
        return { "httpResponse": null, "responseObject": null };
      } finally {
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth.accessToken]
  );

  return apiFetch;
}

export default UseAuthFetch;
