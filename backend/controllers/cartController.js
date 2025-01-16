const User = require("../models/User");
const Product = require("../models/Product");


async function addToCart(req, res) {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  
    const productIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex !== -1) {
      
      user.cart[productIndex].quantity += quantity;
    } else {
     
      user.cart.push({ productId, quantity });
    }

    await user.save();
    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add product to cart" });
  }
}


async function removeFromCart(req, res) {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove product from cart
    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();
    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to remove product from cart" });
  }
}

async function updateCartQuantity(req, res) {
  const { userId, productId, quantity } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    user.cart[productIndex].quantity = quantity;
    await user.save();
    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update cart quantity" });
  }
}

async function getCart(req, res) {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("cart.productId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ cart: user.cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch cart" });
  }
}

module.exports = {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCart,
};
