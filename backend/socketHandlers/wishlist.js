const User = require("../models/User");

function handleWishlistSocket(socket) {
  //>>=============== Add product to wishlist==============>>
  socket.on("addToWishlist", async (data, callback) => {
    const { userId, productId } = data;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return callback({ success: false, message: "User not found" });
      }

      if (user.wishlist.includes(productId)) {
        return callback({
          success: false,
          message: "Product already in wishlist",
        });
      }

      user.wishlist.push(productId);
      await user.save();

      return callback({ success: true, wishlist: user.wishlist });
    } catch (error) {
      console.error(error);
      return callback({
        success: false,
        message: "Failed to add product to wishlist",
      });
    }
  });

  //>>============== Remove product from wishlist====================>>
  socket.on("removeFromWishlist", async (data, callback) => {
    const { userId, productId } = data;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return callback({ success: false, message: "User not found" });
      }

      user.wishlist = user.wishlist.filter(
        (item) => item.toString() !== productId
      );
      await user.save();

      return callback({ success: true, wishlist: user.wishlist });
    } catch (error) {
      console.error(error);
      return callback({
        success: false,
        message: "Failed to remove product from wishlist",
      });
    }
  });

  //>>==================== Get wishlist for a user============>>
  socket.on("getWishlist", async (data, callback) => {
    const { userId } = data;

    try {
      const user = await User.findById(userId).populate("wishlist");
      if (!user) {
        return callback({ success: false, message: "User not found" });
      }

      return callback({ success: true, wishlist: user.wishlist });
    } catch (error) {
      console.error(error);
      return callback({ success: false, message: "Failed to fetch wishlist" });
    }
  });
}

module.exports = { handleWishlistSocket };
