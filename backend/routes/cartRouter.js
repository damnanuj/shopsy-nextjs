
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  getCart,
} = require("../controllers/cartController");


router.post("/add", authMiddleware, addToCart);
router.delete("/remove", authMiddleware, removeFromCart);
router.put("/update", authMiddleware, updateCartQuantity);
router.get("/:userId", authMiddleware, getCart);

module.exports = router;
