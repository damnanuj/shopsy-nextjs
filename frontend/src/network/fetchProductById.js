import io from "socket.io-client";

//>>===========fetch product details by productId==========>>
export const fetchProductById = async (productId) => {
  return new Promise((resolve, reject) => {
    const socket = io("http://localhost:5000/");

    socket.emit("fetchProductById", productId, (response) => {
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
