import { io } from "socket.io-client";

let socket = null;

export const initializeSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_BASE_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });
  }

  return socket;
};

export const SendMessageToUser = (message) => {
  socket.emit("message", message);
};

export const ReceiveMessageToUser = (callback) => {
  socket.on("message", callback);
};
