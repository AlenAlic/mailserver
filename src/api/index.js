/* eslint-disable no-undef */
import axios from "axios";
import router from "../router";
import store from "../store";
import { UNAUTHORIZED } from "../store/modules/auth";

const axiosInstance = new axios.create();
axiosInstance.defaults.headers.common["Accept-Language"] = localStorage.getItem("lang")
  ? localStorage.getItem("lang")
  : "en";
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosInstance.defaults.baseURL = "/";

// Add a response interceptor
const responseInterceptor = axiosInstance.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    if (error.response) {
      // Got a response from the api with an error status
      if (error.response.status === 401 && !window.location.pathname.startsWith("/auth")) {
        // Not signed in. Log-out and redirect to sign in page.
        store.dispatch(UNAUTHORIZED).then(() =>
          router.replace({
            name: "sign-in"
          })
        );

        // Return a promise that never resolves, so the caller keeps thinking we're still loading until it's
        // replaced with the sign in page.
        return new Promise(() => {});
      } else if (error.response.data) {
        // Parse errors and reject the promise
        let status = error.response.status;
        let data = error.response.data;

        let errors = [];
        if (data.errors) {
          errors = parseErrors(error.response.data.errors);
        }

        return Promise.reject({ status, errors });
      }
    }
    if (axios.isCancel(error)) {
      // When cancelling a request through a cancelToken it can be detected using axios.isCancel(error).
      // We need to preserve this detection, so we cannot throw a new error or object as this will not be detected down the line.
      return Promise.reject(error);
    }
    return Promise.reject({
      status: 500,
      errors: ["Something went wrong"]
    });
  }
);

// Add a request interceptor
const requestInterceptor = axiosInstance.interceptors.request.use(
  request => {
    // Assign the refreshed token on every request.
    let token = window.localStorage.getItem("token");
    if (token) request.headers["Authorization"] = "Bearer " + window.localStorage.getItem("token");
    return Promise.resolve(request);
  },
  error => {
    return Promise.reject(error);
  }
);

// The custom instance is exported in order to be registered with Vue and VueAxios in main.js
// The interceptors can be exported too and they can be unregistered from another place.
export { axiosInstance, responseInterceptor, requestInterceptor };
