import io from "socket.io-client";

//>>==========fetch all products===========>>
export const fetchAllProducts = async () => {
  return new Promise((resolve, reject) => {
    const socket = io("https://shopsy-nextjs.onrender.com/");

    socket.emit("fetchAllProducts", (response) => {
      socket.disconnect();
      if (response.success) {
        resolve(response.data);
      } else {
        reject(response.message);
      }
    });

    socket.on("connect_error", (error) => {
      socket.disconnect();
      reject("Failed to connect to server.");
    });
  });
};
