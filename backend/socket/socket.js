const { handleCartSocket } = require("../socketHandlers/cart");
const { handleProductSocket } = require("../socketHandlers/products");
const { handleWishlistSocket } = require("../socketHandlers/wishlist");

function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log(
      `[${new Date().toISOString()}] New client connected: ${socket.id}`
    );

    //>>================product-related events==============>>
    handleProductSocket(socket);

    //>>================wishlist-related events==============>>
    handleWishlistSocket(socket);

    //>>================ cart-related events ==============>>
    handleCartSocket(socket);

    //>>===============logout==================>>
    socket.on("logout", (userId) => {
      try {
        console.log(`[${new Date().toISOString()}] User ${userId} logged out`);
        socket.disconnect();
      } catch (error) {
        console.error("Error handling logout:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log(
        `[${new Date().toISOString()}] Client disconnected: ${socket.id}`
      );
    });
  });
}

module.exports = { setupSocket };
