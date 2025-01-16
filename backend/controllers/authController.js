const express = require("express");
const passport = require("passport");
const router = express.Router();
const { getProfile, logout } = require("../controllers/authController");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

router.get("/profile", getProfile);
router.get("/logout", logout);

module.exports = router;
