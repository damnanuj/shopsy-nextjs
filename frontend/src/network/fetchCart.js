import io from "socket.io-client";

//>>======== Function to fetch all cart items =======>>
export const fetchCart = async (userId) => {
  return new Promise((resolve, reject) => {
    const socket = io("https://shopsy-nextjs.onrender.com/");

    socket.emit("getCart", { userId }, (response) => {
      socket.disconnect();
      if (response.success) {
        resolve(response.cart);
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
