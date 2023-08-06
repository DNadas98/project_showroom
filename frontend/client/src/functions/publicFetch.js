export async function apiFetch(path, method = "GET", bodyObject = null) {
  try {
    const requestConfig = {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (bodyObject) {
      requestConfig.body = JSON.stringify(bodyObject);
    }
    const apiUrl = process.env.REACT_APP_DEV_API_URL;
    const httpResponse = await fetch(`${apiUrl}/${path}`, requestConfig);
    const responseObject = await httpResponse?.json();
    return { httpResponse, responseObject };
  } catch (err) {
    console.clear();
    return null;
  }
}

export async function apiPrivFetch(path, method = "GET", bodyObject = null) {
  try {
    const requestConfig = {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (bodyObject) {
      requestConfig.body = JSON.stringify(bodyObject);
    }
    const apiUrl = process.env.REACT_APP_DEV_API_PRIV_URL;
    const httpResponse = await fetch(`${apiUrl}/${path}`, requestConfig);
    const responseObject = await httpResponse?.json();
    return { httpResponse, responseObject };
  } catch (err) {
    console.clear();
    return null;
  }
}

export async function forwardFetch(path) {
  try {
    const requestConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    const httpResponse = await fetch(`/forward/${path}`, requestConfig);
    const responseObject = await httpResponse?.json();
    return { httpResponse, responseObject };
  } catch (err) {
    console.clear();
    return null;
  }
}
