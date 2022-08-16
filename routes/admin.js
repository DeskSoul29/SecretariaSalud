const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/", adminController.isAuthenticatedAdmin, (req, res) => {
  res.render("admin/main", { user: req.user });
});

router.get(
  "/register",
  adminController.isAuthenticatedAdmin,
  adminController.fillFields,
  (req, res) => {
    res.render("admin/register", {
      alert: false,
      user: req.user,
      fields: req.field,
    });
  }
);

router.post("/register", adminController.register);
router.get("/logout", adminController.logout);
// router.post("/register", authController.register);

module.exports = router;
