import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8001/api/v1",
  withCredentials: true,
});

export const api_initial = axios.create({
  baseURL: "http://localhost:8001",
  withCredentials: true,
})

// api.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 401) {
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );
