import useAuth from "./useAuth";
import useLogout from "./useLogout";

function useRefresh() {
  const { setAuth } = useAuth();
  const logout = useLogout();
  async function refresh() {
    try {
      const apiUrl = process.env.REACT_APP_API_PRIV_URL;
      const path = "auth/refresh";
      const httpResponse = await fetch(`${apiUrl}/${path}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      });
      const responseObject = await httpResponse.json();
      if (
        httpResponse?.status === 200 &&
        responseObject?.username &&
        responseObject?.roles &&
        responseObject.accessToken
      ) {
        setAuth({
          "username": responseObject.username,
          "roles": responseObject.roles,
          "accessToken": responseObject?.accessToken
        });
        return responseObject;
      } else {
        return await logout();
      }
    } catch (err) {
      return await logout();
    }
  }
  return refresh;
}

export default useRefresh;
