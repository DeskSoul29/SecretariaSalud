const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/login", (req, res) => {
  res.render("login", { alert: false });
});

//Role: Admin
router.get("/register", authController.isAuthenticated, (req, res) => {
  res.render("admin/register", { alert: false, user: req.user });
});

router.get("/admin", authController.isAuthenticated, (req, res) => {
  res.render("admin/main", { user: req.user });
});

//Role: Moderador
router.get("moderador", authController.isAuthenticated, (req, res) => {
  res.render("moderador/main", { user: req.user });
});

//Role: Visitante
router.get("visitante", authController.isAuthenticated, (req, res) => {
  res.render("visitante/main", { user: req.user });
});

//router para los métodos del controller
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
