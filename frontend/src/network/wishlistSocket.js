import { io } from "socket.io-client";
import { baseURL } from "./baseurl";

const socket = io(baseURL);

export const addToWishlist = (userId, productId, callback) => {
  socket.emit("addToWishlist", { userId, productId }, (response) => {
    callback(response);
  });
};

export const getWishlist = (userId, callback) => {
  socket.emit("getWishlist", { userId }, callback);
};

export const removeFromWishlist = (userId, productId, callback) => {
  socket.emit("removeFromWishlist", { userId, productId }, (response) => {
    callback(response);
  });
};
