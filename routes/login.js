const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/login", authController.isAuthenticated, (req, res) => {
  res.render("login", { alert: false });
});

router.get("/404", (req, res) => {
  res.render("tools/404");
});

//router para los métodos del controller
router.post("/login", authController.login);

module.exports = router;
