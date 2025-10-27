export const BaseUrl: string =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1/"
    : "https://dineqr-backend-3.onrender.com/api/v1/";

export const SocketUrl: string =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://dineqr-backend-3.onrender.com";