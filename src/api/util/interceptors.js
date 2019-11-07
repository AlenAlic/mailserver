import { backendServer } from "@/api/util/servers";
import { loadServerToken } from "./token-storage";
import router from "@/router";
import { ERROR_CODES, getNetworkErrorCode } from "@/api/util/network-errors";

backendServer.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    const errorCode = getNetworkErrorCode(error);
    // Redirect to login page when credentials fail
    if (errorCode === ERROR_CODES.CREDENTIALS && router.currentRoute.name !== "sign-in") {
      router.push({ name: "sign-in" });
    }
    return Promise.reject(error.response);
  }
);

backendServer.interceptors.request.use(async request => {
  // Inject authorization token if present
  const token = loadServerToken(backendServer);
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  return request;
});

export { backendServer };
