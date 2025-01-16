const express = require("express");
const { fetchAllProducts } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/", authMiddleware, fetchAllProducts);

module.exports = router;
