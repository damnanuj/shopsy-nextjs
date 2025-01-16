const User = require("../models/User");
const Product = require("../models/Product");

async function addToWishlist(req, res) {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    user.wishlist.push(productId);

    await user.save();
    return res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to add product to wishlist" });
  }
}

async function removeFromWishlist(req, res) {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlist = user.wishlist.filter(
      (item) => item.toString() !== productId
    );

    await user.save();
    return res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to remove product from wishlist" });
  }
}

async function getWishlist(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("wishlist");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch wishlist" });
  }
}

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};
