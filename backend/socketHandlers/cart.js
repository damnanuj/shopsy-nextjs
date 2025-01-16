const User = require("../models/User");

function handleCartSocket(socket) {
  socket.on("addToCart", async (data, callback) => {
    const { userId, productId, quantity } = data;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return callback({ success: false, message: "User not found" });
      }

      //>>======== Check if the product is already in the cart=========>>
      const productIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex !== -1) {
        user.cart[productIndex].quantity += quantity;
      } else {
        user.cart.push({ productId, quantity });
      }

      await user.save();
      return callback({ success: true, cart: user.cart });
    } catch (error) {
      console.error(error);
      return callback({
        success: false,
        message: "Failed to add product to cart",
      });
    }
  });

  //>>=========== Remove product from cart================>>
  socket.on("removeFromCart", async (data, callback) => {
    const { userId, productId } = data;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return callback({ success: false, message: "User not found" });
      }

      //>>========== Remove product from cart==================>>
      user.cart = user.cart.filter(
        (item) => item.productId.toString() !== productId
      );

      await user.save();
      return callback({ success: true, cart: user.cart });
    } catch (error) {
      console.error(error);
      return callback({
        success: false,
        message: "Failed to remove product from cart",
      });
    }
  });

  //>>================= Update quantity of a product in the cart=============>>
  socket.on("updateCartQuantity", async (data, callback) => {
    const { userId, productId, quantity } = data;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return callback({ success: false, message: "User not found" });
      }

      const productIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex === -1) {
        return callback({ success: false, message: "Product not in cart" });
      }

      user.cart[productIndex].quantity = quantity;
      await user.save();
      return callback({ success: true, cart: user.cart });
    } catch (error) {
      console.error(error);
      return callback({
        success: false,
        message: "Failed to update cart quantity",
      });
    }
  });

  socket.on("getCart", async (data, callback) => {
    const { userId } = data;

    try {
      const user = await User.findById(userId).populate("cart.productId");
      if (!user) {
        return callback({ success: false, message: "User not found" });
      }

      return callback({ success: true, cart: user.cart });
    } catch (error) {
      console.error(error);
      return callback({ success: false, message: "Failed to fetch cart" });
    }
  });
}

module.exports = { handleCartSocket };
