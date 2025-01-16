import io from "socket.io-client";

export const removeFromCart = async (userId, productId) => {
  return new Promise((resolve, reject) => {
    const socket = io("https://shopsy-nextjs.onrender.com");

    //>>===========remove the product==================>>
    socket.emit("removeFromCart", { userId, productId }, (response) => {
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
