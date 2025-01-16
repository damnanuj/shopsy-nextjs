const { handleCartSocket } = require("../socketHandlers/cart");
const { handleProductSocket } = require("../socketHandlers/products");
const { handleWishlistSocket } = require("../socketHandlers/wishlist");

function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    handleProductSocket(socket);
    handleWishlistSocket(socket);
    handleCartSocket(socket);

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

module.exports = { setupSocket };
