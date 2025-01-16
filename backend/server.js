// Path: server.js
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");
const { setupSocket } = require("./socket/socket");

const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter")
const wishlistRouter = require("./routes/wishlistRouter")



require("dotenv").config();
require("./config/passport");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Database Connection
connectDB();

// Routes
app.use("/products", productRouter);
app.use("/wishlist", wishlistRouter);
app.use("/cart", cartRouter);
app.use("/auth", authRoutes);

// Socket.IO Setup
setupSocket(io);

// Start Server
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
