const socketIo = require("socket.io");
const http = require("http");
const app = require("./app");
const User = require("./models/User");
const Product = require("./models/Product");

const server = http.createServer(app);
const io = socketIo(server);

// Handle Socket.io connection
io.on("connection", (socket) => {
  console.log(`User connected with socket id: ${socket.id}`);

  socket.on("addToCart", async (data) => {
    const { userId, productId, quantity } = data;

    try {
      const user = await User.findById(userId);
      if (!user) return socket.emit("error", { message: "User not found" });

      const existingProduct = user.cart.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        user.cart.push({ productId, quantity });
      }

      await user.save();

      socket.emit("cartUpdated", user.cart);
    } catch (error) {
      console.error(error);
      socket.emit("error", { message: "Failed to add product to cart" });
    }
  });

  socket.on("removeFromCart", async (data) => {
    const { userId, productId } = data;

    try {
      const user = await User.findById(userId);
      if (!user) return socket.emit("error", { message: "User not found" });

      user.cart = user.cart.filter(
        (item) => item.productId.toString() !== productId
      );

      await user.save();

      socket.emit("cartUpdated", user.cart);
    } catch (error) {
      console.error(error);
      socket.emit("error", { message: "Failed to remove product from cart" });
    }
  });

  socket.on("addToWishlist", async (data) => {
    const { userId, productId } = data;

    try {
      const user = await User.findById(userId);
      if (!user) return socket.emit("error", { message: "User not found" });

      if (!user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
        await user.save();
      }

      socket.emit("wishlistUpdated", user.wishlist);
    } catch (error) {
      console.error(error);
      socket.emit("error", { message: "Failed to add product to wishlist" });
    }
  });

  socket.on("removeFromWishlist", async (data) => {
    const { userId, productId } = data;

    try {
      const user = await User.findById(userId);
      if (!user) return socket.emit("error", { message: "User not found" });

      user.wishlist = user.wishlist.filter(
        (item) => item.toString() !== productId
      );

      await user.save();

      socket.emit("wishlistUpdated", user.wishlist);
    } catch (error) {
      console.error(error);
      socket.emit("error", {
        message: "Failed to remove product from wishlist",
      });
    }
  });
});

module.exports = server;
