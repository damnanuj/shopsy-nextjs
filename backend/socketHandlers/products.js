const Product = require("../models/Product");

function handleProductSocket(socket) {
  socket.on("fetchAllProducts", async (callback) => {
    try {
      const products = await Product.find({});
      callback({ success: true, data: products });
    } catch (error) {
      console.error("Error fetching products:", error);
      callback({ success: false, message: "Failed to fetch products" });
    }
  });

  //>>=========fetch product details by productId============>>
  socket.on("fetchProductById", async (productId, callback) => {
    try {
      //>>========== Fetch the product based on productId==============>>
      const product = await Product.findById(productId);

      if (product) {
        callback({ success: true, data: product });
      } else {
        callback({ success: false, message: "Product not found" });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      callback({ success: false, message: "Failed to fetch product details" });
    }
  });
}

module.exports = { handleProductSocket };
