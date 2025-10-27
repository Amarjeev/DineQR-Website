export const BaseUrl: string =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/v1/" // for development
    : "https://dineqr-backend-3.onrender.com/api/v1/"; // for production

// import { io } from "socket.io-client";

// export const BaseUrl = io(
//   window.location.hostname === "localhost"
//     ? "http://localhost:5000"
//     : "https://dineqr-backend-3.onrender.com/api/v1/",
//   {
//     transports: ["websocket"],
//   }
// );
