const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

router.post("/add", authMiddleware, addToWishlist);
router.delete("/remove", authMiddleware, removeFromWishlist);
router.get("/:userId", authMiddleware, getWishlist);

module.exports = router;
