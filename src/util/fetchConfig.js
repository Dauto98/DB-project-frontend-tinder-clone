import fetchIntercept from "fetch-intercept";

export default () => fetchIntercept.register({
  request(url, config) {
    // Modify the url or config here
    if (config == null) {
      config = {};
    }
    if (config.headers == null) {
      config.headers = {};
    }

    if (config.headers["Content-Type"] === "multipart/form-data") {
      delete config.headers["Content-Type"];
    } else if (config.headers["Content-Type"] == null) {
      config.headers["Content-Type"] = "application/json";
    }

    if (!config.headers["X-Token"]) {
      //config.headers['X-Token'] = localStorage.getItem('token');
      config.headers["X-Token"] = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    }
    if (config.headers.Accept == null) {
      config.headers.Accept = "application/json";
    }

    if (ENV === "local") {
      if (!url.startsWith("http")) {
        if (!url.startsWith("/")) {
          url = `/${url}`;
        }
        url = API_URL + url;
      }
    }
    return [url, config];
  },

  requestError(error) {
    // Called when an error occurred during another 'request' interceptor call
    return Promise.reject(error);
  },

  response(response) {
    // Modify the response object
    return response;
  },

  responseError(error) {
    // Handle an fetch error
    return Promise.reject(error);
  }
});
