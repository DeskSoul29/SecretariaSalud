const express = require("express");
const router = express.Router();

const moderController = require("../controllers/moderController");

router.get("/", moderController.isAuthenticatedModer, (req, res) => {
  res.render("moderador/main", { user: req.user });
});

router.get("/register", moderController.isAuthenticatedModer, (req, res) => {
  res.render("admin/register", { alert: false, user: req.user });
});

router.post("/register", moderController.register);
router.get("/logout", moderController.logout);

module.exports = router;
