const express = require("express");
const router = express.Router();

const visitController = require("../controllers/visitController");

router.get("/", visitController.isAuthenticatedVisit, (req, res) => {
  res.render("visitante/main", { user: req.user });
});

router.get("/logout", visitController.logout);

module.exports = router;
