const mongoose = require("mongoose");

// >>=============Mongodb connection======================>>
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error(err.message || "Database Connection Err");
    process.exit(1);
  }
};

module.exports = connectDB;
